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
import {
    useParams
  } from "react-router";


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



function DomainExplorer() {
  
    let { thedomain } = useParams();


  
  const [inp, setInp] = React.useState('')
  const [inp2, setInp2] = React.useState('')

  const [localinp, setLocalinp] = React.useState('')
  const [available, setAvailable] = React.useState(false)
  const [brandvalue, setBrandvalue] = React.useState(0) // 0 premium, 1 standard
  const [year, setYear] = React.useState('1')
  const [checkoutid, setCheckoutid] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [ordinalsaddr, setOrdinalsaddr] = React.useState('')
  const [validaddr, setValidaddr] = React.useState(false)
  const [orderplaced, setOrderplaced] = React.useState(false)
  const [expiry, setExpiry] = React.useState('')
  const [creation, setCreation] = React.useState('')
  const [txhash, setTxhash] = React.useState('')
  const [resolver, setResolver] = React.useState('')


  React.useEffect(() => {
    
    if(inp == ''){
        setInp(thedomain)
    }

    if(inp !== '' && localinp == ''){
        searchName()
    }

  },[thedomain, inp])

  const checkBrandValue = async(domain) => {


    if(domain.length == 3){
      setBrandvalue(0)
    } else {
      if(domain.length == 4){
        setBrandvalue(1)
      } else {
        setBrandvalue(2)
      }
    }


  }

  React.useEffect(() => {


    const calculatePrice = async() => {
      if(brandvalue == 0){
        // premium 
        switch(year){
          case '5':
            setCheckoutid('57554ccb-a178-4eee-92aa-dcb6b4fe7118')
            setPrice(345)
            break;
          case '4':
            setCheckoutid('a877ccfe-1b2f-4496-b7a1-43f893983f68')
            setPrice(278)
            break;
          case '3':
            setCheckoutid('aa53c0be-5649-4cab-a1b5-2b36e8212b14')
            setPrice(211)
            break;
          case '2':
            setCheckoutid('98752666-4c90-4775-8626-af670b0dd90e')
            setPrice(144)
            break;
          default:
            setCheckoutid('9e0d5b50-a892-4bff-96d1-464d3e959f3d')
            setPrice(77)
            break;
        }
      } else {
        if(brandvalue == 1){
          switch(year){ // 150,120,90,60,30
            case '5':
              setCheckoutid('f3af30aa-ca74-4f1b-b707-1cb84e592576')
              setPrice(160)
              break;
            case '4':
              setCheckoutid('85a94977-beef-4d6a-bce0-d9fd827dc9c0')
              setPrice(130)
              break;
            case '3':
              setCheckoutid('ff54dc09-e869-424d-8f4f-14eba1d20de2')
              setPrice(100)
              break;
            case '2':
              setCheckoutid('48014274-ff21-4d1b-91f5-0fa76d4725c1')
              setPrice(70)
              break;
            default:
              setCheckoutid('4b3e1811-41c6-46ee-8acc-8a15e870d237')
              setPrice(40)
              break;
          }
        } else {
          switch(year){ // 150,120,90,60,30
            case '5':
              setCheckoutid('f76192d5-afe2-4c44-b059-b20104e86299')
              setPrice(44.10)
              break;
            case '4':
              setCheckoutid('1abf115b-8540-448e-a427-cd66dc7e04f3')
              setPrice(37.28)
              break;
            case '3':
              setCheckoutid('721faadf-3409-4a74-adb8-0cacabe6c5d0')
              setPrice(30.46)
              break;
            case '2':
              setCheckoutid('a9efd80c-ce3e-42cd-92fa-52da11110069')
              setPrice(23.60)
              break;
            default:
              setCheckoutid('559bb58c-d871-446e-be80-1b120371901b')
              setPrice(16.82)
              break;
          }
        }

      }
    }

    calculatePrice()

  }, [brandvalue, year])


  const searchName = async() => {
    try{

      if(inp.length < 3){
        toast.error('Minimum domain length is 3 characters!')
        throw 'err';
      }
      

      if(inp == ''){
        toast.error("Name cannot be blank")
        throw 'err';
      }

      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const res = specialChars.test(inp)
      console.log(res)
      if(res == true){
        toast.error('name can only be characters and numbers. We attach .btc')
        throw 'err'
      }

    if(hasWhiteSpace(inp) == true){
      toast.error('Name cannot contain whitespace')
      throw 'err'
    }

    checkBrandValue(inp)

    toast.promise(
      checkAvailability(inp),
       {
         loading: 'Checking availability...',
         success: <b>Domain available</b>,
         error: <b>NOT availabe.</b>,
       }
     );
     setLocalinp(inp)



    }catch(err){
      console.log('err ', err)
    }
  }



  const checkAvailability = async(domain) => {
      // address 0x1C60b08ad39b693EF1f6b3BdBfFA6f5B9b34dd47
      const web3 = new Web3(
        // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
        new Web3.providers.HttpProvider("https://nova.arbitrum.io/rpc	")
      );

      const theString = domain+'.btc'

      const contract = new web3.eth.Contract(ABI, '0x1C60b08ad39b693EF1f6b3BdBfFA6f5B9b34dd47');
      // const toBytes32 = await contract.methods.stringToBytes32(theString).call()
      // console.log(toBytes32)
      const available = await contract.methods.isUsed(theString.toLowerCase()).call()

      const expiryDate = await contract.methods.expirationDate(theString.toLowerCase()).call()
      console.log('expiry is ', expiryDate)

      const createDate = await contract.methods.creationDate(theString.toLowerCase()).call()
      const txHashCreation = await contract.methods.txHashCreation(theString.toLowerCase()).call()
      const resolverr = await contract.methods.resolver(theString.toLowerCase()).call()

      const date1 = new Date(parseFloat(expiryDate))
      const date2 = new Date(parseFloat(createDate))

      setExpiry(date1.toString())
      setCreation(date2.toString())
      setTxhash(txHashCreation)
      setResolver(resolverr)
      setAvailable(false)

      if(available == true){


        throw 'not available';
      }
      setAvailable(true)


  }

  const checkOrdinalsAddress = async(ordaddr) => {
    if(ordaddr.startsWith('bc1') == true){
      setOrdinalsaddr(ordaddr)
      setValidaddr(true)
    } else {
      toast.error('This ordinals address is invalid')
    }
  }


  const chargeFailure = async() => {
    toast.error('Something went wrong')
  }

  const chargeSuccess = async() => {
    
    toast.promise(
      postOrderInfo(),
       {
         loading: 'Do not close this page...',
         success: <b>Order Placed!</b>,
         error: <b>Something went wrong with your order.</b>,
       }
     );


  }

  const postOrderInfo = async() => {
    await axios.post('https://fierce-plains-92629.herokuapp.com/recordInfo', {
      "address":ordinalsaddr,
      "years":year,
      "name":localinp+'.btc'
    })
    setOrderplaced(true)
  }

  function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

  return (
    <div>
    <Navbar />
]    <div className="section-1">
      <span className="eclipse" />
      <div className="container" style={{marginTop:'5rem'}}>
        <div className="row">
          <div className="col-12 col-md-12">
            <h1 style={{fontWeight:'bold', fontSize:'4rem', marginTop:'1rem', textAlign:'center'}}>
              The Perfect Domain <span style={{color:'#4267B2'}}>.BTC</span>
            </h1>
            <h1 style={{fontWeight:'bold', fontSize:'4rem', textAlign:'center'}}>
                Is  Here 
            </h1>
            <div className="inputcontainer" style={{width:'100%', maxWidth:'558px', margin:'0 auto' ,display:'block'}}>
            <input value={inp} onChange={(event) => setInp(event.target.value)}  style={{width:'100%', display:'inline', maxWidth:'350px', padding:'10px', lineHeight:'2.125rem', fontSize:'1.625rem', border:'0px', background:'transparent'}} type="text" class="form-control" placeholder="Type the domain you want" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <button onClick={searchName} class="btn btn-primary" type="button" style={{float:'right', marginRight:'5px', marginTop:'2px', fontSize:'1.5rem'}}>Search</button>

            </div>
          </div>




          <div className="col-12">
            <br /> <br />
          </div>



        </div>
      </div>

        <div className="section-2" style={{background:'white'}}>
            <div className="container" style={{marginTop:'0rem'}}>
                <div className="row">
                    <div className="col-12">
                    <div className="card-custom" style={{marginTop:'0rem'}}>
                        <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color:'#252525'}}>Name</h5> 
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <h5 style={{color:'#252525'}}>State</h5> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h4 style={{color:'black', fontWeight:'bold'}}>{localinp}.btc</h4> 
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <h4 style={{color: available == true ? 'green' : 'red', fontWeight:'bold'}}>{available == true ? 'Available' : 'Not Available'}</h4> 
                                    </div>
                                </div>
                        </div>
                            </div>
                    </div>
                    <div className="col-12">
                        <br />
                    </div>
                    {available == true ? 
                    <>
                      <div className="col-12">
                        <div className="row" style={{padding:'1.25rem'}}>
                                    <div className="col-6">
                                        <h5 style={{color:'#252525'}}>Ordinal Receiving Address</h5> 
                                        <input onChange={(event) => checkOrdinalsAddress(event.target.value)}  style={{width:'100%', maxWidth:'462px', border:'3px solid rgb(232, 232, 232)', borderRadius:'10px'}} type="text" class="form-control" placeholder="bc1qu23uv24rcw8wptptzrtx0ckay74859rzkjnpg4" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <button className="btn btn-primary">Register</button>
                                    </div>
                        </div>
                        <div className="row" style={{padding:'1.25rem'}}>
                                    <div className="col-6">
                                        <h5 style={{color:'#252525'}}>Registration period (in years)</h5> 
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(event) => setYear(event.target.value)}>
                                            <option selected value="1">1 year</option>
                                            <option value="2">2 years</option>
                                            <option value="3">3 years</option>
                                            <option value="4">4 years</option>
                                            <option value="5">5 years</option>
                                        </select>
                                    </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <hr />
                    </div>
                    <div className="col-12">
                        <div className="row" style={{padding:'1.25rem'}}>
                            <div className="col-6">
                                <h5 style={{color:'#252525'}}>Service fee Including Gas <span style={{color:'#07DA63'}}>(50% Discount)</span></h5> 
                            </div>
                            <div className="col-6" style={{textAlign:'right', fontWeight:'bold'}}>
                                €{price}
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{textAlign:'center'}}>
                    <CoinbaseCommerceButton disabled={!validaddr} className="btn btn-primary" onPaymentDetected={chargeSuccess} onChargeFailure={chargeFailure} checkoutId={checkoutid} />
                    </div>
                    <div className="col-12">
                        <br />
                    </div>
                    </> : 
                    <>
                                    <div className="col-6">
                                        <h5 style={{color:'#252525'}}>Owner</h5> 
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <p>{resolver}</p>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color:'#252525'}}>Create Date:</h5> 
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <p>{creation}</p>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color:'#252525'}}>Expiry Date</h5> 
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                        <p>{expiry}</p>
                                    </div>
                                    <div className="col-6" style={{textAlign:'left'}}>
                                    <a href={`https://ordinals.com/preview/${txhash}`} target="_blank" rel="noreferrer">
                                        <button className="btn btn-primary">View Inscription</button>
                                    </a>
                                    </div>
                                    <div className="col-6" style={{textAlign:'right'}}>
                                    <a href={`https://www.blockchain.com/explorer/transactions/btc/${txhash.replace('i0','')}`} target="_blank" rel="noreferrer">
                                        <button className="btn btn-primary">View on Bitcoin Mainnet</button>
                                    </a>
                                    <div className="col-12">
                                        <br /> <br />
                                    </div>

                        
        </div>
                    </>
                    }
                  
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

export default DomainExplorer;