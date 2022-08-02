function getPoolAddress(token0 : string, token1 : string, fee: string) {   
    let abiCoder = new ethers.utils.AbiCoder();
    let salt : string = ethers.utils.keccak256(abiCoder.encode(["address", "address", "uint24"], [token0, token1, fee]));
    let hash : string = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        ["bytes1","address","uint","bytes32"],
        ["0xff", UNISWAP_V3_FACTORY_CONTRACT_ADDRESS, salt, ethers.utils.keccak256(UNISWAP_POOL_CONTRACT_CREAT_CODE)]
      ));
    hash = "0x"+hash.slice(26); // (64+2)-40
    return hash;
}