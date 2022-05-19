// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ForceSend{
    // this contract allows to FORCEFULLY send ether to a contract at address _addr , even if it doesn't  have a receive() function
    receive() external payable{
        
    }


    function destroy(address _addr) public {
        selfdestruct(payable(address(_addr)));
    }
}