import React, { Component } from 'react';
import { Card, Button, Image, Form, Label, Input } from 'semantic-ui-react';
import ReactDOM from "react-dom";
 import swal from '@sweetalert/with-react';
import './Map.css';
import firebase from '../../../firebaseConfig';
import Search from './Search';


 import { GoogleApiWrapper, InfoWindow, Map, Marker, Content, Places, Directions, MapViewDirections, MapView } from 'google-maps-react';

  class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      loggedin: false
    }
  }

  onMarkerClick = async (props, marker, e) => {

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      info: props

    });

  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onInfoWindowOpen(props, e) {
    if (this.props.brewsInDbLength < 5) {
      const button = (
        <Button color="blue" onClick={
          this.addTour.bind(null, this.state.info)
          }
        >Add to Brew Tour</Button>
      );
    
      ReactDOM.render(
        React.Children.only(button),
        document.getElementById("aTour")
      )
    }
  }

  addTour = async (brewery, e) => {
    const db = firebase.firestore();
  
    this.state.showingInfoWindow = false;
    e.preventDefault();
    swal(brewery.name + ' Has Been Added In Your Tour!');

    let jsonObj = {};
    jsonObj['timestamp'] = new Date().toLocaleString();

    if (brewery.name) {
     jsonObj['name'] = brewery.name;
    }
    if (brewery.address) {
      jsonObj['address'] = brewery.address;
    }
    if (brewery.opening_hours) {
      jsonObj['opening_hours'] = brewery.opening_hours;
    }
    if (brewery.photos) {
      jsonObj['photos'] = brewery.photos;
    }
    if (brewery.rating) {
      jsonObj['rating'] = brewery.rating;
    }
    if (brewery.place_id) {
      jsonObj['place_id'] = brewery.place_id;
    }
    if (brewery.website) {
      jsonObj['website'] = brewery.website;
    } 
    if (brewery.position) {
      jsonObj['position'] = brewery.position;
    }
    
    let doc = 'UserData-' + firebase.auth().currentUser.uid;
    
    db.collection(doc).doc(brewery.place_id)
    .set(jsonObj)
    .then(() => {
      // console.log(result.data(), '1243')
      // result.forEach(x => console.log(x.data()))
    })
  }

  getBreweries = async () => {

      const db = firebase.firestore();
      await db.collection('Cities').doc('Austin').collection('Breweries').doc('f5gsFkgW92BSmlMqUSaT')
      .get()
      .then(async(result) => {
        let array = [];
          await result.data().data.forEach(async(brewery) => {
              await array.push(brewery);
        })
        return array
      })
      .then(async (data) =>{
          let newArray = [];
          let nameArray = [];

          await data.forEach((brewery) =>{
            let obj = {
              name: brewery.name,
              address: brewery.formatted_address,
              position: {
                lat: brewery.position.lat,
                lng: brewery.position.lng
              },
              place_id: brewery.place_id,
              rating: brewery.rating,
              website: brewery.website,
              photos: brewery.photos,
              opening_hours: brewery.opening_hours,
            }
            
            nameArray.push(brewery.name);
            newArray.push(obj);
          })
          await this.setState({
            brews: newArray,
            autoFillNames: nameArray
          })
        }).catch((error) =>{
        console.log(error, '<--- error with fetchin brews')
      })
  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.getBreweries()
        this.setState({
          loggedin: true
        })
      }else{
        this.props.history.push('/');
      }
    })
  }

  render() {
    let mapHeight = window.innerHeight - 50 + 'px';
    const style = {
      width: '80vw',
      height: '80vh',
      position: 'absolute',
    }

    const createMapOptions = (maps) => {
      return ({
        panControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          // style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: ['roadmap', 'terrain']
        },
        scrollwheel: false,
        styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
      });
    }
    
    return (
      <div >
        {
          (this.state.loggedin) ?
          <div className="map-container">
               <Map
               className="map"
                item
                xs = { 12 }
                style = { style }
                google = { this.props.google }
                onClick = { this.onMapClick }
                zoom = {11 }
                initialCenter = {{ lat: 30.3005, lng: -97.7388 }}
                mapTypeControl = {true}
                mapTypeControlOptions = {{
                  // style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                  mapTypeIds: ['roadmap', 'terrain']
                }}
                options={createMapOptions}
              > 
              {/* search component */}
              { 
                this.state.autoFillNames ? <Search className="search" suggestions={this.state.autoFillNames} /> : null 
              }

              {
                this.state.brews ? this.state.brews.map((item, index) => {
                  return (<Marker
                    key={index}
                    onClick = { this.onMarkerClick }
                    position = {item.position}
                    photos = {item.photos}
                    opening_hours = {item.opening_hours}
                    rating = {item.rating}
                    website = {item.website}
                    id={index}
                    ref={index === 5 ? input => this.inputElement = input : '' }
                    name = { item.name }
                    address = { item.address }
                    place_id = { item.place_id }
                    icon = {{ url: require('../../ui-components/images/beerP.ico')}}
                    style={{size:'3'}}
                  />);
                }) : null
              }
                <InfoWindow

                  marker = { this.state.activeMarker }
                  visible = { this.state.showingInfoWindow }
                  onOpen={e => {
                        this.onInfoWindowOpen(this.props, e);
                      }}
                >
                <content>
                <div>
                <Card classNames="fade">
                {this.state.info.photos ? <img style={{width: '500px', height: '300px'}} className='infoImage' src={this.state.info.photos[1]} />: null }
                    <Card.Content>
                      <Card.Header>{this.state.info.name}</Card.Header>
                      <Card.Description>
                      {this.state.info.address}<br />
                      {this.state.info.rating}<br/>
                    <a href={this.state.info.website} target='_blank' >{this.state.info.website}</a><br/>
                      
                      </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                      <div id="aTour" />
                      </Card.Content>
                      </Card>

                </div>
                </content>

                </InfoWindow>
              </Map>
          </div> : null
        }
      </div>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw"
})(GoogleMapsContainer)
