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
  const [localinp, setLocalinp] = React.useState('')
  const [available, setAvailable] = React.useState(false)
  const [brandvalue, setBrandvalue] = React.useState(0) // 0 premium, 1 standard
  const [year, setYear] = React.useState('1')
  const [checkoutid, setCheckoutid] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [ordinalsaddr, setOrdinalsaddr] = React.useState('')
  const [validaddr, setValidaddr] = React.useState(false)
  const [orderplaced, setOrderplaced] = React.useState(false)


  const checkBrandValue = async(domain) => {


    if(domain.length <= 4){
      setBrandvalue(0)
    } else {
      setBrandvalue(1)
    }


  }

  React.useEffect(() => {

    console.log('fired')
    const calculatePrice = async() => {
      if(brandvalue == 0){
        // premium 
        switch(year){
          case '5':
            setCheckoutid('57554ccb-a178-4eee-92aa-dcb6b4fe7118')
            setPrice(335)
            break;
          case '4':
            setCheckoutid('a877ccfe-1b2f-4496-b7a1-43f893983f68')
            setPrice(268)
            break;
          case '3':
            setCheckoutid('aa53c0be-5649-4cab-a1b5-2b36e8212b14')
            setPrice(201)
            break;
          case '2':
            setCheckoutid('98752666-4c90-4775-8626-af670b0dd90e')
            setPrice(134)
            break;
          default:
            setCheckoutid('9e0d5b50-a892-4bff-96d1-464d3e959f3d')
            setPrice(67)
            break;
        }
      } else {
        switch(year){ // 150,120,90,60,30
          case '5':
            setCheckoutid('f3af30aa-ca74-4f1b-b707-1cb84e592576')
            setPrice(150)
            break;
          case '4':
            setCheckoutid('85a94977-beef-4d6a-bce0-d9fd827dc9c0')
            setPrice(120)
            break;
          case '3':
            setCheckoutid('ff54dc09-e869-424d-8f4f-14eba1d20de2')
            setPrice(90)
            break;
          case '2':
            setCheckoutid('48014274-ff21-4d1b-91f5-0fa76d4725c1')
            setPrice(60)
            break;
          default:
            setCheckoutid('4b3e1811-41c6-46ee-8acc-8a15e870d237')
            setPrice(30)
            break;
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
      // address 0x42e52c405c956fc2eb4e3df5988182cc80987524
      const web3 = new Web3(
        // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
        new Web3.providers.HttpProvider("https://nova.arbitrum.io/rpc	")
      );

      const theString = domain+'.btc'

      const contract = new web3.eth.Contract(ABI, '0x42e52c405c956fc2eb4e3df5988182cc80987524');
      const toBytes32 = await contract.methods.stringToBytes32(theString).call()
      console.log(toBytes32)
      const available = await contract.methods.isUsed(toBytes32).call()
      console.log('available ', available)
      if(available == true){
        setAvailable(false)
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
    <div style={{background:'linear-gradient(90deg,#513eff 0%,#52e5ff 100%)'}}>
      <Navbar />
      <div>
        <h1 style={{textAlign:'center', color:'whitesmoke', fontWeight:'bold'}}>
        Decentralised naming for wallets, websites, & more.
        </h1>
        <br />
        <h1 style={{textAlign:'center', fontSize:'3rem', color:'white', fontWeight:'bold'}}>
        Your <span style={{padding:'5px', background:' #f2a900', borderRadius:"10px"}}>.BTC</span> domain powered by Ordinals.
        </h1>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="input-group mb-3">
                <input value={inp} onChange={(event) => setInp(event.target.value)}  style={{width:'100%', maxWidth:'462px', margin:'0 auto', display:'block', padding:'10px', lineHeight:'2.125rem', fontSize:'1.625rem', border:'3px solid rgb(232, 232, 232)', borderRadius:'10px'}} type="text" class="form-control" placeholder="search for a name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
              </div>
            </div>
            <div className="col-12">
              <div class="input-group-append">
                <button onClick={searchName} class="btn btn-light" type="button" style={{margin:'0 auto', fontSize:'1.5rem'}}>Search</button>
              </div>
            </div>
          </div>
        </div>
        <br />

      </div>
      {/* <Footer /> */}

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
   </div>
   <br />
   {localinp !== '' ? 
      <div className="container" style={{textAlign:'center'}}>
      <div className="row">
        <div className="col-6">
                <h4>{localinp}.btc</h4>
            </div>
            <div className="col-6">
                <h4>{available == true ? 'Available' : 'Not Available'}</h4>
        </div>
      </div>
     </div>
   : null}

   {available == true ?     <div className="container" style={{textAlign:'center'}}>
    {orderplaced == true ? <div className="row">
      <div className="col-12">
        <p style={{fontWeight:'bold', color:'white', background:'orange'}}>Order in progress. It may take up to few minutes to an hour 
        before you get your delivery depending on the btc network. </p>
      </div>
       </div> : null}
      <div className="row">
        <div className="col-12 col-md-6">
          <label class="mr-sm-2" for="inlineFormCustomSelect">Ordinals Receiving Address</label>
          <input onChange={(event) => checkOrdinalsAddress(event.target.value)}  style={{width:'100%', maxWidth:'462px', border:'3px solid rgb(232, 232, 232)', borderRadius:'10px'}} type="text" class="form-control" placeholder="bc1qu23uv24rcw8wptptzrtx0ckay74859rzkjnpg4" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        </div>
        <div className="col-12 col-md-6">
          <label class="mr-sm-2" for="inlineFormCustomSelect">Registration Period </label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(event) => setYear(event.target.value)}>
            <option selected value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
          </select>
        </div>
        <div className="col-12">
          <br />
          <div className="card">
            <div className="card-body">
              <h4>You are about to buy <span style={{fontWeight:'bold'}}>{localinp}.btc</span></h4>
              {brandvalue == 0 ? <p className="badge badge-dark">This is a PREMIUM domain</p> : <p className="badge badge-secondary">This is a STANDARD domain</p>}
              <h4>{year} year(s) </h4>
              <h4>Promotional Offer: </h4>
              <h4 style={{fontWeight:'bold', color:'#07da63'}}>${price} </h4>
              <CoinbaseCommerceButton disabled={!validaddr} className="btn btn-primary" onPaymentDetected={chargeSuccess} onChargeFailure={chargeFailure} checkoutId={checkoutid} />
            </div>
          </div>
        </div>
      </div>
      <br />

    </div> : null}


   <Toaster
        position="top-center"
        reverseOrder={false}
      />
   </div>

  ); 
}

export default Homepage;