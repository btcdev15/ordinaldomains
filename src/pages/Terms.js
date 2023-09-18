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



function Terms() {
  

  
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

    <div className="container">
        <div className="row">
            <div className="col-12">
            <h1 style={{textAlign:'center'}}>TERMS & CONDITIONS</h1>

<h2>1. INTRODUCTION</h2>
<p>Welcome to OrdinalDomains.io. This website is owned and operated by OrdinalDomains.io ("we", "our", "us"). By using our services to purchase .BTC domains using the Bitcoin ordinal technology, you agree to comply with the following Terms and Conditions.</p>

<h2>2. ELIGIBILITY</h2>
<p>You must be at least 18 years old to use our services or such greater age required in your country to register a domain or use our services.</p>

<h2>3. SERVICES</h2>
<p>We provide a service that allows you to purchase .BTC domains using Bitcoin ordinal technology, which inscribes domains on Bitcoin's Layer 1. The specifics of each domain will be provided at the time of purchase.</p>

<h2>4. PURCHASES AND PAYMENTS</h2>
<p>We support a variety of cryptocurrencies for purchases. By purchasing a domain, you confirm that you are the legal owner of the cryptocurrency wallet used for the transaction.
When you acquire a domain from OrdinalDomains, you're essentially obtaining a unique imprint on the Bitcoin network (Layer 1), akin to owning an NFT. Please understand that this domain doesn't inherently carry any financial value, and it should not be purchased with the intention of potential profit or speculative purposes. It is solely intended for your enjoyment and entertainment.
</p>

<h2>5. DOMAIN REGISTRATION</h2>
<p>Upon purchasing a .BTC domain, you will have exclusive rights to use this domain, subject to these terms and any applicable laws and regulations. We are not responsible for disputes over domain ownership that may arise after the domain has been purchased and registered.</p>

<h2>6. USER RESPONSIBILITIES</h2>
<p>You are solely responsible for maintaining the security of your domain and for any activities that occur under your domain. You agree to notify us immediately if you suspect any unauthorized use of your domain.</p>

<h2>7. DISCLAIMER</h2>
<p>We make no guarantee as to the continuous, uninterrupted or error-free operation of the service, and we make no warranty that the service will meet your requirements. We cannot guarantee that each domain you purchase will be available forever, as this depends on the continuation of the Bitcoin network.</p>

<h2>8. LIMITATION OF LIABILITY</h2>
<p>We will not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>

<h2>9. CHANGES TO TERMS</h2>
<p>We reserve the right to modify these terms at any time. If we make changes, we will notify you by revising the date at the top of these terms and, in some cases, we may provide additional notice.</p>

<h2>10. CONTACT</h2>
<p>If you have any questions about these terms, please contact us at [insert email address].</p>

<p>By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

<p>Last Updated: 23 May 2023</p>

<p><em>Note: This is a basic framework for terms and conditions and should be customized based on specific legal requirements and considerations. It is advised to seek legal counsel in order to accurately define the terms and conditions for your specific situation.</em></p>

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
                <p style={{textAlign:'right'}}>
                Terms and Conditions
                </p>
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

export default Terms;