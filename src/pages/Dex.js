import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import Swap from '../components/Swap'
import Footer from '../components/Footer'





function DEX() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)




  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <Swap />      

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default DEX;