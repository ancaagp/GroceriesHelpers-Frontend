import React from 'react';
import Navbar from 'react-materialize/lib/Navbar';
import NavItem from 'react-materialize/lib/NavItem';
import Icon from 'react-materialize/lib/Icon';
import './Header.css'

const Header = (props) => {
  return (
    <div id="header">
      <Navbar
        alignLinks="right"
        id="mobile-nav"
        className="Navbar"
        menuIcon={<Icon>menu</Icon>}
        options={{
            draggable: true,
            edge: 'left',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
        }}
        >
          <NavItem href="/about">
          About  
          </NavItem>
        { props.user && 
        <NavItem href="/">
            Home
        </NavItem>
        }
        { props.user && 
        <NavItem href="/profile">
            Profile
        </NavItem>
        }
        { props.user && 
        <NavItem href="#" onClick={props.logout} >
            Logout
        </NavItem> 
        }

        { !props.user &&
          <NavItem href="/register">
          Sign up
      </NavItem>
        }
        { !props.user &&
      <NavItem href="/login">
          Login
      </NavItem>
       }
    </Navbar>
    </div>
  ) 
}

export default Header;