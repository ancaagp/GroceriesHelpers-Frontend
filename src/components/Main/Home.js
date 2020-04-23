import React from 'react';
import image2 from './images/roman-kraft-P8zDQz8Y2Vc-unsplash.jpg';
import image1 from './images/ja-ma--gOUx23DNks-unsplash.jpg';
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
            <p className="intro">When you go out and do grocery shopping for yourself, why not buy something small for someone else who cannot leave the house? <br/> Groceries helpers is social initiative that tries to help people in need with their grocery shopping and delivery. The project aims to respond to some of the needs caused by the COVID-19 epidemic, more specifically, the shortage of safe food delivery. The platform connects people in need with those willing to offer help. </p>
            <div className="row">

    <div className="col s12 m4">
      <div className="card home">
        <div className="card-content white-text">
          <span className="card-title">How can I help?</span>
          <p>When planning your own grocery shopping, you can search on the map for open requests from people who need help with their own grocery shopping and delivery. If you can help someone with their list, choose their card and contact them directly via email or phone number. </p>
        </div>
        <div className="card-action">
          <a className="linkHome" href="/offerhelp">Offer help</a>
        </div>
      </div>
    </div>

    <div className="col s12 m4">
      <div className="card home">
        <div className="card-content white-text">
          <span className="card-title">How can I get help?</span>
          <p>You can create new requests for grocery shopping on your Profile page. The requests will be automatically shown on the map, based on the location you provide, and open to the community of helpers. Not to overwhelm our helpers, please make sure you add max 10 items to the list.</p>
        </div>
        <div className="card-action">
          <a className="linkHome" href="/profile">Find help</a>
        </div>
      </div>
    </div>

    <div className="col s12 m4">
      <div className="card home">
        <div className="card-content white-text">
          <span className="card-title">Safety first</span>
          <p>If you can help someone in your community with grocery shopping and delivery, please make sure you do that safely: wear gloves and face mask and stay 6 feet distance from the person you are delivering to. This will keep you and the others safe. Let's come together in these difficult times.</p>
        </div>
        <div className="card-action">
          <a className="linkHome" href="/offerhelp">Offer help</a>
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