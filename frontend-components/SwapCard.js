import styles from './SwapCard.module.css';
import logo from '../assets/CoW-logo.png'
import CurrencySelector from './subcomponents/CurrencySelector';
import {useState} from 'react';


function App() {
    const [token0amt, setToken0amt] = useState(0);
    const [token1amt, setToken1amt] = useState(0);
    const 

    let price = 10; // how many token0 for 1 token1

    const handleToken0Change = (e) => {
        setToken0amt(e.target.value);
        let newToken1 = e.target.value/price;
        setToken1amt(newToken1);
    }

    const handleToken1Change = (e) => {
        setToken1amt(e.target.value);
        let newToken0 = e.target.value/price;
        setToken0amt(newToken0);
    }


    return (
        <div className={styles.fullCard}>
            <div>
                <img src={logo} alt="CoW" className={styles.logoInCard} />
            </div>


            <div className={styles.tokenRow}>
                <div className={styles.amountInput}>
                    <input type = "number" className={styles.formField} value = {token0amt} onChange= {handleToken0Change}/>
                </div>
                <CurrencySelector/>
            </div>

            <div className={styles.tokenRow}>
                <div className={styles.amountInput}>
                    <input type = "number" className={styles.formField} value = {token1amt} onChange= {handleToken1Change}/>
                </div>
                <CurrencySelector/>
            </div>

            <p></p>

            <button>
                Swap
            </button>

        </div>
    );
}

export default App;







// CURRECNYSELECTOR.js
import styles from './CurrencySelector.module.css';

function CurrencySelector() {
    return (
        <div>
            <select name="" id={styles.cusSelectbox}>
                <option value="ETH">ETH</option>
                <option value="DAI">DAI</option>
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
            </select>
        </div>
    );
}

export default CurrencySelector;