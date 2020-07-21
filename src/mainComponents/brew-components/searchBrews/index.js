import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';
import Map from '../MapContainer';
import firebase from '../../../firebaseConfig';
import swal from '@sweetalert/with-react';


class Brewery extends Component {
  constructor(){
    super();
    this.state = {
      locations: [],
      count: 0,
      brewData: ''
    }
  }

  getBrewsInDB = async() => {
    const db = firebase.firestore();
    await db.collection('Cities').doc('Austin').collection('Breweries').doc('f5gsFkgW92BSmlMqUSaT')
    .get().then(async(doc) => {
        let array = [];
        await doc.data().data.forEach((brew, index) => {
          array.push(brew);
        })
        this.setState({
          brewsFromDB: array
        })

        return array;
      })
  };

  deleteBrew = async (place_id) => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async(user) =>{
      if (user === null) {
          return;
      } else {
        let User = 'UserData-' + firebase.auth().currentUser.uid;
        db.collection(User).doc(place_id).delete().then(function() {
        }).catch(function(error) {
          console.log("Error removing document: ", error);
        });
      }
  })
}
 
  // getBreweries = async () => {
  //   try {
  //     const getAllBreweries = await fetch('https://us-central1-pintsandshells-e38a2.cloudfunctions.net/mirza');
  //     const jsonData = await getAllBreweries.json();
  //     // await console.log(jsonData, '4567654');
  //     return jsonData;
  //     // await this.updateResults();
  //     // await jsonData.forEach((brew) => {
  //       // console.log('q')
  //       // brew.results.forEach((item) => {
  //       //   let address = item.formatted_address;
  //       //   let position = {lat: item.geometry.location.lat, lng: item.geometry.location.lng};
  //       //   let place_id = item.place_id;
  //       //   let name = item.name
  //       //   let rating = item.rating
  //       //   console.log(address);
  //       //   console.log(position);
  //       //   console.log(place_id)
  //       // })
  //     // })
  //   } catch (err) {
  //     return err;
  //   }
  // }


getGeoLocation = async (data,  index) => {
  try {
    const coordinates = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+ data.street + 'Austin,+TX&key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw');
    const coordinatesJson = await coordinates.json();
    data.latitude = coordinatesJson.results[0].geometry.location.lat;
    data.longitude = coordinatesJson.results[0].geometry.location.lng;
    this.setState(prevState => ({
      locations: [...prevState.locations, data],
      count: prevState.count + 1
    }));

  } catch(err) {
    return(err)
  }
  }

componentDidMount() {
  firebase.auth().onAuthStateChanged((user) =>{
    if(user){
      this.getBrewsInDB()
    }else{
      this.props.history.push('/');
    }
  })
 
}

  render() {
    const tripContainerStyle = {
      marginTop: '45%',
      marginLeft: '37%',
      maxWidth: '400px',
      position: 'relative',
      color: 'black'
    }

    let menuHeight = window.innerHeight / 2 + 'px';
    let menuWidth = window.innerWidth / 7 + 'px';
    let xButton = {background: 'black', color: 'yellow', border: 'none', outline: 'none', left: '90%', position: 'absolute'};

    return (
      <div className="App">
          <div style={{width: menuWidth, height: menuHeight, position: 'absolute', zIndex: '1', left: '75%', top: '25%', background: 'black', opacity: '0.8', display: 'flex', flexFlow: 'column'}}>
              <p style={{color: 'white', fontSize: '13px'}}>YOU CAN CHOSE UPTO FIVE BREWERIES</p>
              {
                this.state.brewsFromDB ? 
                  this.state.brewsFromDB.map((item, index) => {
                    return (
                      <div style={{height: '100%', borderTop: this.state.brewsFromDB.length < 5 ? '1px solid white' : '1px solid yellow', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                       <button style={xButton} onClick={() => this.deleteBrew(item.place_id)}>X</button>
                       <p style={{ fontSize: '15px'}}>{item.name}</p>
                      </div>
                    )
                  })
                  : null
              }
          </div>

           <div className="mapContainer">
              <Map style={{top: '5%'}} 
                brewsInDbLength={this.state.brewsFromDB ? this.state.brewsFromDB.length: null} 
                brewData={this.state.allBreweries}
              />
          </div>
        <div style={tripContainerStyle} className="tripFormContainer"  >
    
        </div>
      </div>
    );
  }
}

export default Brewery;
