

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    useWeb3React,
  } from "@web3-react/core";
import ABI from '../utils/token_abi.json'
import BYTECODE from '../utils/token_bytecode.json'
import Web3 from 'web3'


function TokenCreator() {
  

  const [name, setName] = React.useState('')
  const [symbol, setSymbol] = React.useState('')
  const [decimals, setDecimals] = React.useState('')
  const [supply, setSupply] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isdeployed, setIsdeployed] = React.useState(false)
  const [tokenaddress, setTokenaddress] = React.useState('')

  
  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
    active,
  } = context;



  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }
  

  const deployToken = async() => {
      try{
        setLoading(true)
        if(account && (chainId == 1 || chainId == 137)){
            const web3 = new Web3(library.provider)
            const contract = new web3.eth.Contract(ABI);
            const amount = supply * 10 ** decimals;
            const amountToPay = chainId == 1 ? '100000000000000000' : '200000000000000000000'
            console.log(toFixed(amount))
            let x = await contract.deploy({
                data: BYTECODE.object,
                arguments: [name.toString(), symbol.toString(), decimals.toString(), account.toString(), toFixed(amount), amountToPay.toString()]
                  }).send({
                    from: account,
                    value: amountToPay
                  })
            setLoading(false)
            setIsdeployed(true)
            setTokenaddress(x._address)
      }
      }catch(err){
        alert("something went wrong deploying your token")
        console.log(err)
        setLoading(false)
      }

  }

  return (
    <div className="row" style={{marginTop:'10%', marginBottom:'5%'}}>
        <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">
                <img src="/tokencreator.svg" width="100%" alt="kyc" style={{maxWidth:'150px', margin:'0 auto', display:'block'}} />
                <h5 style={{textAlign:'center'}}>
                Token Creator
                </h5>
                <p style={{textAlign:'center', color:'grey'}}>
                We bring for you the best ERC20 token creator on the market. With our automated factory you will be able to create your own token on blockchain at the speed of the click of a button. 
                </p>
                <h5 style={{textAlign:'center', color:'green'}}>
                    Token Specs
                </h5>
                <ul>
                    <li>Fully ERC20 compliant</li>
                    <li>Super Secure</li>
                    <li>No MINT function</li>
                    <li>Decentralized</li>
                    <li>Alien-tech for releasing tokens (see below)</li>
                </ul>
                <div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Token Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="MINT Finance" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Token Symbol (one word, no spaces)</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="MINTF" value={symbol} onChange={(event) => setSymbol(event.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Decimals</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="18(recommended)"  value={decimals} onChange={(event) => setDecimals(event.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Total Supply</label>
                    <input type="number" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}}  placeholder="100000000" value={supply} onChange={(event) => setSupply(event.target.value)} />
                </div>
                {account && active ? <div> 
                    <button class="btn btn-outline-light" onClick={deployToken} disabled={loading}  style={{borderRadius:'25px', width:'100%'}} type="button"> {loading ? <div class="spinner-border text-light" role="status">
                    </div> : <><span> Deploy on</span> {chainId == 1 ? "ethereum" : chainId == 137 ? "polygon" : 'undefined network'} </>} </button>   
                 </div> : <button class="btn btn-outline-light"  data-toggle="modal" data-target="#exampleModal" style={{borderRadius:'25px', width:'100%'}} type="button"> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" width="20px" /> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" width="20px" /> <span> Connect </span></button>}
                </div>
                <p style={{color:'grey', textAlign:'center', marginTop:'1%'}}>Price: 0.1 ETH or 200 MATIC </p>
                <div>
                    {isdeployed ? <div class="alert alert-primary" style={{marginTop:'3%'}} role="alert">
                        <p>Your token has been deployed at <span style={{fontWeight:'bold'}}>{tokenaddress}</span> . Save this address for reference purposes.</p>
                         </div> : null}
                </div>
                <p style={{color:'grey'}}>
                9/10 token deployment services release tokens via a smart contract. We've engineered the entire system to provide you with an industry-leading token deployer done directly from your wallet. 
                There are hundreds of benefits when doing that, including <span style={{fontWeight:'bold'}}>ease of verifying token on Etherscan</span>, <span style={{fontWeight:'bold'}}>improved perceived professionalism of your project / token </span>, 
                and <span style={{fontWeight:'bold'}}>a closer token to how professional developers release them.</span>
                </p>
        
            </div>        

        </div>


    </div>


  ); 
}

export default TokenCreator;