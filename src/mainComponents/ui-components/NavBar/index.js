import React, { Component } from 'react';
import './nav.css';
import { Menu, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from '../../../firebaseConfig';

export default class MenuExampleInvertedSecondary extends Component {
  constructor(){
    super();
    this.state = {
      activeItem: 'home',
      signout: false 
    }
  }

  handleSignout = () =>{
    firebase.auth().signOut().then((result)=> {
      this.setState({
        signout: true
      })
      this.props.history.push('/')

    }).then(() =>{
    })
    .catch(function(error) {
      // An error happened.
    });
  }

  componentDidMount(){
    const auth = firebase.auth()
    auth.onAuthStateChanged((user) =>{
      if(user){
        console.log('user is logged')
        this.setState({
          signout: false
        })
      }else{
        this.setState({
          signout: true
        })
      }
    })
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        {
          (!this.state.signout) ? 
            <a class="navbar-brand" href="/private_user"><Image src={require('../images/logoCircle.png')} style={{ height: '60px', marginTop: '-10px' }} /></a>
          : 
            <a class="navbar-brand" href="/"><Image src={require('../images/logoCircle.png')} style={{ height: '60px', marginTop: '-10px', color:"white" }} /></a>
        }
        
        {/* <a class="navbar-brand" href="/"><Image src={require('../images/logoCircle.png')} style={{ height: '60px', marginTop: '-10px', color:"white" }} /></a> */}

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
            {/* <li  style={{color: "white",width: "70vw",textAlign:"center",fontSize: "100%",marginLeft: "5em"}}><h1>PintsAndShells</h1></li> */}
            <span class="navbar-text">
              {/* <a onClick={this.handleSignout} style={{marginLeft:"-15em"}}>Logout</a>  */}
              <span class="nav-link" style={{color: "white",width: "70vw",textAlign:"center",fontSize: "2em",marginLeft: "5em"}}>PintsAndShells</span>
            </span>

          {
            (!this.state.signout) ? 
            <span class="navbar-text">
              {/* <a onClick={this.handleSignout} style={{marginLeft:"-15em"}}>Logout</a>  */}
              <Link class="nav-link" to="/private_user" style={{marginLeft:"-10em"}}>Home</Link>
            </span>
            // <li class="nav-item">
            //   <Link class="nav-link" to="/private_user" style={{marginLeft:"-5em"}}>Home <span class="sr-only">(current)</span></Link>
            // </li>
            : null
          }

          {
            (!this.state.signout) ? 
            // <span class="navbar-text">
            // {/* <Link to="/login">Login</Link><br/> */}
            //   <a href="https://github.com/jawadalikhel/PintsAndShells" target="_blanck" style={{marginLeft:"2em", position: "absolute"}}>Tours</a>
            // </span>

            // <span class="navbar-text">
            //   {/* <Link to="/login">Login</Link><br/> */}
            //   <Link to="/userTours" style={{marginLeft:"2em"}}>Tours</Link>
            // </span>
            <span class="navbar-text">
              {/* <a onClick={this.handleSignout} style={{marginLeft:"-15em"}}>Logout</a>  */}
              <Link class="nav-link" to="/userTours" style={{marginLeft:"-5em"}}>Tours</Link>
            </span>

            // <li class="nav-item">
            //   <Link class="nav-link" to="/userTours">Tours</Link>
            // </li>
            : null
          }

          <span class="navbar-text">
            {/* <Link to="/login">Login</Link><br/> */}
            <a href="https://github.com/jawadalikhel/PintsAndShells" target="_blanck"  style={{marginLeft:"2em"}}>Github</a>
          </span>


          {
            (!this.state.signout) ? 
            <span class="navbar-text">
              <a onClick={this.handleSignout} style={{marginLeft:"2em"}}>Logout</a> 
            </span>
            : 
            <span class="navbar-text">
              <Link to="/login" style={{marginLeft:"2em"}}>Login</Link> 
            </span>
          }
        </div>
      </nav>
    )
  }
}
