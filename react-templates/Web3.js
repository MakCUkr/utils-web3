// 3. To connect to web3 we need to either use the users's MM or else use the rikeby info API. For this use the following code. Also remember to actually make sure the Rinkeby link is up to date.


// -----------------------------------------------
import Web3 from "web3";
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    // "https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
    "https://rinkeby.infura.io/v3/3653806d884b401498e7a07f3f325d2e"
  );
  web3 = new Web3(provider);
}

export default web3;

// -----------------------------------------------