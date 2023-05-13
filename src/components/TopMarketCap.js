

import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";




function TopMarketCap() {
  

  const [marketcap, setMarketcap] = React.useState(0)
  const [price, setPrice] = React.useState(0)

  React.useEffect(async() => {
      const price = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=mintstarter&vs_currencies=usd')
      const marketCap = price.data['mintstarter'].usd * 100000000
      setMarketcap(marketCap.toFixed(2))
      setPrice(price.data['mintstarter'].usd)
  }, [])

  return (
    <div className="row">
        <div className="col-12 col-md-6">
            <h4 style={{color:'#68d67c'}}> <img src="/pie.svg" width="40px" /> ${marketcap} <span style={{color:'grey', fontSize:'15px'}}> - Market Cap</span></h4> 
        </div>
        <div className="col-12 col-md-6" style={{textAlign:'right'}}>
            <h4 style={{color:'#68d67c'}}> <span style={{color:'grey', fontSize:'15px'}}> Price - </span> ${price}  <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/18947.png" width="40px" />  </h4> 
        </div>
    </div>


  ); 
}

export default TopMarketCap;