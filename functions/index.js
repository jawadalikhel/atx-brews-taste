const functions = require('firebase-functions');
const Admin = require("firebase-admin")
const fetch = require('node-fetch');
const cors = require('cors')({ origin: true });

Admin.initializeApp();

exports.saveAllBrewriesFromCityFromGooglePlacesToFirestore = functions.https.onRequest(async (req, res) => {
    await cors(req, res, async () => {
        const db = Admin.firestore()
        const city = 'austin';
        const getAllBrewries = fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=breweries+in+${city}&key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw`)
            .then(data => data.json())
            .then(async (jsonData) => {
                // console.log('jsonData ------->>>> ', jsonData)
                let data = [];

                await jsonData.results.forEach((item) => {
                    // console.log(item, '<----- ITEMMMMMM')
                    let obj = {
                        address: item.formatted_address,
                        position: { lat: item.geometry.location.lat, lng: item.geometry.location.lng },
                        place_id: item.place_id,
                        name: item.name,
                        rating: item.rating
                    }
                    data.push(obj);
                })

                console.log(data, '<----- DATAAAAA')

                await db.collection('Cities').doc('Austin')
                    .collection('Breweries').doc()
                    .set({ data: data })
            })
    })
});




// const saveEachBreweryWithAllPhotosToFirestore = () => {
//     const getAllBreweries = () => {

//         return new Promise(async(resolve, reject) => {
//             await db.collection('Cities').doc('Austin').collection('Breweries').doc('-AllBreweries')
//             .onSnapshot((result) => {
//                 resolve(result.data().data);
//             })
//         })
//     }
//     getAllBreweries()
//     .then((allBrewriesData) => {
//         console.log(allBrewriesData.length, '567897654')

//         let i = 0;

//         if (i === allBrewriesData.length - 1) {
//             return;
//         } 


//         const getBreweryDetailAndPhotos = (brew) => {
//             return new Promise(async(resolve, reject) => {
//                 try {
//                     await fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + brew.place_id + '&fields=name,rating,formatted_phone_number,formatted_address,opening_hours,photos,place_id,price_level,reviews,website,geometry&key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw')
//                           .then(data => data.json().then(async(allData) => {  
//                                 allData = allData.result;
//                                 let photosArray = [];
//                                 let photosIndex = 0;
//                                 let allPhotos = async (array) => {
//                                     if (photosArray.length === array.length) {
//                                         allData.photos = await photosArray;
//                                         await i++;
//                                         await resolve(allData);
//                                         return;
//                                     }
//                                     let photo = array[photosIndex];
//                                     fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=' + photo.photo_reference + '&key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw', {
//                                         headers: {
//                                             'Content-Type': 'application/json'
//                                         },
//                                         method: 'GET'
//                                     })
//                                     .then(async(doneR)=> {
//                                         await photosArray.push(doneR.url);
//                                         await console.log(doneR.url)
//                                         if (array.length === 1) {
//                                             return;
//                                         } else  {
//                                             await setTimeout(async() => {
//                                                 await photosIndex++;
//                                                 await allPhotos(array)

//                                             }, 500)
//                                         }
//                                     })
//                                     .catch((err) => {
//                                         console.log(err)
//                                     })
//                                     // item.result.photos.shift()
//                                     // allPhotos(item.result.photos)
//                             }

//                             await allPhotos(allData.photos);
//                           }))
//                 } catch(err) {
//                     reject(err);
//                 }
                
//             })
//         }

//         getBreweryDetailAndPhotos(allBrewriesData[i])
//         .then(async(brewData) => {
//             console.log(brewData, 'hello');
//             await db.collection('Cities').doc('Austin').collection('Breweries').doc(brewData.name)
//             .set(brewData)
//             .then((item) => {
//                 setTimeout(() => {
//                     getBreweryDetailAndPhotos(allBrewriesData[i])

//                 }, 10000)
//             })
//         })
//         // .catch((reRun) => {

//         // })
 

//     })
// }
