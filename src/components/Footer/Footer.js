import React from 'react';
import './Footer.css';

class FooterBar extends React.Component {
  render () {
    return (
<footer className="page-footer">
          <div className="footer-copyright">
            <div className="container">
            © 2020 Groceries Helpers
            </div>
          </div>
        </footer>
    )
  }
} 

export default FooterBar;