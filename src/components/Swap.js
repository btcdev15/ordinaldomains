

import * as React from "react";
import * as ReactDOM from "react-dom";




function Swap() {
  


  return (
    <div className="row" style={{marginTop:'10%', marginBottom:'5%'}}>
        <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">
                <img src="/swap.svg" width="100%" alt="kyc" style={{maxWidth:'150px', margin:'0 auto', display:'block'}} />
                <h5 style={{textAlign:'center'}}>
                Swap Tokens instantly
                </h5>
                <iframe scrolling="no" height="500" width="350" style={{width:"350px",height:"500px", border: "none", borderRadius: "19px", boxShadow: "rgba(0, 0, 0, 0.1) 3px 3px 10px 4px", display: "block", margin:"0 auto"}} src="https://dex.mintstarter.app/swap?inputCurrency=ETH&outputCurrency=0x583673B49eE3ae9E59c0B2fa662115952E1d28fd&slippage=1200&card=212129&dark=dark" />      
        
            </div>        

        </div>
    </div>


  ); 
}

export default Swap;