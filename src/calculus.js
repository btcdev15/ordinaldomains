import * as React from "react";
import LiquidityStar from './LiquidityStar.png';

import bottombackground from './bottombackground.png';
import twittericon from './twitter.png';
import discordicon from './discord.png';
import telegramicon from './telegram.png';
import backicon from './backarrow.png';
import {
    useParams
  } from "react-router";
import Web3 from 'web3';
import ABI from './hypervisor.json'
import tokenabi from './erc20.json'



function Calculus() {


    const [val, setVal] = React.useState(0)
    const [price, setPrice] = React.useState(0)

    function log(base, number) {
        console.log(Math.log(number) / Math.log(base))
        return Math.log(number) / Math.log(base);
      }

    function getPrice(tick){
    console.log(1.0001 ** tick);
    return 1.0001**tick;

    }

    function inDollars(value){
        console.log(1/value)
        return 1/value;
    }

    function applyModulus(value){

      let myVal = Math.floor(value);
      while(myVal % 60 != 0){
        myVal--;
      }
      console.log(myVal)
      return myVal;
    }




  return (
   <div style={{padding:'25px'}}>
    <div class="container">
  <a href="/">  <img src={LiquidityStar} width="212" /> </a>


  <br /> <br />



      <br />

      <div className="row">
          <div className="col-12 col-lg-12">
                <div className="row">
                    
                <div class="card" style={{borderRadius:'8px',boxShadow:'0px 24px 68px rgba(0, 0, 0, 0.1)', padding:'25px'}}>
                        <h4>Calculation for Rebalance Function</h4>

                        <hr />

                        <input onChange={(event) => setVal(event.target.value)} placeholder="Own Value" />
                        <button onClick={() => getPrice(val)} > Get UNI type Price </button>
                        <button onClick={() => log(1.0001, getPrice(val))}> Get Log </button>
                        <button onClick={() => inDollars(getPrice(val))}> Get Price in Dollars </button>

                        <hr />
                        <h4>Going from price to baseLower, baseUpper</h4>
                        <hr />
                        <input onChange={(event) => setPrice(event.target.value)} placeholder="Price" />
                        <button onClick={() => inDollars(price)} > Get UNI type price </button>
                        <button onClick={() => log(1.0001, inDollars(price))}> Get Log </button>
                        <button onClick={() => applyModulus(log(1.0001, inDollars(price)))}> Apply Modulus </button>

                </div>
                </div>
        </div>



      
  </div>
  <img src={bottombackground} width="100%" style={{position:'absolute',left:0,bottom:0, zIndex:-1}} />

   </div>
   <footer style={{position:'absolute', bottom: "0",width:"90%",height:"2.5rem"}}>
      <div class="container">
        <div className="row">
        <div className="col-4 col-md-2">
          <img src={LiquidityStar} width="100%" style={{maxWidth:'157px'}} /> 
        </div>
        <div className="col-4 col-md-4" style={{fontWeight:'bold'}}>
        © Copyright 2021, All Rights Reserved
        </div>
        <div className="col-4 col-md-6" style={{textAlign:'right'}}>
          <img src={telegramicon} width="19px" style={{marginRight:'5%'}} />
          <img src={discordicon} width="19px" style={{marginRight:'5%'}} />
          <img src={twittericon} width="19px" />

        </div>  
      </div>
      </div>
    </footer>
   </div>

  ); 
}

export default Calculus;