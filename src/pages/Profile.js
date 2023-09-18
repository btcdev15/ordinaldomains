import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { Toaster, toast } from 'react-hot-toast';
import { ethers } from 'ethers'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Web3 from 'web3'
import Navbar from '../components/Navbar'
import ABI from '../ABI.json'
import Footer from '../components/Footer'
import '../App.css'
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';



function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}



function Homepage() {
  

  



  const [btcaddres, setBtcaddr] = React.useState('')
  const [btcaddres2, setBtcaddr2] = React.useState('')

  React.useEffect(() => {
    const theAddr = localStorage.getItem('btcaddress')
    if(theAddr !== null && theAddr !== ''){
      
      let firstLetters = theAddr.toString().substr(0,5)
      let lastLetters = theAddr.toString().substr(theAddr.length-5,theAddr.length)
      setBtcaddr(firstLetters+'...'+lastLetters)
      setBtcaddr2(theAddr)
    }
  }, [])


  const disconnectWallet = async() => {
    localStorage.removeItem('btcaddress')
    window.location.href = `/#/`

  }


  const [balance, setBalance] = React.useState(null);
  const [btcprice, setBtcprice] = React.useState('30000')
  const [toshow, setToshow] = React.useState([])


  React.useEffect(() => {
      const address = "bc1p9mpdp9qyyfwt0cg6te00877jgwv852azk27dhkghh952jstermqscnvuca"
      axios.get(`https://blockchain.info/balance?active=${address}`)
        .then(response => {
          // the balance is returned in satoshi, so we convert it to BTC
          const balanceInBtc = response.data[address].final_balance / 1e8;
          setBalance(balanceInBtc);
        })
        .catch(error => console.error(`Error: ${error}`));

        const checkBtcPrice = async() => {
            const price = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
            setBtcprice(price.data.bitcoin.usd)
        }
        checkBtcPrice()

        // owner

        // const web3 = new Web3(
        //   // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
        //   new Web3.providers.HttpProvider("https://nova.arbitrum.io/rpc	")
        // );
    
        // const contract = new web3.eth.Contract(ABI, '0x6Bc8DC9F4AfD005F1E08Fe7AEd2EC3dB6E9ee011');



        const checkDomainBalance = async() => {
          const info = await axios.get(`https://devnet.generative.xyz/generative/api/wallet/wallet-info?address=${address}`)
          const stuff = []
          console.log('info is ', info.data)
          if(info.data.data.inscriptions !== null){
            console.log(info.data.data)
            const content = await axios.get(`https://ordinals.com/content/${info.data.data.inscriptions[0].inscription_id}`)
            console.log('content is ', content)
            stuff.push(
              <div className="col-4">
              <div className="card">
                  <div className="card-body">
                      <h4 style={{textAlign:'center', fontSize:'1.2rem'}}> <span style={{fontWeight:'bold'}}>Type:</span> ordinalDomains</h4>
                      <h4 style={{textAlign:'center', fontSize:'1.2rem'}}><span style={{fontWeight:'bold'}}>Name:</span> {content.data.name}</h4>
                      <a href={`https://www.blockchain.com/explorer/transactions/btc/${info.data.data.inscriptions[0].inscription_id.replace('i0','')}`} target="_blank" rel="noreferrer">
                        <button className="btn btn-primary" style={{width:'100%'}}>View on Btc Mainnet</button>
                      </a>
                  </div>
              </div>
          </div>
            )
            setToshow(stuff)
          }
        }
        checkDomainBalance()


    }, []);


//  const callUnisat = async() => {
//     const req = await axios.get('https://unisat.io/api/v1/fee-summary')
//     console.log('req is ', req)
//  }

// fees https://mempool.space/api/v1/fees/recommended

// https://devnet.generative.xyz/generative/api/wallet/wallet-info?address=bc1pcccylcr4gcv3l9qagy00h0rvzc85wwman3fp0yrstx56ulehwv7sl2mv07


const copy = async (txt) => {
  navigator.clipboard.writeText(btcaddres2)
  toast.success('copied')
}

  return (
    <div>
    <Navbar />

    <div className="section-1">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <br /> <br />
                </div>
                <div className="col-6">
                {btcaddres}
                <button className="btn btn-text"><img src="/clipboard.png" onClick={copy} width="24px" alt="clipboard" /></button>
                    <button className="btn btn-text"  data-toggle="modal" data-target="#qrModal" style={{marginLeft:'-1rem'}}><img  src="/qr.png" alt="qr modal" width="25px" /></button>
                </div>  
                <div className="col-6">
                    <button className="btn btn-primary" onClick={disconnectWallet} style={{float:'right', fontSize:'1.1rem', fontWeight:'bold', minWidth:'126px'}}>
                        Disconnect 
                    </button>
                </div>  
                <div className="col-12">
                    <hr />
                </div>
                <div className="col-6">
                    <h2>
                    <img src="/coins/btc.png" alt="btc" width="50px" /> {balance} BTC <span style={{color:'grey'}}>(${parseFloat(parseFloat(btcprice)*parseFloat(balance)).toFixed(3)})</span>
                    </h2>
                </div>
                <div className="col-6">
                    <div style={{display:'inline', float:"right"}}>
                    <button className="btn btn-light" style={{boxShadow:'0px 0px 12px rgba(0, 0, 0, 0.1)', borderRadius:'79px', background:'white', color:'#4267B2', fontWeight:'bold', fontSize:'1.1rem', minWidth:'126px', height:"48px"}} data-toggle="modal" data-target="#sendModal">
                        Send BTC
                    </button>
                    <button style={{ marginLeft:'2rem', boxShadow:'0px 0px 12px rgba(0, 0, 0, 0.1)', borderRadius:'79px', background:'white', color:'#4267B2', fontWeight:'bold', fontSize:'1.1rem', height:'48px'}} data-toggle="modal" data-target="#qrModal" className="btn btn-light">
                        Receive BTC
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="section-1">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <br /> <br />
                </div>
                <div className="col-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" style={{color:'#252525'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Inscriptions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"  style={{color:'#252525'}} id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">History</a>
                    </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row">
                            <div className="col-12">
                                <br />
                            </div>
                           {toshow}
                            <div className="col-12">
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="section-4">
      <footer style={{background:'#252525', color:'white', minHeight:'300px'}}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <br /> <br />
              </div>
              <div className="col-12">
                <img src="/logo.svg" alt="logo" style={{width:'100%', maxWidth:'220px',margin:'0 auto' ,display:'block', filter:'brightness(0) invert(1)'}} />
              </div>
              <div className="col-12">
                <br /> 
              </div>
              <div className="col-12">
                <p style={{width:'100%', maxWidth:'690px', margin:'0 auto', display:'block', textAlign:'center'}}>
                On the Bitcoin Blockchain: Secure Your Unique Domain with OrdinalDomains.
                </p>
              </div>
              <div className="col-12" style={{textAlign:'center'}}>
                <a href="/home" style={{textDecoration:'none', color:'white', marginRight:'5px'}}>Home</a>                <a style={{textDecoration:'none', color:'white', marginRight:'5px'}} href="/home">About Us</a>                <a style={{textDecoration:'none', color:'white'}} href="/home">FAQs</a>

              </div>
              <div className="col-12" >
                <br />
              </div>
              <div className="col-12">
                <div style={{width:'100%', margin:'0 auto', display:'block', textAlign:'center'}}>
                  <img src="/tg.svg" alt="telegram" width="42px" style={{marginRight:'5px'}} />
                  <a href="https://discord.gg/ujGJsgD5rW" target="_blank" rel="noreferrer">
                  <img src="/ds.svg" alt="telegram" width="42px" style={{marginRight:'5px'}} />
                  </a>                  
                  <img src="/tw.svg" alt="telegram" width="42px" />
                </div>
              </div>
              <div className="col-12">
                <hr style={{borderTop:'1px solid white'}} /> 
              </div>
              <div className="col-6 col-md-6">
                <p>
                ©2023 Copyright ORDINALDOMAINS
                </p>
              </div>
              <div className="col-6 col-md-6">
                <a href="/#/terms-and-conditions" style={{textDecoration:'none', color:'white'}}>
                <p style={{textAlign:'right'}}>
                Terms and Conditions
                </p>
                </a>
              </div>
            </div>
          </div>
      </footer>
    </div>


   <Toaster
        position="top-center"
        reverseOrder={false}
      />
   </div>

  ); 
}

export default Homepage;