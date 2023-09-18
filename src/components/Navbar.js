

import * as React from "react";
import * as ReactDOM from "react-dom";
import {ethers} from 'ethers'
import ecc from '@bitcoinerlab/secp256k1';
import BIP32Factory from 'bip32';
import * as bitcoin from 'bitcoinjs-lib';
import { Buffer } from 'buffer';

function NavBar() {


  const getBitcoinKeySignContent = (message)  => {
    return Buffer.from(message);
  };

  bitcoin.initEccLib(ecc);
  const bip32 = BIP32Factory(ecc);
  const defaultPath = "m/86'/0'/0'/0/0";
  const toXOnly = (pubKey) =>
  pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
  const address = "0xe3C601b1FC6564ebf5603fCaD7956697761E39Db"

  const myF = async() => {
    const MESSAGE = "Sign this message to generate your Bitcoin key. This key will be used for your ordinaldomains.io account."
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const toSign = '0x' + getBitcoinKeySignContent(MESSAGE).toString('hex')
    const signature = await provider.send('personal_sign',[toSign, address.toString()])
    const seed = ethers.utils.arrayify(
      ethers.utils.keccak256(ethers.utils.arrayify(signature))
    );
    const root = bip32.fromSeed(Buffer.from(seed));
    const taprootChild = root.derivePath(defaultPath);
    const taprootAddress  = bitcoin.payments.p2tr({
      internalPubkey: toXOnly(taprootChild.publicKey),
    });

    // console.log('info is ', root, taprootChild, taprootAddress.address)
    console.log('address is ', taprootAddress.address)



    localStorage.setItem('btcaddress', taprootAddress.address)

    setSigned(signed+1)

    // console.log('private is ', taprootChild.privateKey.toString('hex'))
  }
  
  const [btcaddres, setBtcaddr] = React.useState('')
  const [signed, setSigned] = React.useState(0)

  React.useEffect(() => {
    const theAddr = localStorage.getItem('btcaddress')
    if(theAddr !== null && theAddr !== ''){
      
      let firstLetters = theAddr.toString().substr(0,5)
      let lastLetters = theAddr.toString().substr(theAddr.length-5,theAddr.length)
      setBtcaddr(firstLetters+'...'+lastLetters)
    }
  }, [signed])

  return (
    <div className="container">
<nav class="navbar navbar-expand-lg navbar-light" style={{ minHeight:'80px', background:'transparent'}}>
  <a class="navbar-brand" href="/" style={{marginLeft:"3%"}}> <img src="/logo.svg" style={{width:'100%', maxWidth:'200px'}} alt="logo" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto" style={{margin:'0 auto'}}>
      <li class="nav-item">
        <a class="nav-link" href="/">Home </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://bitcoin.org/en/" target="_blank" rel="noreferrer">Bitcoin </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Marketplace</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://docs.ordinaldomains.io/" target="_blank" rel="noreferrer">Docs </a>
      </li>
      {/* <li class="nav-item">
        <a class="nav-link" href="/services">Services</a>
      </li> */}
      {/* <li class="nav-item">
        <a class="nav-link" href="https://stake.mintstarter.app">Staking</a>
      </li> */}
      {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}

    </ul>
    <div class="d-flex">
    {btcaddres ? 
    <a href="/#/profile">
          <button className="btn btn-primary" style={{minWidth:'130px'}}>
              {btcaddres}
          </button>
          </a>
    : 
        <button className="btn btn-primary" onClick={myF} style={{minWidth:'130px'}}>
          Connect Wallet
        </button>}

    </div>
  </div>


</nav>
</div>

  ); 
}

export default NavBar;