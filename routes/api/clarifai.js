const Clarifai = require('clarifai');
require('dotenv').config();

const apiKey = process.env.REACT_APP_CLARIFAI_API_KEY;

const app = new Clarifai.App({
  apiKey: apiKey
});

//  this is the function to add photos to the clarifai database

 app.inputs.create([
  {
    url: "http://static.asiawebdirect.com/m/bangkok/portals/orlando-com/homepage/downtown/pagePropertiesImage/orlando_3.jpg.jpg",
    geo: { longitude: 81.372202, latitude: 28.543866},
  }
]).then(
  function(response) {

    console.log(response['0'].imageUrl);

    console.log('Upload successful');
    
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("http://static.asiawebdirect.com/m/bangkok/portals/orlando-com/homepage/downtown/pagePropertiesImage/orlando_3.jpg.jpg", { maxConcepts: 5 });
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        console.log(concepts);
      });
  },
  function(err) {
    console.log('there was an error');
  }
);

// this is the function to search for the specific photos with geo tags

// app.inputs.search(
//   { input: {
//     geo: {
//       longitude: 28.7444444,
//       latitude: 81.305,
//       type: 'withinMiles',
//       value: 1
//     }
//   } 
// }).then( 
//   function(response) {
//     // do something with response
//     console.log(response.hits[0].input.data.image.url);
//     console.log(response.hits[0].input.data.geo);
//   },
//   function(err) {
//     console.log(err);
//   }
// );

// This is the prediction function for getting the tags to compare the photos


// app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
//       .then(generalModel => {
//         return generalModel.predict("https://s3.amazonaws.com/clarifai-api/img3/prod/small/31d82fed09b3440f82861fecb55ff5d8/89923f177292d1e6756c904a912e9144", { maxConcepts: 5 });
//       })
//       .then(response => {
//         var concepts = response['outputs'][0]['data']['concepts'];
//         console.log(concepts);
//       });
