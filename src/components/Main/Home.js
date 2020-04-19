import React from 'react';
import image2 from './images/roman-kraft-P8zDQz8Y2Vc-unsplash.jpg';
import image1 from './images/ja-ma--gOUx23DNks-unsplash.jpg'
import FooterBar from '../Footer/Footer';

class Home extends React.Component {
  render() {
    let M = window.M;
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.parallax');
      var instances = M.Parallax.init(elems);
    });


    return (
      <>

        <div className="parallax-container">
          <div className="parallax"><img src={image1}/></div>
        </div>
        <div className="section white">
          <div className="row container">
            <h2 className="header">Groceries helpers</h2>
            <p className="intro">When you go out and do groceries shopping for yourself, why not buy something small for someone else who cannot leave the house? <br/> Groceries helpers is social initiative that tries to help people in need with their groceries delivery. The project was born out of the COVID-19 epidemic and tackles the problem of food delivery shortage. The platform connects people in need with those willing to offer help. </p>
            <div className="row">
    <div className="col s12 m4">
      <div className="card home">
        <div className="card-content white-text">
          <span className="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a className="linkHome" href="#">This is a link</a>
        </div>
      </div>
    </div>

    <div className="col s12 m4">
      <div className="card home">
        <div className="card-content white-text">
          <span className="card-title">Offer help</span>
          <p>You can search on the map for open requests and their groceries list. If you can help someone, choose their list and ycontact them directly via email or phone number. </p>
        </div>
        <div className="card-action">
          <a className="linkHome" href="/offerhelp">Offer help</a>
        </div>
      </div>
    </div>

    <div className="col s12 m4">
      <div className="card home">
        <div className="card-content white-text">
          <span className="card-title">Find help</span>
          <p>You can create new requests for grocery shopping on your Profile page. The requests will be automatically shown on the map, based on the location provided. </p>
        </div>
        <div className="card-action">
          <a className="linkHome" href="/profile">Find help</a>
        </div>
      </div>
    </div>

  </div>
   
         
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax"><img src={image2} /></div>
        </div>
        <FooterBar />
      </>


    )
  }
}

export default Home;