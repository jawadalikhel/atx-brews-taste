import React, { Component } from 'react'
import { Menu, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from '../../../firebaseConfig';
// import '../App.css';

export default class MenuExampleInvertedSecondary extends Component {

  constructor(){
    super();
    this.state = {
      activeItem: 'home',
      signout: false 
    }
  }

  handleSignout = (e) =>{
    // e.preventDefault()
    firebase.auth().signOut().then((result)=> {
      console.log(result, '<---- logged out result')
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

  // componentDidMount() {
  //   const db = firebase.firestore();
  //   firebase.auth().onAuthStateChanged(async (user) => {
  //     if (user === null) {
  //       return;
  //     } else {
  //       // let doc = 'UserData-' + user.uid
  //       // console.log(doc, 'doc')
  //       // await db.collection(doc).orderBy('timestamp', "asc")
  //       //   .onSnapshot(async (result) => {
  //       //     let array = [];
  //       //     await result.forEach((item, index) => {
  //       //       array.push(item.data());
  //       //     })
  //       //     await this.setState({
  //       //       brewTour: array
  //       //     })

  //       //   })
  //     }
  //   })
  // }
  componentDidMount(){
    // console.log(this.state, '<--- did mount')
    const auth = firebase.auth()
    auth.onAuthStateChanged((user) =>{
      if(user){
        console.log('user is logged')
      }else{
        this.handleSignout()
      }
    })
  }

  render() {
    if (this.state.brewTour) {
    }

    const style = {
      fontSize: '17px',
      // marginBottom: '5px'
    }
    
    const headingStyle = {
      color: 'white',
      fontSize: '24px',
      marginLeft: '27%'
    }

    const navBar = {
      position: 'relative',
      marginBottom: '10px',
      // top: 0,
      zIndex: '2',
    }


    return (
      <div className='navBar' style={navBar}>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
          @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700|Vidaloka');
      </style>

        <Segment inverted >

          <Menu inverted pointing secondary style={{ height: '20px' }}>

            <Image src={require('../images/logoCircle.png')} style={{ height: '60px', marginTop: '-10px' }} />

            <Link style={style} to="/">Home</Link>

            {
              (!this.state.signout) ? 
                <Link to="/OtherMap">View Your Tour</Link>
              : null
            }

            <p style={headingStyle}>Pints And Shells</p>
            <a href="https://github.com/jawadalikhel/atx-brews-taste">GitHub</a>

            {
              (!this.state.signout) ? <button onClick={this.handleSignout}>Logout</button>
              : <Link to="/">Login</Link>
            }

          </Menu>
        </Segment>
      </div>
    )
  }
}
