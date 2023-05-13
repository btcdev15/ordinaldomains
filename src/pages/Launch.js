import * as React from "react";
import * as ReactDOM from "react-dom";
import Navbar from '../components/Navbar'
import LaunchComponent from '../components/LaunchComponent'
import Footer from '../components/Footer'





function Launch() {




  const [loadinghelper, setLoadingHelper] = React.useState(false)




  return (
    <div>
      <Navbar />
      <div className="container">
        <br /> 
        <div>
            <LaunchComponent />      

        </div>
      </div>
      <Footer />
   </div>

  ); 
}

export default Launch;