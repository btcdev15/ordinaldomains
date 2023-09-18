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
import CoinbaseCommerceButton from 'react-coinbase-commerce';
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
  

  
  const [inp, setInp] = React.useState('')


  const searchName = async() => {
    try{
      if(inp.length < 3){
        toast.error('Minimum domain length is 3 characters!')
        throw 'err';
      }

      

      if(inp !== ''){

        if(inp.includes('.btc')){
          var ret = inp.replace(/.btc/g,'');
          if(ret.length < 3){
            toast.error('Minimum domain length is 3 characters!')
            throw 'err';
          }

          const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          const res = specialChars.test(ret)
          console.log(res)
          if(res == true){
            toast.error('name can only be characters and numbers. We attach .btc')
            throw 'err'
          }
    

          window.location.href = `/#/domain/${ret}`
        } else {
          const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          const res = specialChars.test(inp)
          if(res == true){
            toast.error('name can only be characters and numbers. We attach .btc')
            throw 'err'
          }
    

          window.location.href = `/#/domain/${inp}`
        }
      }

    }catch(err){

    }

  }


  return (
    <div>
    <Navbar />
    <div className="section-1">
      <span className="ellipse" />
      <div className="container" style={{marginTop:'5rem'}}>
        <div className="row">
          <div className="col-12 col-md-6">
            <h1 style={{fontWeight:'bold', fontSize:'3rem', marginTop:'5rem'}}>
              The perfect domain <span style={{color:'#4267B2'}}>.BTC</span> is  here
            </h1>
            <p style={{fontSize:'1.5rem'}}>
            Decentralised naming for wallets, websites, & more. Your .BTC domain powered by Ordinals.
            </p>
            <div className="inputcontainer">
            <input value={inp}     onKeyPress={event => {
                if (event.key === 'Enter') {
                  searchName()
                }
              }} onChange={(event) => setInp(event.target.value)}  style={{width:'100%', display:'inline', maxWidth:'350px', padding:'10px', paddingLeft:'20px', lineHeight:'2.125rem', fontSize:'1rem', height:'52.99px', fontWeight:"bold", border:'0px', background:'transparent'}} type="text" class="form-control" placeholder="Type the domain you want" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <button onClick={searchName} class="btn btn-primary" type="button" style={{float:'right', fontSize:'1rem', width:'100%', maxWidth:'120px', height:'53px'}}>Search</button>

            </div>
          </div>
          <div className="col-12 col-md-6">
            <img src="/btc.svg" alt="btc" style={{width:'100%', maxWidth:'501px'}} />
          </div>

          <div className="col-12">
            <div className="card-custom" style={{marginTop:'5rem'}}>
              <div className="card-body">
                <div className="row">
                  <div className="col-4 col-md-3" style={{textAlign:'center'}}>
                    <h2 style={{color:'#4267B2', fontWeight:'bold'}}>
                      30M+
                    </h2>
                    <p style={{color:'#252525'}}>
                      Domains Registered
                    </p>
                  </div>
                  <div className="col-4 col-md-3" style={{textAlign:'center'}}>
                    <h2 style={{color:'#4267B2', fontWeight:'bold'}}>
                      250
                    </h2>
                    <p style={{color:'#252525'}}>
                      Unique Users
                    </p>
                  </div>
                  <div className="col-4 col-md-3" style={{textAlign:'center'}}>
                    <h2 style={{color:'#4267B2', fontWeight:'bold'}}>
                    €16.82
                    </h2>
                    <p style={{color:'#252525'}}>
                      Starting From
                    </p>
                  </div>
                  <div className="col-12 col-md-3" style={{textAlign:'center'}}>
                    <h2 style={{color:'#4267B2', fontWeight:'bold'}}>
                      50 BTC
                    </h2>
                    <p style={{color:'#252525'}}>
                      Trading Volume
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6" style={{marginTop:'5rem'}}>
            <img src="/content.svg" alt="content" style={{width:"100%", maxWidth:'540px'}} />
          </div>
          <div className="col-12 col-md-6" style={{marginTop:'5rem'}}>
            <h1 style={{fontWeight:'bold', color:'black', fontSize:'3rem', marginTop:'3rem'}}>
            Comprehensive Metadata Securely Stored on Bitcoin's Initial Layer
            </h1>
            <p style={{color:'#252525'}}>
            Every byte of metadata from OrdinalDomain is securely housed on the Bitcoin blockchain. These .btc domains are imprinted as structured JSON text right onto the Bitcoin mainnet. In this sense, each domain symbolizes a unique mark, akin to a BTC NFT.
            </p>
            <p style={{color:'#252525'}}>
            Owing to Bitcoin's longevity, your domain's functionality and findability remain unaffected by time. Trust isn't required; verification is all you need!
            </p>
          </div>
          <div className="col-12">
            <br /> <br />
          </div>
        </div>
      </div>
      
    </div> 


    <div className="section-2" style={{background:'#F4F4F4'}}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <br /> <br />
        </div>
          <div className="col-12">
            <h1 style={{fontSize:'3rem', fontWeight:'bold', textAlign:'center'}}>Register .BTC Domains in 3 Easy steps</h1>
          </div>
          <div className="col-12 col-md-4">
            <div className="card-custom" style={{marginTop:'5rem'}}>
              <div className="card-body">
                <img src="/card1.svg" alt="card1" style={{width:'100%', maxWidth:'50px', margin:'0 auto', display:'block'}} />
                <h2 style={{textAlign:'center'}}>Search</h2>
                <p style={{textAlign:'center'}}>
                Begin your journey online by verifying if your desired domain is available.
              </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card-custom" style={{marginTop:'5rem'}}>
              <div className="card-body">
                <img src="/card2.svg" alt="card2" style={{width:'100%', maxWidth:'50px', margin:'0 auto', display:'block'}} />
                <h2 style={{textAlign:'center'}}>Register</h2>
                <p style={{textAlign:'center'}}>
                Effortlessly register your .BTC domain in just a few quick clicks.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card-custom" style={{marginTop:'5rem'}}>
              <div className="card-body">
                <img src="/card2.svg" alt="card1" style={{width:'100%', maxWidth:'50px', margin:'0 auto', display:'block'}} />
                <h2 style={{textAlign:'center'}}>Manage</h2>
                <p style={{textAlign:'center'}}>
                Manage your .BTC domains under self-custody in one place.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <br /> <br />
          </div>
      </div>
    </div>
    </div>

    <div className="section-3">
      <div className="container">
        <div className="row">
        <div className="col-12 col-md-4" style={{marginTop:'5rem'}}>
            <h1 style={{fontWeight:'bold', color:'black', fontSize:'3rem', marginTop:'3rem'}}>
            Advanced Security Features
                        </h1>
            <br />
            <p style={{color:'#252525'}}>
            ✅Stored on BTC Chain
            </p>
            <p style={{color:'#252525'}}>
            ✅Protected through secure HMAC
            </p>
            <p style={{color:'#252525'}}>
            ✅Timestamped
            </p>
            <p style={{color:'#252525'}}>
            ✅Signed securely by OrdinalDomains
            </p>
          </div>
        <div className="col-12 col-md-8" style={{marginTop:'5rem'}}>
            <img src="/metadata.svg" alt="metadata" style={{width:"100%", maxWidth:'824px'}} />
          </div>
        <div className="col-12">
          <br />          <br />
        </div>
        </div>
      </div>
    </div>


    <div className="section-2" style={{background:'#F4F4F4'}}>
      <div className="container">
        <div className="row">
          <div className="col-12">
          <h1 style={{fontWeight:'bold', color:'black', fontSize:'3rem', marginTop:'3rem', textAlign:'center'}}>
            Latest Domain Sold
                        </h1>
          </div>
            <div className="col-6 col-md-3">
              <div className="card-custom" style={{marginTop:'5rem'}}>
                <div className="card-body" style={{textAlign:'center', fontWeight:'bold'}}>
                  london.btc
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card-custom" style={{marginTop:'5rem'}}>
                <div className="card-body" style={{textAlign:'center', fontWeight:'bold'}}>
                  gold.btc
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card-custom" style={{marginTop:'5rem'}}>
                <div className="card-body" style={{textAlign:'center', fontWeight:'bold'}}>
                  bitcoin.btc
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card-custom" style={{marginTop:'5rem'}}>
                <div className="card-body" style={{textAlign:'center', fontWeight:'bold'}}>
                  google.btc
                </div>
              </div>
            </div>
            <div className="col-12">
              <br /> <br />
            </div>
        </div>
      </div>
    </div>


    <div className="section-3">
      <div className="container">
        <div className="row">
            <div className="col-12">
              <br /> <br />
            </div>
            <div className="col-12">
              <h1 style={{textAlign:'center', fontWeight:'bold'}}>
                FAQ's
              </h1>
              <p style={{textAlign:'center', width:'100%', maxWidth:'672px', margin:'0 auto', display:'block', marginTop:'2rem'}}>
              We attempt to answer some of our frequently asked questions. If you like to learn more and discuss your use-case, get in touch now.
              </p>
            </div>
            <div className="col-12">
            <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne" style={{background:'white'}}>
      <h5 class="mb-0">
      <button class="btn btn-link" style={{color:'black', fontWeight:'bold', textDecoration:'none'}} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Is it really on Bitcoin Layer 1?
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
      Indeed! Your domain will permanently exist on Bitcoin Layer 1. Anyone using Bitcoin will always be capable of finding your domain, providing endless visibility.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo"  style={{background:'white'}}>
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" style={{color:'black', fontWeight:'bold', textDecoration:'none'}} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Can I resolve my address for a website?
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
      In line with our development plans, we aim to expand the protocol to offer a broader resolver service. This will enable you to link your .btc domain to websites across the vast expanse of the World Wide Web.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree"  style={{background:'white'}}>
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" style={{color:'black', fontWeight:'bold', textDecoration:'none'}} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          What are your payment options?
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        We accept a wide range of cryptocurrencies including BTC, ETH, USDC, DOGE, LTC, DAI, BCH, USDT, and MATIC. Additionally, we also support WETH and USDC transactions on the Polygon network.
      </div>
    </div>
  </div>
</div>
            </div>
        </div>
      </div>
      <br /> <br />
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