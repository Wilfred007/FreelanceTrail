// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {FreelanceEscrow} from "../src/FreelanceEscrow.sol";

contract DeployEscrow is Script {
    // Arc Testnet's canonical USDC (ERC-20 interface, 6 decimals).
    address constant ARC_TESTNET_USDC = 0x3600000000000000000000000000000000000000;

    function run() external returns (FreelanceEscrow escrow) {
        address usdc = vm.envOr("USDC_ADDRESS", ARC_TESTNET_USDC);
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        escrow = new FreelanceEscrow(usdc);
        vm.stopBroadcast();

        console.log("FreelanceEscrow deployed at:", address(escrow));
        console.log("USDC token:", usdc);
    }
}
