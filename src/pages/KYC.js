import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import KYCComponent from '../components/KYC'
import Footer from '../components/Footer'





function KYC() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)




  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <KYCComponent />      

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default KYC;