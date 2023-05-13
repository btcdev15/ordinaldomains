

import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";




function Price() {
  

  const [price, setPrice] = React.useState(0)


  React.useEffect(async() => {
      const price = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=mintstarter&vs_currencies=usd')
      setPrice(price.data['mintstarter'].usd)
  }, [])


  return (
    <div className="row">
        <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">
                <h5 style={{textAlign:'center'}}>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/18947.png" width="40px" />  MINT <span style={{color:'green', fontWeight:'bold'}}>${price}</span>
                </h5>
            </div>
        </div>
        <div className="outerDiv">
        <iframe src="https://v2.info.uniswap.org/pair/0xa23ad2b0fd9cf4f2a056dc249d95777a6e3b21ac" scrolling="no" style={{position: "absolute",top: "-816px",left: "1px",width: "100%",height: "1664px", boxShadow: "rgb(0 0 0 / 30%) 0px 5.40728px 10.8146px",border: "1px solid rgb(0 0 0 / 30%)"}} />
        </div>
    </div>


  ); 
}

export default Price;