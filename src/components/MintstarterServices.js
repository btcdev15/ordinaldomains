

import * as React from "react";
import * as ReactDOM from "react-dom";




function MintstarterServices() {
  




  return (
    <div className="row" style={{padding:'15px'}}>
       <h4 style={{color:'white', textAlign:'center', width:'100%', marginTop:'5%'}}>Mintstarter Services</h4>
       <div className="card" style={{width:"100%", background:'#1e2023', color:'white', borderRadius:'20px', boxShadow:'0 5.40728px 10.8146px rgba(0,0,0,.3)'}}>
            <div className="card-body">

                <a href="https://mintstarter.gitbook.io/mintstarter/mintstarter/summary" target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>
                    <div className="col">
                        <h3 style={{color:'white'}}>                     <img src="/docs.svg" alt="docs" width="40px" /> DOCS</h3>
                        <p style={{color:'grey'}}>Read all about our documentation and products</p>
                    </div>
                </div>
                </a>
                <a href="/nft-drop" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>

                    <div className="col">
                        <h3 style={{color:'white'}}>                        <img src="/nftdrop.svg" alt="nft drop" width="40px" />
 NFT Generator</h3>
                        <p style={{color:'grey'}}>Generate 1k random NFT images</p>
                    </div>
                </div>
                </a>
                <a href="/launch" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>
                    <div className="col">
                        <h3 style={{color:'white'}}>                         <img src="/minter.svg" alt="minter" width="40px" />
 Create Launchpad</h3>
                        <p style={{color:'grey'}}>Launch your own NFT collection and raise funds</p>
                    </div>
                </div>
                </a>
                <a href="/kyc" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>

                    <div className="col">
                        <h3 style={{color:'white'}}>                         <img src="/kyc.svg" alt="kyc" width="40px" />
 KYC</h3>
                        <p style={{color:'grey'}}>KYC yourself with Mintstarter</p>
                    </div>
                </div>
                </a>
                {/* <a href="/token-creator" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>

                    <div className="col">
                        <h3 style={{color:'white'}}>                         <img src="/tokencreator.svg" alt="tokencreator" width="40px" />
 Token Creator</h3>
                        <p style={{color:'grey'}}>How about you make your own token without code?</p>
                    </div>
                </div>
                </a>
                <a href="/swap" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>

                    <div className="col">
                        <h3 style={{color:'white'}}>                         <img src="/swap.svg" alt="swap" width="40px" />
 DEX</h3>
                        <p style={{color:'grey'}}>Swap your tokens and get MINT, the governance token of the platform</p>
                    </div>
                </div>
                </a> */}
                {/* <a href="https://drive.google.com/drive/folders/1Mf-oC35rE3OFAqac0-azzXVjev_71CM9" target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>
                <div className="row customRow" style={{borderBottom:'1px solid #262626', padding:'15px'}}>
                    <div className="col">
                        <h3 style={{color:'white'}}>                     <img src="/pdf.svg" alt="docs" width="40px" /> WHITEPAPER</h3>
                        <p style={{color:'grey'}}>All about future upcoming changes and the project's long term vision</p>
                    </div>
                </div>
                </a> */}
            </div>
        </div>
    </div>


  ); 
}

export default MintstarterServices;