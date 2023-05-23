

import * as React from "react";
import * as ReactDOM from "react-dom";

function NavBar() {
  

  return (
    <div className="container">
<nav class="navbar navbar-expand-lg navbar-light" style={{ minHeight:'80px', background:'transparent'}}>
  <a class="navbar-brand" href="/" style={{marginLeft:"3%"}}> <img src="/logo.svg" style={{width:'100%', maxWidth:'200px'}} alt="logo" /> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto" style={{margin:'0 auto'}}>
      <li class="nav-item">
        <a class="nav-link" href="/">Home </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">About Us </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Docs </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Why Choose Us </a>
      </li>
      {/* <li class="nav-item">
        <a class="nav-link" href="/services">Services</a>
      </li> */}
      {/* <li class="nav-item">
        <a class="nav-link" href="https://stake.mintstarter.app">Staking</a>
      </li> */}
      {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}

    </ul>
    <div class="d-flex">
    <a href="/" target="_blank" rel="noreferrer">
    <button className="btn btn-primary" style={{minWidth:'130px'}}>
      Join Community
    </button>
    </a>
    </div>
  </div>


</nav>
</div>

  ); 
}

export default NavBar;