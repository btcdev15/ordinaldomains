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
    

          window.location.href = `/domain/${inp}`
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
              The Perfect Domain <span style={{color:'#4267B2'}}>.BTC</span> Is  Here
            </h1>
            <p>
            Decentralised naming for wallets, websites, & more. Your .BTC domain powered by Ordinals.
            </p>
            <div className="inputcontainer">
            <input value={inp} onChange={(event) => setInp(event.target.value)}  style={{width:'100%', display:'inline', maxWidth:'350px', padding:'10px', lineHeight:'2.125rem', fontSize:'1.625rem', border:'0px', background:'transparent'}} type="text" class="form-control" placeholder="Type the domain you want" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <button onClick={searchName} class="btn btn-primary" type="button" style={{float:'right', marginRight:'5px', marginTop:'2px', fontSize:'1.5rem'}}>Search</button>

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
            Entire Metadata Securely Preserved on Bitcoin's First Layer
            </h1>
            <p style={{color:'#252525'}}>
            Each byte of BTCDOMAIN's metadata finds its permanent home on the Bitcoin blockchain. The .btc domains are etched as structured JSON text directly onto the Bitcoin mainnet, where every domain serves as a unique inscription, comparable to a BTC NFT. 
            </p>
            <p style={{color:'#252525'}}>
            With Bitcoin's existence, your domain's usability and searchability stand the test of time. No need for trust, simply verify!
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
                Check the availability of your preferred domain.
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
                Register with a Bitcoin connected Stacks account in just a few clicks.
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
                Manage and self-custody your .BTC domains all in one place.
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
        <button class="btn btn-link" style={{color:'black'}} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo"  style={{background:'white'}}>
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" style={{color:'black'}} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree"  style={{background:'white'}}>
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" style={{color:'black'}} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                <p style={{width:'100%', maxWidth:'690px', margin:'0 auto', display:'block'}}>Maecenas a ultrices risus. Etiam accumsan ligula feugiat facilisis dictum. Sed viverra vitae mi vel malesuada. Sed sem lectus, efficitur id nunc et, dictum lacinia nibh.</p>
              </div>
              <div className="col-12" style={{textAlign:'center'}}>
                <hr />
                <a href="/home" style={{textDecoration:'none', color:'white', marginRight:'5px'}}>Home</a>                <a style={{textDecoration:'none', color:'white', marginRight:'5px'}} href="/home">About Us</a>                <a style={{textDecoration:'none', color:'white'}} href="/home">FAQs</a>

              </div>
              <div className="col-12" >
                <br />
              </div>
              <div className="col-12">
                <div style={{width:'100%', margin:'0 auto', display:'block', textAlign:'center'}}>
                  <img src="/tg.svg" alt="telegram" width="42px" />
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

export default Homepage;