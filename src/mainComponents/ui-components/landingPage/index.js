import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';
import Map from './MapContainer';
import firebase from '../../../firebaseConfig';
import swal from '@sweetalert/with-react';
import './style.css';

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

test = (e) =>{
  console.log(e.target, '<---- eee')
}

componentDidMount() {
  this.getBrewsInDB()
}

  render() {
    return (
      <div className="p-landingpage">
        <div>
          <Map 
            brewsInDbLength={this.state.brewsFromDB ? this.state.brewsFromDB.length: null} 
            brewData={this.state.allBreweries}
          />
        </div>
      </div>
    );
  }
}

export default Brewery;
