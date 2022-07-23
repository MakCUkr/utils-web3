    let latestBlock = await hre.ethers.provider.getBlock("latest");
    console.log(latestBlock.number);
     
    // mining 10000 blocks to fastforward
    let x = 10001;
    while (x > 0) {
      x--;
      await hre.network.provider.request({
        method: "evm_mine",
        params: [],
      });
    }    
    
    latestBlock = await hre.ethers.provider.getBlock("latest");
    console.log(latestBlock.number);