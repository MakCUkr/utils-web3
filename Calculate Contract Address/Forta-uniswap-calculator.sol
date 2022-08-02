// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Factory {

    address UNI_FACTORY = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

    function getAddress(bytes memory bytecode, uint _salt) public view returns (address)
    {
        bytes32 hash = keccak256(abi.encodePacked(
            bytes1(0xff), UNI_FACTORY, _salt, keccak256(bytecode)
        ));
        return address(uint160(uint256(hash)));
    }


    function getBytecode(address _owner, uint _foo) public pure returns (bytes memory)
    {
        bytes memory bytecode = type(TestContract).creationCode;
        return abi.encodePacked(bytecode, abi.encode(_owner), abi.encode(_foo));
    }

}

contract TestContract {
    address public owner;
    uint public foo;

    constructor(address _owner, uint _foo) payable {
        owner = _owner;
        foo = _foo;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract UniswapHelper{
    function getSalt(address token0, address token1, uint24 fee) public pure returns (bytes32)
    {
        return keccak256(abi.encode(token0, token1, fee));
    }

    function getAbi(address token0, address token1, uint24 fee) public pure returns (bytes memory)
    {
        return abi.encode(token0, token1, fee);
    }


}


// bytecode= 
// salt = keccak256(abi.encode(token0, token1, fee)

// (token0, token1, fee)  = (0xb41F289d699C5e79A51Cb29595c203cFaE85F32a, 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2, 10000)