// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// Milestone-based USDC escrow. One deployment handles all FreelanceTrail projects;
/// `usdc` is fixed at deploy time to Arc's canonical USDC (ERC-20 interface, 6 decimals).
contract FreelanceEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum MilestoneStatus {
        Pending,
        Funded,
        Submitted,
        Approved,
        Refunded
    }

    struct Milestone {
        uint256 amount;
        MilestoneStatus status;
        string proofURI;
    }

    struct Project {
        address client;
        address developer;
        string metadataURI;
        uint256 milestoneCount;
        bool exists;
    }

    IERC20 public immutable usdc;

    uint256 public nextProjectId;
    mapping(uint256 => Project) private _projects;
    mapping(uint256 => mapping(uint256 => Milestone)) private _milestones;

    event ProjectCreated(
        uint256 indexed projectId,
        address indexed client,
        address indexed developer,
        string metadataURI,
        uint256[] milestoneAmounts
    );
    event MilestoneFunded(uint256 indexed projectId, uint256 indexed milestoneIndex, uint256 amount);
    event MilestoneSubmitted(uint256 indexed projectId, uint256 indexed milestoneIndex, string proofURI);
    event MilestoneApproved(uint256 indexed projectId, uint256 indexed milestoneIndex);
    event PaymentReleased(
        uint256 indexed projectId, uint256 indexed milestoneIndex, address indexed developer, uint256 amount
    );
    event RefundIssued(uint256 indexed projectId, uint256 indexed milestoneIndex, address indexed client, uint256 amount);

    error ZeroAddress();
    error NoMilestones();
    error ZeroAmount();
    error ProjectNotFound();
    error InvalidMilestone();
    error NotClient();
    error NotDeveloper();
    error WrongStatus(MilestoneStatus expected, MilestoneStatus actual);

    modifier onlyClient(uint256 projectId) {
        if (msg.sender != _projects[projectId].client) revert NotClient();
        _;
    }

    modifier onlyDeveloper(uint256 projectId) {
        if (msg.sender != _projects[projectId].developer) revert NotDeveloper();
        _;
    }

    constructor(address usdcAddress) {
        if (usdcAddress == address(0)) revert ZeroAddress();
        usdc = IERC20(usdcAddress);
    }

    function createProject(address developer, string calldata metadataURI, uint256[] calldata milestoneAmounts)
        external
        returns (uint256 projectId)
    {
        if (developer == address(0)) revert ZeroAddress();
        if (milestoneAmounts.length == 0) revert NoMilestones();

        projectId = nextProjectId++;
        Project storage project = _projects[projectId];
        project.client = msg.sender;
        project.developer = developer;
        project.metadataURI = metadataURI;
        project.milestoneCount = milestoneAmounts.length;
        project.exists = true;

        for (uint256 i = 0; i < milestoneAmounts.length; i++) {
            if (milestoneAmounts[i] == 0) revert ZeroAmount();
            _milestones[projectId][i] =
                Milestone({amount: milestoneAmounts[i], status: MilestoneStatus.Pending, proofURI: ""});
        }

        emit ProjectCreated(projectId, msg.sender, developer, metadataURI, milestoneAmounts);
    }

    function fundMilestone(uint256 projectId, uint256 milestoneIndex) external nonReentrant onlyClient(projectId) {
        Milestone storage milestone = _milestone(projectId, milestoneIndex);
        _requireStatus(milestone, MilestoneStatus.Pending);

        milestone.status = MilestoneStatus.Funded;
        emit MilestoneFunded(projectId, milestoneIndex, milestone.amount);

        usdc.safeTransferFrom(msg.sender, address(this), milestone.amount);
    }

    function submitMilestone(uint256 projectId, uint256 milestoneIndex, string calldata proofURI)
        external
        onlyDeveloper(projectId)
    {
        Milestone storage milestone = _milestone(projectId, milestoneIndex);
        _requireStatus(milestone, MilestoneStatus.Funded);

        milestone.status = MilestoneStatus.Submitted;
        milestone.proofURI = proofURI;

        emit MilestoneSubmitted(projectId, milestoneIndex, proofURI);
    }

    function approveMilestone(uint256 projectId, uint256 milestoneIndex) external nonReentrant onlyClient(projectId) {
        Milestone storage milestone = _milestone(projectId, milestoneIndex);
        _requireStatus(milestone, MilestoneStatus.Submitted);

        milestone.status = MilestoneStatus.Approved;
        address developer = _projects[projectId].developer;
        uint256 amount = milestone.amount;

        emit MilestoneApproved(projectId, milestoneIndex);
        emit PaymentReleased(projectId, milestoneIndex, developer, amount);

        usdc.safeTransfer(developer, amount);
    }

    function refundMilestone(uint256 projectId, uint256 milestoneIndex) external nonReentrant onlyClient(projectId) {
        Milestone storage milestone = _milestone(projectId, milestoneIndex);
        _requireStatus(milestone, MilestoneStatus.Funded);

        milestone.status = MilestoneStatus.Refunded;
        uint256 amount = milestone.amount;

        emit RefundIssued(projectId, milestoneIndex, msg.sender, amount);

        usdc.safeTransfer(msg.sender, amount);
    }

    function getProject(uint256 projectId) external view returns (Project memory) {
        if (!_projects[projectId].exists) revert ProjectNotFound();
        return _projects[projectId];
    }

    function getMilestone(uint256 projectId, uint256 milestoneIndex) external view returns (Milestone memory) {
        return _milestone(projectId, milestoneIndex);
    }

    function _milestone(uint256 projectId, uint256 milestoneIndex) private view returns (Milestone storage) {
        if (!_projects[projectId].exists) revert ProjectNotFound();
        if (milestoneIndex >= _projects[projectId].milestoneCount) revert InvalidMilestone();
        return _milestones[projectId][milestoneIndex];
    }

    function _requireStatus(Milestone storage milestone, MilestoneStatus expected) private view {
        if (milestone.status != expected) revert WrongStatus(expected, milestone.status);
    }
}
