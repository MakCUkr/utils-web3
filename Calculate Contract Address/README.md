The contract in the file can be used to calculate the address of a contract before deploying it and then deploying it succesfully.

For that you first call the getByteCode function to pass a number - salt, and the public address of your Ethereum wallet (the one which will be used for deploying). 
Then input that bytecode that you get and the same value of salt to getAddress(). 
The address returned is the address you will get ifyou deploy using Deploy().

Note: 
1. The contract that you want to deploy(testContract) must be in the same file as the actory Contract since they are linked. 
2. This cannot be used t calculate the address if you are planning to deploy a contract independently (e.g. using Remix).