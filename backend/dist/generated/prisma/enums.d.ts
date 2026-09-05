export declare const MilestoneStatus: {
    readonly PENDING: "PENDING";
    readonly FUNDED: "FUNDED";
    readonly SUBMITTED: "SUBMITTED";
    readonly APPROVED: "APPROVED";
    readonly REFUNDED: "REFUNDED";
};
export type MilestoneStatus = (typeof MilestoneStatus)[keyof typeof MilestoneStatus];
export declare const ProjectStatus: {
    readonly DRAFT: "DRAFT";
    readonly ONCHAIN: "ONCHAIN";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
