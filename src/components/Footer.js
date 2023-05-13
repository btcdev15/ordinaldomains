

import * as React from "react";
import * as ReactDOM from "react-dom";




function Footer() {
  




  return (
    <footer style={{background:'#1e2023', color:'white', padding:'15px'}}>
        <div className="container">
            <div className="row">
                <div className="col">
                <a href="https://twitter.com/Mintstarter" target="_blank" style={{color:'grey', textDecoration:'none'}}>  <img src="/twitter.svg" width="100%" style={{maxWidth:'40px'}} alt="telegram" /> </a>
                <a href="https://t.me/mintstarter" target="_blank" style={{color:'grey', textDecoration:'none'}}>    <img src="/telegram.svg" width="100%" style={{maxWidth:'40px'}}alt="telegram" /> </a>
                {/* <a href="https://www.dextools.io/app/ether/pair-explorer/0xa23ad2b0fd9cf4f2a056dc249d95777a6e3b21ac" target="_blank" style={{color:'grey', textDecoration:'none'}}>    <img src="/dextools.png" width="100%" style={{maxWidth:'40px'}}alt="telegram" /> </a> */}

                </div>
                <div className="col">
                    <p>
                    <a href="/terms" style={{color:'grey', textDecoration:'none'}}>Terms and Conditions</a>
                    </p>
                    <a href="https://drive.google.com/file/d/1Tmadanp4NcQe05rTWPwRoekQVqsv2Jtv/view" target="_blank" rel="noreferrer" style={{color:'grey', textDecoration:'none'}}>WhitePaper</a>
                </div>
                <div className="col">
                    <a href="/privacy" style={{color:'grey', textDecoration:'none'}}>Privacy Policy</a>
                </div>
                <div className="col">
                    <a href="/" style={{color:'grey', textDecoration:'none'}}>Mintstarter</a>
                </div>
            </div>
        </div>
    </footer>


  ); 
}

export default Footer;