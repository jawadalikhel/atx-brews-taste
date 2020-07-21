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
              <Link class="nav-link" to="/userTours">View your tours</Link>
            </li>
            : null
          }

          </ul>

          {
            (!this.state.signout) ? 
            <span class="navbar-text">
              <a onClick={this.handleSignout}>Logout</a> 
            </span>
            : <span class="navbar-text">
                <Link to="/login">Login</Link><br/>
              </span>
          }

          <span class="navbar-text" style={{paddingLeft: '3em',paddingRight: '3em'}}>
            {/* <Link to="/login">Login</Link><br/> */}
            <a href="https://github.com/jawadalikhel/PintsAndShells" target="_blanck">Github</a>
          </span>
        </div>
      </nav>
    )
  }
}
