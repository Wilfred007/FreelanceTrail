import { Bytes, ethereum } from "@graphprotocol/graph-ts";
import {
  ProjectCreated,
  MilestoneFunded,
  MilestoneSubmitted,
  MilestoneApproved,
  PaymentReleased,
  RefundIssued,
} from "../generated/FreelanceEscrow/FreelanceEscrow";
import {
  ProjectCreatedEvent,
  MilestoneFundedEvent,
  MilestoneSubmittedEvent,
  MilestoneApprovedEvent,
  PaymentReleasedEvent,
  RefundIssuedEvent,
} from "../generated/schema";

// Collision-safe id for an immutable per-event entity: no two logs ever share both a
// transaction hash and a log index.
function eventId(event: ethereum.Event): Bytes {
  return event.transaction.hash.concatI32(event.logIndex.toI32());
}

export function handleProjectCreated(event: ProjectCreated): void {
  const entity = new ProjectCreatedEvent(eventId(event));
  entity.projectId = event.params.projectId;
  entity.client = event.params.client;
  entity.developer = event.params.developer;
  entity.metadataURI = event.params.metadataURI;
  entity.milestoneAmounts = event.params.milestoneAmounts;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;
  entity.save();
}

export function handleMilestoneFunded(event: MilestoneFunded): void {
  const entity = new MilestoneFundedEvent(eventId(event));
  entity.projectId = event.params.projectId;
  entity.milestoneIndex = event.params.milestoneIndex;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;
  entity.save();
}

export function handleMilestoneSubmitted(event: MilestoneSubmitted): void {
  const entity = new MilestoneSubmittedEvent(eventId(event));
  entity.projectId = event.params.projectId;
  entity.milestoneIndex = event.params.milestoneIndex;
  entity.proofURI = event.params.proofURI;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;
  entity.save();
}

export function handleMilestoneApproved(event: MilestoneApproved): void {
  const entity = new MilestoneApprovedEvent(eventId(event));
  entity.projectId = event.params.projectId;
  entity.milestoneIndex = event.params.milestoneIndex;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;
  entity.save();
}

export function handlePaymentReleased(event: PaymentReleased): void {
  const entity = new PaymentReleasedEvent(eventId(event));
  entity.projectId = event.params.projectId;
  entity.milestoneIndex = event.params.milestoneIndex;
  entity.developer = event.params.developer;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;
  entity.save();
}

export function handleRefundIssued(event: RefundIssued): void {
  const entity = new RefundIssuedEvent(eventId(event));
  entity.projectId = event.params.projectId;
  entity.milestoneIndex = event.params.milestoneIndex;
  entity.client = event.params.client;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;
  entity.save();
}
