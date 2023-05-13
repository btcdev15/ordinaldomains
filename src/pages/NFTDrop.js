import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import NFTDropComponent from '../components/NFTDropComponent'
import Footer from '../components/Footer'





function NFTDrop() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)




  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <NFTDropComponent />

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default NFTDrop;