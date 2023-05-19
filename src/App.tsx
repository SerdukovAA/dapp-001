import React, {useState} from 'react';
import {ethers} from 'ethers';

function App() {

  const [userAccount, setUserAccount] =  useState("");
  const [balance, setBalance] =  useState("0");

    const onConnect = () => {
        //@ts-ignore
       if(window.ethereum){
           //@ts-ignore
           window.ethereum.request({method: "eth_requestAccounts"}).then((account) => {
               setUserAccount(account[0])
               getBalance(account[0])
           })
           //@ts-ignore
           window.ethereum.on("accountChanged", onConnect)
           //@ts-ignore
           window.ethereum.on("chainChanged", chainChangedHandler)
       }else{
            alert("Установите метамаск")
       }
    }

    const chainChangedHandler = () => {
        window.location.reload()
    }

    const getBalance = (account: string) => {
           //@ts-ignore
            window.ethereum.request({method: "eth_getBalance", params: [account, 'latest']}).then((balance) => {
                setBalance(ethers.formatEther(balance))
            })

    }

  return (
    <div className="App">
        <h2>Подключи кошелек</h2>
        <button onClick={onConnect}>Подключить кошелек</button>
        { userAccount ? (
            <div>
                <p>User = {userAccount}</p>
                <p>Balance = {balance}</p>
            </div>
        ) : (
        <span>NotUser</span>
        )}


    </div>
  );
}

export default App;
