export declare const freelanceEscrowAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "usdcAddress";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "approveMilestone";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "createProject";
    readonly inputs: readonly [{
        readonly name: "developer";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "metadataURI";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "milestoneAmounts";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly outputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "fundMilestone";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getMilestone";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly internalType: "struct FreelanceEscrow.Milestone";
        readonly components: readonly [{
            readonly name: "amount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "status";
            readonly type: "uint8";
            readonly internalType: "enum FreelanceEscrow.MilestoneStatus";
        }, {
            readonly name: "proofURI";
            readonly type: "string";
            readonly internalType: "string";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getProject";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly internalType: "struct FreelanceEscrow.Project";
        readonly components: readonly [{
            readonly name: "client";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "developer";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "metadataURI";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "milestoneCount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "exists";
            readonly type: "bool";
            readonly internalType: "bool";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "nextProjectId";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "refundMilestone";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "submitMilestone";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "proofURI";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "usdc";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IERC20";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "MilestoneApproved";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "MilestoneFunded";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "MilestoneSubmitted";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "proofURI";
        readonly type: "string";
        readonly indexed: false;
        readonly internalType: "string";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "PaymentReleased";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "developer";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "ProjectCreated";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "client";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "developer";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "metadataURI";
        readonly type: "string";
        readonly indexed: false;
        readonly internalType: "string";
    }, {
        readonly name: "milestoneAmounts";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "RefundIssued";
    readonly inputs: readonly [{
        readonly name: "projectId";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "milestoneIndex";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "client";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "InvalidMilestone";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NoMilestones";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotClient";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotDeveloper";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ProjectNotFound";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ReentrancyGuardReentrantCall";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "SafeERC20FailedOperation";
    readonly inputs: readonly [{
        readonly name: "token";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "WrongStatus";
    readonly inputs: readonly [{
        readonly name: "expected";
        readonly type: "uint8";
        readonly internalType: "enum FreelanceEscrow.MilestoneStatus";
    }, {
        readonly name: "actual";
        readonly type: "uint8";
        readonly internalType: "enum FreelanceEscrow.MilestoneStatus";
    }];
}, {
    readonly type: "error";
    readonly name: "ZeroAddress";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroAmount";
    readonly inputs: readonly [];
}];
