

import * as React from "react";
import * as ReactDOM from "react-dom";




function NFTDropComponent() {
  


  return (
    <div className="row" style={{marginTop:'10%', marginBottom:'5%', padding:'10px'}}>
        <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">
                <h3 style={{textAlign:'center'}}>Generate 10k NFTs from few images </h3>
                
                <img src="/topimg.png" width="100%" alt="kyc" style={{ margin:'0 auto', display:'block'}} />
                <br />
                <h5 style={{textAlign:'center'}}>
                We will have 5 layers
                </h5>
                <img src="/topimg2.png" width="100%" alt="kyc" style={{ margin:'0 auto', display:'block'}} />
                <br />
                <h5 style={{textAlign:'center'}}>
                Each layer has 4 levels of rarity, common, rare, epic and legendary                </h5>
                <img src="/topimg3.png" width="100%" alt="kyc" style={{ margin:'0 auto', display:'block'}} />
                <br />
                <h5 style={{textAlign:'center'}}>
                You will put in each folder those PNG images
                </h5>
                <img src="/topimg4.png" width="100%" alt="kyc" style={{ margin:'0 auto', display:'block'}} />
                <p style={{textAlign:'center',color:'grey',textDecoration:'italic'}}>
                You can decide to opt in for fewer layers(e.g just background, body, hats). The rarity levels determine how often an item will appear. If you have a hat in "legendary" rarity, it will appear a greatly reduced rate compared to a hat of "common" rarity.

                </p>
                <br />
                <h5 style={{textAlign:'center'}}>
                    Example Images
                </h5>
                <img src="/topimg5.png" width="100%" alt="kyc" style={{ margin:'0 auto', display:'block'}} />
                <br />
                <p style={{textAlign:'center'}}>
                    Interested in this services? Talk to <a href="https://t.me/TakeTheRed2" target="_blank" rel="noreferrer" style={{color:'green'}}>@TakeTheRed2</a>
                </p>
            </div>


        </div>
    </div>


  ); 
}

export default NFTDropComponent;