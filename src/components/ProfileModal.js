import * as React from "react";
import {QRCodeSVG} from 'qrcode.react';
import { toast } from 'react-hot-toast';


function ConnectModal() {
  
    const [btcaddres, setBtcaddr] = React.useState('')
    const [btcaddres2, setBtcaddr2] = React.useState('')
  
    React.useEffect(() => {
      const theAddr = localStorage.getItem('btcaddress')
      if(theAddr !== null && theAddr !== ''){
        
        let firstLetters = theAddr.toString().substr(0,5)
        let lastLetters = theAddr.toString().substr(theAddr.length-5,theAddr.length)
        setBtcaddr(firstLetters+'...'+lastLetters)
        setBtcaddr2(theAddr)
      }
    }, [])


    const copy = async (txt) => {
      navigator.clipboard.writeText(btcaddres2)
      toast.success('copied')
    }


  return (
    <div>
        <div class="modal fade" id="qrModal" tabindex="-1" role="dialog" aria-labelledby="qrModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style={{width:'100%', minWidth:'655px'}}>
            <div class="modal-header">
            <h5 class="modal-title" id="sendModalLabel" style={{fontWeight:'bold'}}>Receive BTC</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{color:'black', fontSize:'2rem'}}>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div className="row">
                   <div className="col-12">
                   <QRCodeSVG value={btcaddres2} style={{margin:'0 auto', display:'block'}} />
                    </div>
                    <div className="col-12">
                        <br />
                    </div>
                    <div className="col-12">
                        <p style={{textAlign:'center'}}>
                        <button className="btn btn-text" onClick={copy}>{btcaddres2} <img src="/clipboard.png" width="24px" alt="clipboard" /></button>
                        </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>


    </div>


  ); 
}

export default ConnectModal;
