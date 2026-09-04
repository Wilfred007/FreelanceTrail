// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FreelanceEscrow} from "../src/FreelanceEscrow.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

contract FreelanceEscrowTest is Test {
    FreelanceEscrow escrow;
    MockUSDC usdc;

    address client = makeAddr("client");
    address developer = makeAddr("developer");

    uint256[] amounts;

    function setUp() public {
        usdc = new MockUSDC();
        escrow = new FreelanceEscrow(address(usdc));

        usdc.mint(client, 2_000e6);

        amounts.push(500e6);
        amounts.push(800e6);
        amounts.push(700e6);
    }

    function _createProject() internal returns (uint256 projectId) {
        vm.prank(client);
        projectId = escrow.createProject(developer, "ipfs://project-meta", amounts);
    }

    function test_createProject() public {
        uint256 projectId = _createProject();
        FreelanceEscrow.Project memory project = escrow.getProject(projectId);

        assertEq(project.client, client);
        assertEq(project.developer, developer);
        assertEq(project.milestoneCount, 3);
    }

    function test_fullMilestoneLifecycle() public {
        uint256 projectId = _createProject();

        vm.startPrank(client);
        usdc.approve(address(escrow), 500e6);
        escrow.fundMilestone(projectId, 0);
        vm.stopPrank();

        vm.prank(developer);
        escrow.submitMilestone(projectId, 0, "ipfs://proof-1");

        vm.prank(client);
        escrow.approveMilestone(projectId, 0);

        assertEq(usdc.balanceOf(developer), 500e6);

        FreelanceEscrow.Milestone memory milestone = escrow.getMilestone(projectId, 0);
        assertEq(uint8(milestone.status), uint8(FreelanceEscrow.MilestoneStatus.Approved));
    }

    function test_refund() public {
        uint256 projectId = _createProject();

        vm.startPrank(client);
        usdc.approve(address(escrow), 800e6);
        escrow.fundMilestone(projectId, 1);
        escrow.refundMilestone(projectId, 1);
        vm.stopPrank();

        assertEq(usdc.balanceOf(client), 2_000e6);
    }

    function test_revert_nonClientCannotFund() public {
        uint256 projectId = _createProject();

        vm.prank(developer);
        vm.expectRevert(FreelanceEscrow.NotClient.selector);
        escrow.fundMilestone(projectId, 0);
    }

    function test_revert_nonDeveloperCannotSubmit() public {
        uint256 projectId = _createProject();

        vm.startPrank(client);
        usdc.approve(address(escrow), 500e6);
        escrow.fundMilestone(projectId, 0);
        vm.stopPrank();

        vm.prank(client);
        vm.expectRevert(FreelanceEscrow.NotDeveloper.selector);
        escrow.submitMilestone(projectId, 0, "ipfs://proof-1");
    }

    function test_revert_cannotApproveBeforeSubmission() public {
        uint256 projectId = _createProject();

        vm.startPrank(client);
        usdc.approve(address(escrow), 500e6);
        escrow.fundMilestone(projectId, 0);
        vm.expectRevert(
            abi.encodeWithSelector(
                FreelanceEscrow.WrongStatus.selector,
                FreelanceEscrow.MilestoneStatus.Submitted,
                FreelanceEscrow.MilestoneStatus.Funded
            )
        );
        escrow.approveMilestone(projectId, 0);
        vm.stopPrank();
    }

    function test_revert_invalidMilestoneIndex() public {
        uint256 projectId = _createProject();

        vm.prank(client);
        vm.expectRevert(FreelanceEscrow.InvalidMilestone.selector);
        escrow.getMilestone(projectId, 99);
    }
}
