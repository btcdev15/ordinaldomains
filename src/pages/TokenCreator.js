import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import TokenCreatorComponent from '../components/TokenCreator'
import Footer from '../components/Footer'





function TokenCreator() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)




  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <TokenCreatorComponent />      

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default TokenCreator;