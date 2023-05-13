import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import MintstarterServices from '../components/MintstarterServices'
import Footer from '../components/Footer'





function Services() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)




  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <MintstarterServices />      

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default Services;