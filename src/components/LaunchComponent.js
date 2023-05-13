

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    useWeb3React,
  } from "@web3-react/core";
import Web3 from 'web3'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import ABIPolygon from '../utils/abi_polygon.json'
import BYTECODEPolygon from '../utils/bytecode_polygon.json'
import ABIEth from '../utils/abi_eth.json'
import BYTECODEEth from '../utils/bytecode_eth.json'
import ABIBoth from '../utils/PRO_abi.json'
import BYTECODEBoth from '../utils/PRO_bytecode.json'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const auth = 'Basic ' + Buffer.from('271a2F9WoNKWxEw8NNtmMkviS4x' + ':' + 'ecfad3264edefc0e18f1ba349cb95796').toString('base64')

const ipfs = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath:'/api/v0',
  headers: {
    authorization: auth
    }
})


function LaunchComponent() {
  

  const [colname, setColname] = React.useState('')
  const [symbol, setSymbol] = React.useState('')
  const [twitter, setTwitter] = React.useState('')
  const [telegram, setTelegram] = React.useState('')
  const [website, setWebsite] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [team, setTeam] = React.useState('')
  const [supply, setSupply] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [date, setDate] = React.useState('')
  const [time, setTime] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [images, setImages] = React.useState([])
  const [showupload, setShowupload] = React.useState(false)
  const [uploaded, setUploaded] = React.useState(0)
  const [allipfs, setAllipfs] = React.useState(0)
  const [gbupload, setGbpupload] = React.useState(0)
  const [toupload, setToupload] = React.useState(0)
  const [properties, setProperties] = React.useState([])

  const context = useWeb3React();
  const {
    library,
    chainId,
    account,
    active,
  } = context;




  // const deployToken = async() => {
  //     try{
  //       setLoading(true)
  //       if(account && (chainId == 1 || chainId == 137)){
  //           const web3 = new Web3(library.provider)
  //           const contract = new web3.eth.Contract(ABI);
  //           const amount = supply * 10 ** decimals;
  //           const amountToPay = chainId == 1 ? '100000000000000000' : '200000000000000000000'
  //           console.log(toFixed(amount))
  //           let x = await contract.deploy({
  //               data: BYTECODE.object,
  //               arguments: [name.toString(), symbol.toString(), decimals.toString(), account.toString(), toFixed(amount), amountToPay.toString()]
  //                 }).send({
  //                   from: account,
  //                   value: amountToPay
  //                 })
  //           setLoading(false)
  //           setIsdeployed(true)
  //           setTokenaddress(x._address)
  //     }
  //     }catch(err){
  //       alert("something went wrong deploying your token")
  //       console.log(err)
  //       setLoading(false)
  //     }

  // }

  const uploadIMGs = async(file) => {
    file.preventDefault();
    try{
      console.log(file)
      console.log(file.target.files)
      console.log(file.target.files.length)
      if(file.target.files.length > 5000){
        setShowupload(false)
        alert("you have uploaded more files than allowed");
      } else {
        if(file.target.files.length !== parseInt(supply)){
          setShowupload(false)
          alert(`You must upload ${supply} NFT images`)
        } else {
          console.log(file.target.files)
          setImages(file.target.files)
          setShowupload(true)
          // await showAttributes(file.target.files)
        }
      }

    }catch(err){
      setShowupload(false)
      console.log(err)
    }

  }

  const uploadIPFS = async() => {
    try{
      setLoading(true)
      const arrayToDb = []
      let gbpUpload = 0;
      let sizeInBytes = 0;

      for(let i=0; i<images.length; i++){
        sizeInBytes = sizeInBytes+images[i].size
      }

      setToupload(sizeInBytes / 10 ** 9)
      for await (const result of ipfs.addAll(images,         {
        progress: (prog, filePath) => {
          console.log(`received: ${prog} ${filePath}`)
          gbpUpload = gbpUpload + (prog / 10 ** 9)
          setGbpupload(gbpUpload.toFixed(6))
        }
      })) {
        console.log(result)
        arrayToDb.push(result.path)
        setUploaded(arrayToDb.length)
      }
      setAllipfs(arrayToDb)
      // const objs = []
      // for(let i=0; i<arrayToDb.length; i++){
      //   objs.push({"image":`ipfs://${arrayToDb[i]}`})
      // }
      // console.log(objs)

      // const myObjs = [{ path: '1', content: JSON.stringify(objs[0]) }, { path: '2', content: JSON.stringify(objs[1]) }]

      // for await (const result of ipfs.addAll(myObjs,         {
      //   wrapWithDirectory: true,
      //   progress: (prog, filePath) => {
      //     console.log(`received: ${prog} ${filePath}`)
      //     gbpUpload = gbpUpload + (prog / 10 ** 9)
      //     setGbpupload(gbpUpload.toFixed(6))
      //   }
      // })) {
      //   console.log('new result is ', result)
      //   arrayToDb.push(result.path)
      //   setUploaded(arrayToDb.length)
      // }



      setLoading(false)
      // console.log("x is ", x)
    }catch(err){
      console.log("error is ", err)
      alert("an error has occured")
      setLoading(false)
    }
  }

  // validate domain 
//   function frmValidate( domain ) {
//     // since domain could have subdomain like qwe.asd.zxc,
//     // parse into substrings at "."
//     var dParts = domain.split('.');
//     // capture tld from end of list
//     var tld = dParts[dParts.length - 1];
//     // determine whether tld is "com" or "net"
//     var isValid = ('com' === tld) || ('net' === tld) || ('io' === tld) || ('org' === tld);
//     // for testing
//     // alert('top level domain is: ' + tld + ' and is ' + (isValid?'':'NOT ') + 'valid');
//     // advise caller
//     return isValid;
// };

function frmValidate(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}; 


function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
  }
  return sourceArray;
}

