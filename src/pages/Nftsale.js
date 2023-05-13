import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import NFTSaleComponent from '../components/NFTSaleComponent'
import Footer from '../components/Footer'
import {
    useParams
  } from "react-router";




function NFTSale() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)

  let { address } = useParams();



  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <NFTSaleComponent address={address} />
        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default NFTSale;