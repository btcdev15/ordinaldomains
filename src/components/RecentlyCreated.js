

import * as React from "react";
import * as ReactDOM from "react-dom";
import '../index.css'
import axios from 'axios'

function RecentlyCreated() {
  

  const [cards, setCards] = React.useState([])
  
  React.useEffect(async() => {
      let x = await axios.get('https://fast-dusk-72169.herokuapp.com/past')
      console.log(x)
      const myArray = []
      if(x.data.length > 4){
        for(let i=0; i<4; i++){

        
            myArray.push(
                <div className="col-4 col-md-3 customHr">
                <a href={`/project/${x.data[i].address}`} className={i == 3 ? 'd-none d-sm-block' : ''} style={{textDecoration:'none'}}>
                <div  style={{width:"100%", color:'white'}}>
                            <img src={`https://ipfs.io/ipfs/${x.data[i].ipfeses[0]}`} width="100%" style={{maxWidth:'120px',borderRadius:'100%', margin:'0 auto', display:'block'}} />
                                <p style={{textAlign:'center', marginTop:'5%'}}>
                                {x.data[i].name}
                                </p>
                                <p style={{textAlign:'center',color:'green'}}>{x.data[i].price} {x.data[i].chainID == '1' ? 'ETH' : x.data[i].chainID == '56' ? 'BSC' : 'MATIC'}</p>
                    </div>
                    </a>
                </div>
            )
            }
            setCards(myArray)
      } else {
        for(let i=0; i<x.data.length; i++){

        
        myArray.push(
            <div className="col-4 col-md-3 customHr">
            <a href={`/project/${x.data[i].address}`} style={{textDecoration:'none'}}>
            <div  style={{width:"100%", color:'white'}}>
                        <img src={`https://ipfs.io/ipfs/${x.data[i].ipfeses[0]}`} width="100%" style={{maxWidth:'120px',borderRadius:'100%', margin:'0 auto', display:'block'}} />
                            <p style={{textAlign:'center', marginTop:'5%'}}>
                            {x.data[i].name}
                            </p>
                            <p style={{textAlign:'center',color:'green'}}>{x.data[i].price} {x.data[i].chainID == '1' ? 'ETH' : x.data[i].chainID == '56' ? 'BSC' : 'MATIC'}</p>
                </div>
                </a>
            </div>
        )
        }
        let difference = 4 - x.data.length;
        for(let i=0; i<difference; i++){
            myArray.push(
                <div className="col-4 col-md-3 customHr">
                <a href={`/launch`} className={i == difference-1 ? 'd-none d-sm-block' : ''} style={{textDecoration:'none'}}>
                <div  style={{width:"100%", color:'white'}}>
                            <img src="/yoursNext.svg" width="100%" style={{maxWidth:'120px',borderRadius:'100%', margin:'0 auto', display:'block'}} />
                                <p style={{textAlign:'center', marginTop:'5%'}}>
                                Yours Next? 
                                </p>
                                <p style={{textAlign:'center',color:'green'}}>0.02 ETH</p>
                    </div>
                    </a>
                </div>
            )
        }
        setCards(myArray)
      }
  },[])

  return (
    <div style={{marginTop:'5%'}}>
        <h4 style={{color:'white'}}>Recently Created </h4>

        <div className="row">
            {cards}

        </div>

    </div>


  ); 
}

export default RecentlyCreated;