const dpeloy2 = async() => {
  try{
    let theAttributes = properties;
    let finalAttributes = []
    for(let i=0; i<theAttributes.length; i++){
      let theFile = await readUploadedFileAsText(theAttributes[i])
      let content = await JSON.parse(theFile)
      finalAttributes.push(content.attributes)
    }
    console.log('final is ', finalAttributes)
    let objs = []
    let angelicObjects = []
    let superRares = []
    let regulars = []


    
    for(let i=0; i<5000; i++){

      if (finalAttributes[i].filter(e => e.value === 'Angelic').length > 0 && angelicObjects.length < 14) {
        /* vendors contains the element we're looking for */
        angelicObjects.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})
      }else {
        if ((finalAttributes[i].filter(e => e.value === 'Icedragon').length > 0 || finalAttributes[i].filter(e => e.value === 'FireDragon').length > 0 || finalAttributes[i].filter(e => e.value === 'Blackdragon').length > 0) && superRares.length < 9 && finalAttributes[i].filter(e => e.value === 'Legendaryframebadge').length >0 == false ) {
          superRares.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})
        } else {
          if(regulars.length < 40){
            regulars.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})     
          } else {
            objs.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})     
          }
        }
      }
        
      // for(let j=0; j<finalAttributes[i].length; j++){
      //   for (const [key, value] of Object.entries(finalAttributes[i][j])) {
          
      //     if((value == 'Angelic' || value == 'Beast' || value == 'Demonic') && angelicObjects.length < 14){
      //       angelicObjects.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})
      //     } else {
      //       if((value == 'Icedragon' || value == 'Firedragon' || value == 'Blackdragon') && superRares.length <9 && !(value == 'Blackdragon' && superRares.length !== 8)){
      //         superRares.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})
      //       } else {
      //           objs.push({"image":`ipfs://QmUUbapHPkRWgvYKoVNvD4SSgS7upyfWMd2HL5y9QT6EiR/${i+1}.png`,"attributes":finalAttributes[i]})     
      //       }

            
      //     }
      //   }
      // }

    }

    console.log('angelic objects ', angelicObjects)
    console.log('super rare ', superRares)
    console.log('regulars are ', regulars)
    console.log('regulars ', angelicObjects.length, superRares.length, regulars.length, objs.length)

    objs = await shuffle(objs)

    let children = superRares.concat(angelicObjects);
    children = children.concat(regulars)
    children = children.concat(objs)
    console.log('children are ', children, children.length)
    // console.log(objs)
    let myObjs = []

    
    for(let i=0; i<children.length; i++){
      myObjs.push({
        path:i.toString(),
        content:JSON.stringify(children[i])
      })
    }

    console.log('start ipfs')
    let theThing = ''

    for await (const result of ipfs.addAll(myObjs,         {
      wrapWithDirectory: true,
      progress: (prog, filePath) => {
        console.log(`received: ${prog} ${filePath}`)
      }
    })) {
      console.log('new result is ', result)
      if(result.path == ''){
        // console.log(result.cid.toString())
        theThing = `ipfs://${result.cid.toString()}/`
      }
    }

    console.log('the ting is ', theThing)

  }catch(err){
    console.log('err is ', err)
  }
}

  const deploy = async () => {
    try{
      let erroNumber = 0;
      if(telegram.toLowerCase().startsWith('https://t.me/') == false){
        toast.error('Telegram must start with "https://t.me/"', {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        erroNumber += 1;
      }
      if(twitter.toLowerCase().startsWith('https://twitter.com/') == false){
        toast.error('Twiter must start with "https://twitter.com/"', {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        erroNumber += 1;
      }

      if(frmValidate(website) == false){
        toast.error('You must pass a valid domain', {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        erroNumber += 1;
      }

      if(description == '' || description.length > 200){
        toast.error('Your description can be a maximum of 200 characters', {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        erroNumber += 1;
      }

      // if(team == '' || team.length > 200){
      //   toast.error('Your TEAM description can be a maximum of 200 characters', {
      //     position: "top-right",
      //     autoClose: 15000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     });
      //   erroNumber += 1;
      // }

      if(supply < 2){
        toast.error('Minimum supply is 2 NFTs', {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        erroNumber += 1;
      }

      if(price <= 0){
        toast.error('Provide a price for minting your NFT', {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        erroNumber += 1;
      }

      if(erroNumber == 0){
        setLoading(true)
        const web3 = new Web3(library.provider)
        let basePrice = await web3.utils.toWei(price);
        let toSend;
        let ABI;
        let Bytecode
        const d = new Date();
        let day = d.getDay();

        if(chainId == 137){
          // ABI = ABIPolygon
          // Bytecode = BYTECODEPolygon
          ABI = ABIBoth;
          Bytecode = BYTECODEBoth;
          // toSend = '0'
          if(supply <= 1000){

            if(day >= 5 && day <= 7){
              toSend = '55000000000000000000' // 
            } else {
              toSend = '110000000000000000000'
            }
          } else {
            if(supply <= 5000){
              if(day >= 5 && day <= 7){
                toSend = '90000000000000000000'
              } else {
                toSend = '180000000000000000000'
              }
            } else {
              if(day >= 5 && day <= 7){
                toSend = '175000000000000000000'
              } else {
                toSend = '350000000000000000000'
              }
            }
          }
        } else {

          if(chainId == 56){ // 0.75BNB , 1000-5000 1.5bnb and 500-10000 
            ABI = ABIBoth;
            Bytecode = BYTECODEBoth;
            if(supply <= 1000){
                  toSend = '750000000000000000'
            } else {
              if(supply <= 5000){
                  toSend = '1500000000000000000'
              } else {
                  toSend = '2500000000000000000'
              }
            }
          }
          else{
          // ABI = ABIEth
          // Bytecode = BYTECODEEth
          ABI = ABIBoth;
          Bytecode = BYTECODEBoth;
          // toSend = '0'
          if(supply <= 1000){
            if(day >= 5 && day <= 7){
              toSend = '30000000000000000'
            } else {
              toSend = '60000000000000000'
            }
          } else {
            if(supply <= 5000){
              if(day >= 5 && day <= 7){
                toSend = '100000000000000000' //  50000000000000000
              } else {
                toSend = '100000000000000000'
              }
            } else {
              if(day >= 5 && day <= 7){
                toSend = '100000000000000000'
              } else {
                toSend = '200000000000000000'
              }
            }
          }
        }
      }
        
        let theAttributes = properties;
        let finalAttributes = []
        for(let i=0; i<theAttributes.length; i++){
          let theFile = await readUploadedFileAsText(theAttributes[i])
          let content = await JSON.parse(theFile)
          finalAttributes.push(content.attributes)
        }


        const objs = []
        for(let i=0; i<allipfs.length; i++){
          objs.push({"image":`ipfs://${allipfs[i]}`,"attributes":finalAttributes[i]})
        }
        console.log(objs)
        const myObjs = []
        for(let i=0; i<objs.length; i++){
          myObjs.push({
            path:i.toString(),
            content:JSON.stringify(objs[i])
          })
        }
        console.log('final to upload is ', myObjs)

        let theThing = ''

        for await (const result of ipfs.addAll(myObjs,         {
          wrapWithDirectory: true,
          progress: (prog, filePath) => {
            console.log(`received: ${prog} ${filePath}`)
          }
        })) {
          console.log('new result is ', result)
          if(result.path == ''){
            // console.log(result.cid.toString())
            theThing = `ipfs://${result.cid.toString()}/`
          }
        }


        let startingTime = new Date(`${date} ${time}`)
        startingTime = startingTime.getTime() / 1000


        const contract = new web3.eth.Contract(ABI);
        let x = await contract.deploy({
          data: Bytecode.object,
          arguments: [colname,symbol,"0",basePrice.toString(),startingTime.toString(),supply.toString(), twitter.toString(), website.toString(), telegram.toString(),theThing]
            }).send({
              from: account,
              gasLimit:'5000000',
              value:toSend
            })
        console.log("x is ", x)
        console.log('objs is ', {
            "chainID":chainId,
            "address":x._address,
            "ipfeses":allipfs,
            "creator":account,
            "startingTime":startingTime.toString(),
            "name":colname,
            "price":price,
            "attributes":finalAttributes,
            "description":description
          })
        await axios.post('https://fast-dusk-72169.herokuapp.com/recordInfo', {
          "chainID":chainId,
          "address":x._address,
          "ipfeses":allipfs,
          "creator":account,
          "startingTime":startingTime.toString(),
          "name":colname,
          "price":price,
          "attributes":finalAttributes,
          "description":description
        })

        setLoading(false)
        window.location.href = `/project/${x._address}`
      }


    }catch(err){
      setLoading(false)
    }
  }


  const uploadAttributes = async(file) => {
    file.preventDefault();
    try{
      console.log(file)
      console.log(file.target.files)
      console.log(file.target.files.length)
      if(file.target.files.length > 5000){
        toast.error('you have uploaded more files than allowed', {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else {
        if(file.target.files.length !== parseInt(supply)){
          alert(`You must upload ${supply} attribute .JSON files`)
        } else {
          setProperties(file.target.files)
          // await showAttributes(file.target.files)
        }
      }

    }catch(err){
      console.log(err)
    }

  }

  
  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  return (
    <div className="row" style={{marginTop:'10%', marginBottom:'5%'}}>
        <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">
                <img src="/minter.svg" width="100%" alt="kyc" style={{maxWidth:'150px', margin:'0 auto', display:'block'}} />
                <h5 style={{textAlign:'center'}}>
                NFT Sale Creator
                </h5>
                <p style={{textAlign:'center', color:'grey'}}>
                Launch your NFT collection and sell it on Mintstarter
                </p>
                <form>
                <div className="row">
                <div className="col-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Collection Name*</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="MINT Collection" value={colname} onChange={(event) => setColname(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Collection Symbol*</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="MINT" value={symbol} onChange={(event) => setSymbol(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Twitter Account*</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="https://twitter.com/mintstarter" value={twitter} onChange={(event) => setTwitter(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Telegram Account*</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="https://t.me/mintstarter" value={telegram} onChange={(event) => setTelegram(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Website*</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="mintarter.app" value={website} onChange={(event) => setWebsite(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-12">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Project Description*</label>
                        <textarea type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="(max 200 characters)" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Team Description*</label>
                        <textarea type="text" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="(max 200 characters)" value={team} onChange={(event) => setTeam(event.target.value)} />
                    </div>
                  </div> */}
                  <div className="col-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Starting Date*</label>
                        <input type="date" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} value={date} onChange={(event) => setDate(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Starting Time*</label>
                        <input type="time" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} placeholder="MINT Finance" value={time} onChange={(event) => setTime(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">NFTs to be minted*</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} value={supply} onChange={(event) => setSupply(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Price per Mint*</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} value={price} onChange={(event) => setPrice(event.target.value)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    {account && active ?                       <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">NFT Images*</label>
                       <input type="file" class="form-control" id="exampleFormControlInput1" style={{background:'transparent', color:'green'}} type="file" id="formFile" multiple onChange={(file) => uploadIMGs(file)} accept="image/*" />
                      </div> : <button class="btn btn-outline-light"  data-toggle="modal" data-target="#exampleModal" style={{borderRadius:'25px', width:'100%'}} type="button"> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" width="20px" /> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" width="20px" /> <span> Connect </span></button>}
                  </div>
                  <div className="col-12 col-md-6">
                    {account && active ?                       <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">(optional) NFT Attributes</label>
                      <input class="form-control" type="file" id="formFile" multiple='multiple' style={{background:'transparent', color:'green'}} onChange={(file) => uploadAttributes(file)} accept="application/json" />
                      <p style={{fontSize:'9px', color:'grey', fontWeight:'bold'}}>If you have 100 NFTs, upload 100 JSON files with your NFT attributes. <a href="/sample.json" download>Download sample</a></p>
                      </div> : null}
                  </div>
                  <div className="col-12">
                  {/* <button disabled={loading} class="btn btn-dark" style={{borderRadius:'25px', width:'100%'}} onClick={dpeloy2} type="button">click me </button> */}
                    {showupload == true ?
                    <div>
                    <p style={{textAlign:'center', color:'grey'}}> GBs of data uploaded {gbupload} / {toupload} (~{(gbupload/toupload*100).toFixed(2)}%) </p>
                    <p style={{textAlign:'center', color:'darkslategrey'}}>your uploaded data may be higher than the amount you upload due to IPFS metadata</p>
                    <p style={{textAlign:'center', color:'grey'}}> Files ready {uploaded}/{supply} </p>

                    {uploaded == supply ?                     <button disabled={loading} class="btn btn-dark" style={{borderRadius:'25px', width:'100%'}} onClick={deploy} type="button">
                      
                    {loading ? <div class="spinner-border text-light" role="status"/> : chainId == 137 ? "Deploy Contract on Polygon" : chainId == 56 ? 'Deploy Contract on Binance Smart Chain' : "Deploy Contract on Ethereum"}  
                       </button>
                    :                     <button class="btn btn-outline-light" style={{borderRadius:'25px', width:'100%'}} disabled={loading} onClick={uploadIPFS} type="button">
                    {loading ? <div class="spinner-border text-light" role="status"/> : "Upload to IPFS"}  
                      </button>                  }
                    </div>
                    : null}
                  </div>
                
                {/* {account && active ? <div> 
                    <button class="btn btn-outline-light" onClick={deployToken} disabled={loading}  style={{borderRadius:'25px', width:'100%'}} type="button"> {loading ? <div class="spinner-border text-light" role="status">
                    </div> : <><span> Deploy on</span> {chainId == 1 ? "ethereum" : chainId == 137 ? "polygon" : 'undefined network'} </>} </button>   
                 </div> : <button class="btn btn-outline-light"  data-toggle="modal" data-target="#exampleModal" style={{borderRadius:'25px', width:'100%'}} type="button"> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" width="20px" /> <img src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" width="20px" /> <span> Connect </span></button>}
                */}
                </div>
                </form>
                <div>
                    {/* {isdeployed ? <div class="alert alert-primary" style={{marginTop:'3%'}} role="alert">
                        <p>Your token has been deployed at <span style={{fontWeight:'bold'}}>{tokenaddress}</span> . Save this address for reference purposes.</p>
                         </div> : null} */}
                </div>

        
            </div>        

        </div>

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

export default LaunchComponent;