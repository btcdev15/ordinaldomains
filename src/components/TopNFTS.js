

import * as React from "react";
import * as ReactDOM from "react-dom";




function TopNFTs() {
  

  const [marketcap, setMarketcap] = React.useState(0)
  const [price, setPrice] = React.useState(0)


  return (
    <div style={{marginTop:'5%'}}>
        <h4 style={{color:'white'}}>Top NFT Collections </h4>
        <p style={{color:'grey'}}>Promote your nft collection <a href="https://t.me/TakeTheRed2" style={{color:'green'}}>@TakeTheRed2</a> </p>
        <div className="row">
        <div className="col-6 col-md-4">
                <a href="/project/0x395393c422762999b6bc1979499d7024f9872645" style={{textDecoration:'none'}}>
                    <div className="card customCard" style={{width:"100%", color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
                        <div className="card-body">
                        <img src="https://ipfs.io/ipfs/QmZKk8ZGtQogkUGe75gu8KERwj87q7Sambs9P9rA168KLD" width="100%" style={{borderRadius:'100%', margin:'0 auto', display:'block'}} />
                            <h5 style={{textAlign:'center', marginTop:'5%'}}>
                            The Wild Guardians Collection #1
                            </h5>
                            <p style={{textAlign:'center',color:'green'}}>0.04 ETH</p>
                        </div>
                </div>
                </a>
            </div>
            <div className="col-6 col-md-4">
                <a href="/project/0x278a9eE79f8B5A41E9552d0C1A77d81D07c0F4E3" style={{textDecoration:'none'}}>
                    <div className="card customCard" style={{width:"100%", color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
                        <div className="card-body">
                        <img src="https://ipfs.io/ipfs/QmUoMqi2em9myN8Eep2TWVKuiVb8FWB7is85hPVh9EzGYD" width="100%" style={{borderRadius:'100%', margin:'0 auto', display:'block'}} />
                            <h5 style={{textAlign:'center', marginTop:'5%'}}>
                            BB Verse
                            </h5>
                            <p style={{textAlign:'center',color:'green'}}>0.45 BNB</p>
                        </div>
                </div>
                </a>
            </div>
            <div className="col-6 col-md-4">
                <a href="/project/0xb323a27C73Abc2a1E97C26dDbCdD9cAb5CDa2049" style={{textDecoration:'none'}}>
                    <div className="card customCard" style={{width:"100%", color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
                        <div className="card-body">
                        <img src="https://ipfs.io/ipfs/QmTLxan765HmskatNRMGrAjuh7Tys2Ac4PVwKRkYtTaWn8" width="100%" style={{borderRadius:'100%', margin:'0 auto', display:'block'}} />
                            <h5 style={{textAlign:'center', marginTop:'5%'}}>
                            DeadHERO - Gen1.1
                            </h5>
                            <p style={{textAlign:'center',color:'green'}}>0.1 ETH</p>
                        </div>
                </div>
                </a>
            </div>
        </div>

    </div>


  ); 
}

export default TopNFTs;