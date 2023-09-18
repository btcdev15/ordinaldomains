import * as React from "react";
import axios from 'axios'

function ConnectModal() {
  


    const [address, setAddress] = React.useState('')

    const [amount, setAmount] = React.useState('')

    const [fastest, setFastest] = React.useState('')
    const [halfh, setHalfh] = React.useState('')
    const [hour, setHour] = React.useState('')


    const [selected, setSelected] = React.useState(2)


    React.useEffect(() => {
        const myF = async() => {
            const req = await axios.get('https://mempool.space/api/v1/fees/recommended')

            setFastest(req.data.fastestFee)
            setHalfh(req.data.halfHourFee)
            setHour(req.data.hourFee)
        }
        myF()
    },[])

  return (
    <div>
        <div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-labelledby="sendModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style={{width:'100%', minWidth:'800px'}}>
            <div class="modal-header">
                <h5 class="modal-title" id="sendModalLabel" style={{fontWeight:'bold'}}>Send BTC</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{color:'black', fontSize:'2rem'}}>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div className="row" style={{padding:'10px'}}>
                   <div className="col-12">
                        <h5 style={{color:'#252525'}}>Ordinal Receiving Address</h5> 
                        <input onChange={(event) => setAddress(event.target.value)}  style={{width:'100%', maxWidth:'462px', border:'0px', paddingLeft:'0px', fontWeight:'bold'}} type="text" class="form-control" placeholder="bc1qu23uv24rcw8wptptzrtx0ckay74859rzkjnpg4" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                   </div>
                   <div className="col-12">
                        <h5 style={{color:'#252525'}}>Amount</h5> 
                        <input onChange={(event) => setAmount(event.target.value)}  style={{width:'100%', maxWidth:'462px', border:'0px', paddingLeft:'0px', fontWeight:'bold'}} type="text" class="form-control" placeholder="0.01" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                   </div>
                   <div className="col-12">
                    <br />
                        <h5 style={{color:'#252525'}}>Select Network Fee</h5> 
                        <div className="row">
                            <div className="col-3">
                                <div className="card"  onClick={() => setSelected(0)} style={{border:selected == 0 ? '0.5px solid #4267B2' : null, boxShadow: selected == 0 ? '0px 0px 12px rgba(0, 0, 0, 0.1)' : null}}>
                                    <div className="card-body">
                                        <h5 style={{textAlign:'center', fontWeight:'bold'}}>Slow</h5>
                                        <p style={{textAlign:'center', color:'black'}}>
                                        {hour} sats / byte
                                        </p>
                                        <h6 style={{textAlign:'center', color:'#4267B2'}}>About 1 hour</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="card"  onClick={() => setSelected(1)}  style={{border:selected == 1 ? '0.5px solid #4267B2' : null, boxShadow: selected == 1 ? '0px 0px 12px rgba(0, 0, 0, 0.1)' : null}}>
                                        <div className="card-body">
                                            <h5 style={{textAlign:'center', fontWeight:'bold'}}>Medium</h5>
                                            <p style={{textAlign:'center', color:'black'}}>
                                            {halfh} sats / byte
                                            </p>
                                            <h6 style={{textAlign:'center', color:'#4267B2'}}>About 30 mins</h6>
                                        </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="card"  onClick={() => setSelected(2)}  style={{border:selected == 2 ? '0.5px solid #4267B2' : null, boxShadow: selected == 2 ? '0px 0px 12px rgba(0, 0, 0, 0.1)' : null}}>
                                    <div className="card-body">
                                        <h5 style={{textAlign:'center', fontWeight:'bold'}}>Fast</h5>
                                        <p style={{textAlign:'center', color:'black'}}>
                                        {fastest} sats / byte
                                        </p>
                                        <h6 style={{textAlign:'center', color:'#4267B2'}}>About 10 mins</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="card"  onClick={() => setSelected(3)}  style={{minHeight:'141px',border:selected == 3 ? '0.5px solid #4267B2' : null, boxShadow: selected == 3 ? '0px 0px 12px rgba(0, 0, 0, 0.1)' : null}}>
                                    <div className="card-body">
                                        <h5 style={{textAlign:'center', fontWeight:'bold'}}>Custom</h5>
                                        <p style={{textAlign:'center', color:'black'}}>
                                        <input placeholder="25" style={{width:'100%', maxWidth:'462px', textAlign:'center', background:'#ECECEC', border:'3px solid rgb(232, 232, 232)', borderRadius:'10px'}} type="text" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
