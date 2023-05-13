

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    useWeb3React,
  } from "@web3-react/core";
import Web3 from 'web3'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import ABIPolygon from '../utils/abi_both.json'
import ABIEth from '../utils/abi_eth.json'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import multicallabi from '../utils/abi_multicall.json'
import { Interface } from '@ethersproject/abi'
import ethabi from '../utils/abi_eth.json'
import polygonabi from '../utils/abi_polygon.json'
import {CrossmintPayButton} from '@crossmint/client-sdk-react-ui'

const projectId = '271a2F9WoNKWxEw8NNtmMkviS4x'
const projectSecret = 'ecfad3264edefc0e18f1ba349cb95796'


function NFTSaleComponent(props) {
  
    // {props.address}


  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
    active,
  } = context;

  const [thechain, setThechain] = React.useState()
  const [nftimg, setNftimg] = React.useState('')
  const [ipfses, setIpfses] = React.useState([])
  const [attributes, setAttributes] = React.useState([])
  const [price, setPrice] = React.useState('')
  const [time, setTime] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [description, setDescription] = React.useState('')
  const [twitter, setTwitter] = React.useState('')
  const [website, setWebiste] = React.useState('')
  const [telegram, setTelegram] = React.useState('')
  const [name, setName] = React.useState('')
  const [kycd, setKycd] = React.useState('')
  const [supply, setSupply] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [ownervisiting, setOwnervisiting] = React.useState(false)
  const [someimages, setSomeimages] = React.useState('')

  React.useEffect(async() => {
    let x = await axios.get(`https://fast-dusk-72169.herokuapp.com/v1/info/${props.address}`)
    setOwnervisiting(false)
    if(x.data.length > 0){
        let theChain = x.data[0].chainID; 
        setIpfses(x.data[0].ipfeses)
        setThechain(theChain)
        setNftimg(x.data[0].ipfeses[0])
        setAttributes(x.data[0].attributes)
        setDescription(x.data[0].description)
        setName(x.data[0].name)
        setKycd(x.data[0].kyc)

        const calls = [
            {
                address: props.address,
                name: 'twitter',
                params: [],
            },
            {
                address: props.address,
                name: 'website',
                params: [],
            },
            {
                address: props.address,
                name: 'telegram',
                params: [],
            },
            {
                address: props.address,
                name: 'maxSupply',
                params: [],
            },
            {
                address: props.address,
                name: 'basePriceMint',
                params: [],
            },
            {
                address: props.address,
                name: 'startMint',
                params: [],
            },
            {
                address: props.address,
                name: 'owner',
                params: [],
            },
            {
                address: props.address,
                name: 'returnLastId',
                params: [],
            }
            
        ]
        if(theChain == 1){
            const multicallResults = await ethMulticall(ethabi, calls)
            console.log('results is ', multicallResults)
            setTwitter(multicallResults[0])
            setWebiste(multicallResults[1])
            setTelegram(multicallResults[2])
            setSupply(multicallResults[3].toString())
            setPrice(multicallResults[4].toString() / 10 ** 18)
            setTime(new Date(multicallResults[5] * 1000).toString())
            setAmount(multicallResults[7].toString())
            if(account && account.toLowerCase() == multicallResults[6].toString().toLowerCase()){
                setOwnervisiting(true)
            }


        } else {
            if(theChain == 137){
                const multicallResults = await polygonMulticall(polygonabi, calls)
                console.log('results is ', multicallResults)
                setTwitter(multicallResults[0])
                setWebiste(multicallResults[1])
                setTelegram(multicallResults[2])
                setSupply(multicallResults[3].toString())
                setPrice(multicallResults[4].toString() / 10 ** 18)
                setTime(new Date(multicallResults[5] * 1000).toString())
                setAmount(multicallResults[7].toString())
                
                if(account && account.toLowerCase() == multicallResults[6].toString().toLowerCase()){
                    setOwnervisiting(true)
                }
            } else {
                const multicallResults = await bscMulticall(polygonabi, calls)
                console.log('results is ', multicallResults)
                setTwitter(multicallResults[0])
                setWebiste(multicallResults[1])
                setTelegram(multicallResults[2])
                setSupply(multicallResults[3].toString())
                setPrice(multicallResults[4].toString() / 10 ** 18)
                setTime(new Date(multicallResults[5] * 1000).toString())
                setAmount(multicallResults[7].toString())
                
                if(account && account.toLowerCase() == multicallResults[6].toString().toLowerCase()){
                    setOwnervisiting(true)
                }


                const calls2 = [];
                for(let i=1; i<= multicallResults[7]; i++){
                    calls2.push({
                        address: props.address,
                        name: 'tokenURI',
                        params: [i],
                    }
                    )    
                }
                const multicallResults2 = await bscMulticall(polygonabi, calls2)

                const resultsImages = []
                for(let i=multicallResults2.length-1; i >= multicallResults2.length-15; i--){  // var i = arr.length - 1; i >= 0; i--
                    console.log('i is ', i, multicallResults2[i])
                    let j = await axios.get(`https://ipfs.io/ipfs/${multicallResults2[i].toString().replace('ipfs://','')}`) // .replace('ipfs://','')
                    console.log(j.data.image)
                    resultsImages.push(
                        <div className="col-4 col-md-3" style={{marginBottom:'3%'}}>
                            <div className="card">
                                <img src={`https://ipfs.io/ipfs/${j.data.image}`} alt="nft" />
                            </div>
                        </div>
                        )
                }
                console.log(resultsImages)
                setSomeimages(resultsImages)

            }


        }

        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            let random = Math.round(Math.random() * (x.data[0].ipfeses.length-1));
            setNftimg(x.data[0].ipfeses[random])
          }, 1000)
        
          return () => clearInterval(intervalId); //This is important

    } else {
        toast.error("Invalid NFT collection", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }, [account, chainId, active])






  const multicallHelper = async (abi,calls) => {
    const itf = new Interface(abi)
  
    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    }))

    return calldata 

  }

  const ethMulticall = async (TOKENABI, ethCalls) => {
    const web3 = new Web3(
      // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
      new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")
    );

    const ethMulticall = new web3.eth.Contract(multicallabi, '0xeefba1e63905ef1d7acba5a8513c70307c1ce441');
    let aggregatedData = await multicallHelper(TOKENABI, ethCalls)
    const itf = new Interface(TOKENABI)

    let {returnData} = await ethMulticall.methods.aggregate(aggregatedData).call()
    const balanceTokens = returnData.map((call, i) => itf.decodeFunctionResult(ethCalls[i].name, call))
    return balanceTokens;
  }

  const polygonMulticall = async (TOKENABI, ethCalls) => {
    const web3 = new Web3(
      // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
      new Web3.providers.HttpProvider("https://polygon-rpc.com/")
    );

    const ethMulticall = new web3.eth.Contract(multicallabi, '0xa1B2b503959aedD81512C37e9dce48164ec6a94d');
    let aggregatedData = await multicallHelper(TOKENABI, ethCalls)
    const itf = new Interface(TOKENABI)

    let {returnData} = await ethMulticall.methods.aggregate(aggregatedData).call()
    const balanceTokens = returnData.map((call, i) => itf.decodeFunctionResult(ethCalls[i].name, call))
    return balanceTokens;
  }



  const bscMulticall = async (TOKENABI, ethCalls) => {
    const web3 = new Web3(
      // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
    );

    const ethMulticall = new web3.eth.Contract(multicallabi, '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B');
    let aggregatedData = await multicallHelper(TOKENABI, ethCalls)
    const itf = new Interface(TOKENABI)

    let {returnData} = await ethMulticall.methods.aggregate(aggregatedData).call()
    const balanceTokens = returnData.map((call, i) => itf.decodeFunctionResult(ethCalls[i].name, call))
    return balanceTokens;
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

/* function to save JSON to file from browser
* adapted from http://bgrins.github.io/devtools-snippets/#console-save
* @param {Object} data -- json object to save
* @param {String} file -- file name to save to 
*/
function saveJSON(data, filename){

    if(!data) {
        console.error('No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}


const [sss, setSss] = React.useState([])

const uploadIMGs = async(file) => {
    file.preventDefault();
    setSss(file.target.files)


  }

  const fixuriNFT = async() => {
    try{
        // ASSUME CHAIN ID IS CORRECT
        // setLoading(true)
        // const web3 = new Web3(library.provider)
        // const contract = new web3.eth.Contract(ABIPolygon, props.address);
        // await contract.methods.fixURImultiple(['27','29'],["ipfs://QmQK9mp8B3bS4GTZAbzeW2jvzUG8FFtZ5CW7STGKvgzCsp","ipfs://QmepAZbgSssj89h1ict6uZ7bSHwGF4WjM73gL96z9Datsy"]).send({from: account})
        // setLoading(false)


        // part 2
        // const realIPFSes = []
        // const realAttributes = []
        // const myobj = []
        // const metadatas = []
        // for(let i=0; i<67; i++){
        //   realIPFSes.push(ipfses[i])
        //   realAttributes.push(attributes[i])
        //   myobj.push({
        //       "image":ipfses[i],
        //       "attributes":realAttributes[i]
        //   })
        // }
        // for(let i=0; i<myobj.length; i++){
        //     console.log(i)
        //     saveJSON(JSON.stringify(myobj[i]),`test${i}.json`)
        //     console.log(myobj[i])
        //     await delay(1000)
        // }

        // part 3

        const theIPFSARRAY = []
        const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

        for await (const result of ipfs.addAll(sss,         {
            progress: (prog, filePath) => {
              console.log(`received: ${prog} ${filePath}`)
            }
          })) {
            console.log(result)
            theIPFSARRAY.push(`ipfs://${result.path}`)
          }
          const numberos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67']
          console.log(theIPFSARRAY)
            const web3 = new Web3(library.provider)
            console.log('numberos ', numberos, theIPFSARRAY)
            const contract = new web3.eth.Contract(ABIPolygon, props.address);
            await contract.methods.fixURImultiple(numberos,theIPFSARRAY).send({from: account})
    }
    catch(err){
        console.log(err)
        setLoading(false)
        toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }



  const mintNFT = async() => {
    try{
        // ASSUME CHAIN ID IS CORRECT
        setLoading(true)
        const web3 = new Web3(library.provider)
        const contract = new web3.eth.Contract(ABIPolygon, props.address);
        const currentNFT = await contract.methods.returnLastId().call()
        const obj = {
            "image":ipfses[currentNFT],
            "attributes": props.address !== '0x395393c422762999b6bc1979499d7024f9872645' ? attributes[currentNFT] : ''
          }


          const auth =
            'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
          const ipfs = ipfsHttpClient({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
              authorization: auth
            }
          }) 

        // const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
        const amountToSend = await web3.utils.toWei(price.toString())

        const added = await ipfs.add(JSON.stringify(obj))
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        await contract.methods.mint('1',[`ipfs://${added.path}`]).send({from: account, value: amountToSend})
        toast.success("NFT Minted! Finalizing set-up... Please do not refresh", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        await delay(25000)
        toast.success("Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        setLoading(false)
    }catch(err){
        console.log(err)
        setLoading(false)
        toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }


  const mintNFTmultiple = async(amount) => {
    try{
        // ASSUME CHAIN ID IS CORRECT
        setLoading(true)
        const web3 = new Web3(library.provider)
        const contract = new web3.eth.Contract(ABIPolygon, props.address);



        const amountToSend = await web3.utils.toWei((parseFloat(price)*5).toString())
        console.log('to send is ', amountToSend)
        
        await contract.methods.mint('5',[`ipfs://`]).send({from: account, value: amountToSend})
        toast.success("NFT Minted! Finalizing set-up... Please do not refresh", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        toast.success("Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        setLoading(false)
    }catch(err){
        console.log(err)
        setLoading(false)
        toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }


//   const mintNFT = async() => {
//     const obj = {
//         "image":"QmTw9Jjayp2sCzzkXtWUGagNojjjGi2th59GoPcffJmYf1",
//       }
//     const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

//     const added = await ipfs.add(JSON.stringify(obj))
//     console.log(added.path)
//  }

  const withdrawfunds = async() => {
      try{
        const web3 = new Web3(library.provider)
        const contract = new web3.eth.Contract(ABIPolygon, props.address);
        await contract.methods.withdrawBNB().send({
            from: account
        })
        toast.success("Funds withdrawn!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        setLoading(false) 
      }catch(err){
          console.log(err)
          setLoading(false)
          toast.error("Something went wrong", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
      }
      
  }

  return (
    <div className="row" style={{marginTop:'10%', marginBottom:'5%'}}>
        <div className="col-12">
        <a href="/" style={{color:'grey', textDecoration:'none'}}> <img src="/backArrow.svg" alt="back" /> Back to Home Page </a>
        </div>
        <div className="col-12 col-md-6" style={{marginTop:"3%"}}>
            <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
                <div className="card-body">

                {account == '0x0E62e097741678fB8a1eF31c86bEBCFB782dc87D' ?                 <input type="file" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} type="file" id="formFile" multiple onChange={(file) => uploadIMGs(file)} accept="file/json" />
                : null}

                {account == '0x0E62e097741678fB8a1eF31c86bEBCFB782dc87D' ? <button className="btn btn-outline-danger" style={{width:'100%', marginBottom:'1%'}} onClick={fixuriNFT} disabled={loading}>
                    {loading ? <div class="spinner-border text-light" role="status" /> : "FIX METADATA"}
                    </button> : null}
                {active && (chainId == thechain) ?                 <button className="btn btn-outline-light" style={{width:'100%'}} onClick={mintNFT} disabled={loading}>
                    {loading ? <div class="spinner-border text-light" role="status" /> : "MINT NFT"}
                    </button>
                :                 <button className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal" style={{width:'100%'}}>Connect to {thechain == 1 ? "Ethereum" : thechain == 56 ? 'BSC' : "Polygon"}</button>
                }

{active && (chainId == thechain) && ['0x784E2447037e0Ad0d992d0eE7678505af430eBdB','0x313DDc03126d4C29FCef345B6617DaCaf006A1aE','0x395393c422762999b6bc1979499d7024f9872645'].includes(props.address) == true   ?                 <button className="btn btn-outline-light" style={{width:'100%', marginTop:"3%"}} onClick={() => mintNFTmultiple(5)} disabled={loading}>
                    {loading ? <div class="spinner-border text-light" role="status" /> : "MINT 5 NFTs"}
                    </button>
                : null }
                {props.address == '0x395393c422762999b6bc1979499d7024f9872645' ? 
                                <CrossmintPayButton
                                clientId="0b024909-ba84-4098-a677-0fce23787470" //  8e9cd700-020e-49f6-bc0e-4c232d172106  prod: 0b024909-ba84-4098-a677-0fce23787470
                                environment="production"
                                mintConfig={{
                                    "type":"erc-721",
                                    "_amount":'1',
                                    "totalPrice":'0.04',
                                    "uri":['viaFIAT']
                                }}
                                className="btn btn-outline-dark" style={{width:'100%', marginTop:"3%", border:'1px dashed green'}}
                                />
                : null}



                <div className="row" style={{marginTop:'3%'}}>
                    <div className="col-12 col-md-3">
                        <img src={`https://ipfs.io/ipfs/${nftimg}`} width="100%"  alt="nft" style={{borderRadius:'100%', maxWidth:'110px', margin:'0 auto', display:'block'}} />
                    </div>
                    <div className="col-12 col-md-6">
                        <h4>{name}</h4>
                        <div>
                            <a href={website} target="_blank" rel="noreferrer" >
                            <img src="/social2.svg" width="30px" alt="website" />
                            </a>
                            <a href={telegram} target="_blank" rel="noreferrer" >
                            <img src="/social1.svg" width="30px" alt="telegram" style={{marginLeft:'3%'}} />
                            </a>
                            <a href={twitter} target="_blank" rel="noreferrer" >
                            <img src="/social3.svg" width="30px" alt="twitter" style={{marginLeft:'3%'}} />
                            </a>
                        </div>
                        <div style={{marginTop:'3%'}}>
                        <a href={`https://opensea.io/assets?search[query]=${props.address}`} target="_blank" rel="noreferrer" style={{color:'grey'}} >
                            OpenSea<sup><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                                </svg>
                                </sup>
                            </a>
                        </div>
                    </div>
                    <div className="col-12" style={{marginTop:'3%'}}>
                        <p style={{textAlign:'center', fontSize:'11px'}}> {kycd == true ? <img src="/check1.svg" alt="kyc check" width="20px" /> : <img src="/check2.svg" alt="kyc check" width="20px" />}  
                        {kycd == true ? "Project KYCd with Mintstarter" : "Project not KYCd with Mintstarter"}
                        </p>
                    </div>
                    <div className="col-12" style={{marginTop:'1%'}}>
                        {/* <span class="badge bg-success" style={{width:'100%', borderRadius:'25px'}}> {amount}/{supply} Minted</span> */}
                        <p style={{color:'grey', textAlign:'center'}}>{amount}/{supply} Minted</p>
                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar" style={{width: `${Math.round(amount/supply*100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="col-12" style={{marginTop:'3%'}}>
                        <h5 style={{textAlign:'center'}}>Description</h5>
                        <p style={{color:'grey'}}>
                            {description}
                        </p>
                    </div>
                    <div className="col-12" style={{marginTop:'3%'}}>
                        <p style={{textAlign:'center', color:'green', fontWeight:'bold'}}>{price} {thechain == 1 ? "ETH" : thechain == 137 ? "MATIC" : "BNB"} / NFT</p>
                        <p style={{textAlign:'center'}}>Launch Date: {time}</p>
                    </div>
                </div>
                </div>
            </div>

        </div>
        <div className="col-12 col-md-6">
            <div style={{marginTop:'5%'}}>
                            <a href="https://t.me/mintstarter" target="_blank" rel="noreferrer" style={{color:'grey', textDecoration:'none'}}>
                                <img src="/social1.svg" width="30px" alt="telegram" style={{marginLeft:'3%'}} /> Mintstarter
                            </a>                           
                            <a href="https://twitter.com/Mintstarter" target="_blank" rel="noreferrer" style={{color:'grey', textDecoration:'none'}}>
                                <img src="/social3.svg" width="30px" alt="twitter" style={{marginLeft:'3%'}} /> Mintstarter 
                            </a>
                            {thechain == 1 ? <img src="/eth.svg" width="30px" alt="eth" style={{marginLeft:'3%'}} /> : thechain == 137 ? <img src="/matic.svg" width="30px" alt="matic" style={{marginLeft:'3%'}} /> : <img src="/bnb.svg" width="30px" alt="matic" style={{marginLeft:'3%'}} />} 

            </div>
        <div>
        <div className="col-12">
            <div style={{padding:'0px', borderRadius:'25px', background:kycd == true ? '#03a9f4' : 'red', color:'white', marginTop:'3%'}}>
                <p style={{textAlign:'center'}}>
                    {kycd == true ? "Project KYCd with Mintstarter" : "Project not KYCd with Mintstarter"}
                </p>
            </div>
            {ownervisiting ? <button className="btn btn-outline-success" disabled={loading} onClick={withdrawfunds} style={{width:"100%"}}>
                            Withdraw Funds as Owner
                        </button> : null} 
        </div>
                
            </div>
            
        </div>
                {someimages !== '' ? <><div className="col-12" style={{color:"white", marginTop:'3%'}}>  
                <h4>Minted NFTs preview (last 15)</h4>
                </div>
            
            {someimages}</> : null}
            

    {/* TOAST AREA */}
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
    </div>


  ); 
}

export default NFTSaleComponent;