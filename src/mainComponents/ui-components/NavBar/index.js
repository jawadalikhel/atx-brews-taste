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
    }).then(() =>{
      this.props.history.push('/')
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
          <a class="navbar-brand" href="/"><Image src={require('../images/logoCircle.png')} style={{ height: '60px', marginTop: '-10px' }} /></a>
        }
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">

          {
            (!this.state.signout) ? 
            <li class="nav-item">
              <Link class="nav-link" to="/private_user">Home <span class="sr-only">(current)</span></Link>
            </li>
            : null

          }

          {
            (!this.state.signout) ? 
            <li class="nav-item">
              <Link class="nav-link" to="/OtherMap">View your tours</Link>
            </li>
            : null
          }

          </ul>

          {
            (!this.state.signout) ? <span class="navbar-text"><a onClick={this.handleSignout}>Logout</a> </span>
            : <span class="navbar-text"><Link to="/">Login</Link></span>
          }


          {/* <span class="navbar-text">
            Navbar text with an inline element
          </span> */}
        </div>
      </nav>
      // <div>
      //   <style>
      //     @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
      //     @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700|Vidaloka');
      // </style>

      //   <Segment inverted >

      //     <Menu inverted pointing secondary >

      //       <Image src={require('../images/logoCircle.png')} style={{ height: '60px', marginTop: '-10px' }} />

      //       <Link to="/">Home</Link>

            // {
            //   (!this.state.signout) ? 
            //     <Link to="/OtherMap">View Your Tour</Link>
            //   : null
            // }

      //       <p >Pints And Shells</p>
      //       <a href="https://github.com/jawadalikhel/PintsAndShells">GitHub</a>

            // {
            //   (!this.state.signout) ? <button onClick={this.handleSignout}>Logout</button>
            //   : <Link to="/">Login</Link>
            // }
      //     </Menu>
      //   </Segment>
      // </div>
    )
  }
}
