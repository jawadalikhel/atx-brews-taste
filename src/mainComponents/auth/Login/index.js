import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import './login.css';
import firebase from '../../../firebaseConfig'

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      name: 'mirza'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleSubmit = async (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(async(user) => {
      if(user.additionalUserInfo.isNewUser){
        let currentUser = firebase.auth().currentUser.uid;
        let userData = {
           name: user.additionalUserInfo.profile.name,
            id: user.additionalUserInfo.profile.id,
            email: user.additionalUserInfo.profile.email,
            family_name: user.additionalUserInfo.profile.family_name,
            given_name: user.additionalUserInfo.profile.given_name,
            googleUserId: user.user.uid,
            currentUser: currentUser
        }

        const addUserToDB = await fetch('https://us-central1-pintsandshells-e38a2.cloudfunctions.net/helloWorld1', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        await this.props.history.push('/');


        await addUserToDB.json()
      }else{
        // console.log(user, '<--- returned user')
        this.props.history.push('/private_user')
      }
    })
  }

  render(){
    return (

      <div className="Login">
        <h1>Welcome to PintsAndShells</h1>
        <h3>Sign in below with Google</h3>
        <br />
        <br />
        <Button onClick={this.handleSubmit}>Google Login</Button>
      </div>
      )
  }
}

export default Login;
