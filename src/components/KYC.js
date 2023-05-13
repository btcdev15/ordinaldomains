

import * as React from "react";
import * as ReactDOM from "react-dom";




function KYC() {
  


  return (
    <div className="row" style={{marginTop:'10%', marginBottom:'5%', padding:'10px'}}>
        <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">
                <img src="/kyc.svg" width="100%" alt="kyc" style={{maxWidth:'250px', margin:'0 auto', display:'block'}} />
                <h5 style={{textAlign:'center'}}>
                Know Your Customer Verification
                </h5>
                <p style={{textAlign:'center'}}>Have you listed your project? Reach out to <a href="https://t.me/TakeTheRed2" target="_blank" rel="noreferrer" style={{color:'green'}}>@TakeTheRed2</a> on Telegram to get Verified by sending us the link to your project.</p>
                <hr style={{background:'grey'}} />
                <h5 style={{textAlign:'center'}}>Why KYC</h5>
                <p style={{textAlign:'center'}}>MintStarter will KYC any project that runs ads or promotions on our platform. We will implement having developers and creators submit government issued IDs for full transparency. Our goal is to become the one and only TRUSTED source for new NFT projects looking to get their MINT STARTED!
                </p>
                <p style={{textAlign:'center'}}>We will still allow non KYC projects to grow and thrive on the platform because we believe in the true decentralized model of cryptocurrency. All purchases and mints made through the MintStarter platform are the user’s decision and while the MintStarter team will do the best to vet sponsored projects, it is impossible to regulate a decentralized creation platform and MintStarter hold no liability for any loss incurred.
                </p>
            </div>
        </div>
    </div>


  ); 
}

export default KYC;