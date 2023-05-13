

import * as React from "react";
import * as ReactDOM from "react-dom";
import '../index.css'
import axios from 'axios'
import {
    useWeb3React,
  } from "@web3-react/core";

function AnyOwnedByUser() {
  

    const context = useWeb3React();
    const {
      library,
      chainId,
      account,
      active,
    } = context;

  const [cards, setCards] = React.useState(false)
  
  React.useEffect(async() => {
      if(account){
        let x = await axios.get(`https://fast-dusk-72169.herokuapp.com/v1/user/${account}`)
        console.log("x is ", x)
        const myArray = []
        if(x.data.length > 0){
            console.log('fired')
            for(let i=0; i<x.data.length; i++){
  
          
                myArray.push(
                    <div className="col-4 col-md-3 customHr">
                    <a href={`/project/${x.data[i].address}`} style={{textDecoration:'none'}}>
                    <div  style={{width:"100%", color:'white'}}>
                                <img src={`https://ipfs.io/ipfs/${x.data[i].ipfeses[0]}`} width="100%" style={{maxWidth:'60px',borderRadius:'100%', margin:'0 auto', display:'block'}} />
                                    <p style={{textAlign:'center', marginTop:'5%'}}>
                                    {x.data[i].name}
                                    </p>
                                    <p style={{textAlign:'center',color:'green'}}>{x.data[i].price} {x.data[i].chainID == '1' ? 'ETH' : x.data[i].chainID == '56' ? 'BSC' : 'MATIC'}</p>
                        </div>
                        </a>
                    </div>
                )
                }
                setCards(myArray)
        } else {
            setCards(false)
            console.log(cards !== false, cards)
        }

        
      }

  },[account])

  return (
      <div>
    {cards !== false ? <div style={{marginTop:'5%'}}>
    <h4 style={{color:'white'}}> My Creations </h4>

        <div className="row">
            {cards}

        </div>
    </div> : null}


  </div>



  ); 
}

export default AnyOwnedByUser;