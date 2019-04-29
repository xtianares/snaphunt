const Clarifai = require('clarifai');
require('dotenv').config();

const apiKey = process.env.REACT_APP_CLARIFAI_API_KEY;

const app = new Clarifai.App({
  apiKey: apiKey
});

//  this is the function to add photos to the clarifai database

//  app.inputs.create([
//   {
//     url: "https://lh3.googleusercontent.com/9_Uqa0-Hdlel1T10CJrDkaQbs8WIGb30HmaNsAUWMp9_xeT242ae8qE8hyoQOcAacWLzrrAyQCPE0Hi7mBSZjGiSk9X3Doq93h6FK2MWByf0Xdkv3NKJYz0-MqlfOx6jO4qh0qTz1FGv3hdjUhvin4eEEgtxXGM8a0avwyzpwI2fZ6yET6QS-m33HTw3k2ueMPFYAZ97et8jpTvtInvuloyiZ2g95WdiGwnhxuo7wxFrsEqGb8yu7GbT_MUMbVBsKM8HJgnxIOohV4QJkOL8wTmttujW6sr9oM6VstbkrVTisqHkgyiqES-OZPZFYNdIxtCc_-9Eb0_tvBCFwemTFC7dtMkbSE7bQ4JlVS8a0jQHsRMfY6hSowU7U6KK4aXN0pzxnrYqpC9j2KjpTYkyNmdPidKUQzpKZAL1VpYlmYWR_AoXLLhP7FHf1IqzHPNxnlUbICEiOM1x42QDNSEOu3x_zUA5sDsz7TNdqt4QWfKWxG1e015mDSGOe0HVKtxSaP4Lw5NNdmYei6S6r13jQO3qFjYw2v6SRIDzTNh_x2SE4VtreO83q37GewLbC4v7ZPMnGOlhoQyPnNCZLYFYNHvQhhLAT4_sJlLF6WeUyf4Be9ZCvo4BxkmD7YTa2Vkfyr3UMqsUL0VraN8ddbi4T1WUcRJRNmQ=w1355-h1805-no",
//     geo: { longitude: 28.6138167, latitude: -81.1716167},
//   },
//   {
//     url: "https://lh3.googleusercontent.com/c_tDgqnjQO82Ai-rtB0eqMWCwoUV2N9HSCYZX-D_sbfVrckMLNIuFeHyMEpM68EH1qBWu7-iWXXSn-ycBw2_p9J1nX4XNmDFY1Sj96TVCeGiA5V_vYVjR2KlqwmkT6W7Sqwj0ImJn7X_nTWUr5G6aJAYoOQVUNoPzqwBMn80IFrgM9xj4BX31DTklAwRLyOa4TxpergDXm1vX4bUJWcU50XrtqZpuPy392l_7DV-lf5NNoodcpACVEU2Qz9YIbFrW2ZGNtLNz24ZGXtS-VAtDf_2Is__vOuqEBOyr94VBuOBhY1c-uSGDiv3e4sYcNA0fc0cPCqJRWV76QCQs6JoCcPpdrFLI3ySl32q1r5gigHrpARFBoK9tjRm1dBtSAO2tCxHjcnoSMsaA29f4cKX32cMnqG-4WHG9uzqIyWD17wkVtBDulyjfjQHBKydF5QSJhPfJRhOAl7G5tZlmobWRC7R2pPtL451zb3XGj4E-ket1dki4F8zG1M5X_NCvuq4y5nkL6y0c0K2ubVKCnCqg17FlLA60O6oZhsZvDNTXt-qbq5o6EPQlElNeXx7AUSXlHMnwQKLUJh8RUT33CAnuPdKHLcepWARjWPDFtBfCvNoVYdtcOEc8jqHPXD_3ywDIJTOzsDTpHrLmiN3avLvj1d4OIqs5jc=w1355-h1805-no",
//     geo: { longitude: 28.6137806, latitude: -81.1716},
//   },
//   {
//     url: "https://lh3.googleusercontent.com/XqQnE48Hm6mM0goK6d4xod_ceX01XZVb2fc7EAm8fkX2blukTHnuSJIyCenqpbyID1PEqRJfNYmJ-jXtw0ClIzICdfEmpAkY1MMgv7Nehtb1ZdCBApnW3LmDCG2viMCcz6fYcXml6u3EJQRPZNU4SMZvH3cQiwZ_S4IdoThqMA5vg6vc-9HSo09T-NowslIQ-PLLy6mghOBlbKRMV-Ce5e9eY7sI2fN706tr7-WsafDCSGGvi3QxNkmr1_IQBZKfXa81eSdY0Ckt6Zw24OIap34bj_TP9vKtEBv_gFL96FrQX6Q1FNVP8qS8tA_uRjqUv0mA0upheoPGZlMOlVOc3rATfMd6tnVXdCV-IpW-rTzGNs4_szYwzPjmP6mKyjB-7aaqK49b4QHQ79pAWhzpo5qwp7UU7wCrQ21khRsEMw6Wx2tsU8HYzTYBiPXD1-xxfIxOV8T1GunLjX1C7ojrJK-mZsKrrLwVHiEo8PiR7_xDOhYxP-GL_M5bmr1ErDnFnT6CMD5ivf3CCJqhd5H_aLlUtQoH_HIoKC2Q0mj6yFJrQQXiP45v17klbafzV-TfT-_mr6HsRQMUCo6PSARMd_TyRPveD0RGEgW2smh1wlKxPAfnF2BM1D_Ew_i8m1Zl5C-e4xWWNZjykKY14_xdg4Gb_tNz2Po=w1355-h1805-no",
//     geo: { longitude: 28.6154056, latitude: -81.1703333},
//   },
//   {
//     url: "https://lh3.googleusercontent.com/r6iadSZQMct3t7dXGB2D5gffS6fAGC0Bn1JJqHisnwn1Dv2y61MrCBYjHCbjd8s7y9p9aob3tXjI2m8lTf2nLHJMKDzkmltSh-sUuDvG8DQOnGcroe8jovfeQ_S64caVMdRGWgL1oo62U4Ri4LPE4Mn5y_XO0D1eO7DJvJRurP2MIwr1zqDUyf6yovu2H_D2AzFcNIgwmCwm8WGD3OgaKzhj9kNwMQS0G8myvG5e41R84YAe_wAqOLrZf-a4Rw44nYpcx2bFKHGqiDDaudxPlujNn1D8_ppIiQFQNmpfG8Sj7mBaAckYHZA1D7aLEfDGtvBeAu6LsOeqGolgEq01rATkwGVBnWYDLkkAMB17QynmIPlSS5hAAAEo6u4635s79a-MhmVJECRIm1AjturIQv1YrTPp_2fKuNzm2DIRj6rrbb7GYsKKjE4nqNfsa4HYv2oryifWzQyLuopXVHnU4fm6AVnFj3154FAxQ1lpTc01AktGQAUsADQsQAFKcMgSJXnBoah1q9gmGCiHHobzozXZ-_cNq9AQvnfcuDFCAiNfSUqTS0qIsUPGY6px5mdlxgPBoQB69f8YY-4WzTJnRMkTenFFfj2e1A0yyoa8lVO7uu1nuC7L3BEEYmjyCjEz5Qh8KfZaFkE1xEczlm40_zFxK_vfQCw=w1355-h1805-no",
//     geo: { longitude: 28.6154639, latitude: -81.1703861},
//   },
//   {
//     url: "https://lh3.googleusercontent.com/hETiST1gpLQoHmJtikk-Ol3kEIyKUk6XxLolKLUXDlqDfOIYpUZN0I160P2pRnyWyDxpJKFoaLgL89l0kJo86WGCQpoEMNkuSuxHQxrASAArPXbeZ716j8r3VrNpYjXmxgJFcGUWYG-BvdWEXdgyfDMypmv_oSXMYbPWSEylmvTPfdVP1ZwYN2DQMFajeTN3Uk-qU0LucU-hUeAwgniN8K-kOtpI7ROBwBoUIMSYAfByPz0JuCpIw8yQ9_eZOQqfre4lUPMBe8y2SAi3VXPuewNqWRMGlPgtamW-TLwLpynvz2jfO2q07k6L4J-uvFsfkVmux6jq1YwELEjqu8vyUVhl8ZYz-7Hjld5ZhHT7DpkZCt7e5jJH0_OUgtMRCozK5JKYa5oZn7R0oTFmMow6p-VfjmnZMG3cHtcbEwQCzceCV41aeD0Ea7t0aOdM_b-ZTsOj_fEvdmr-7SsfFLUIPj4m4XUlpF6FlP_vMo32YULkPtawP0XyDDBIAiG_TBSIdLRRIm_nF7hhRdgrYiOOg7LCVGHpPJjUNnmCVgRvXyYJCYKUeBoRQr7_IN4DB-k__Bhe9qw5y06OYNFaFMgUqOT0LZTT4MTtHLuOqQQmyDkMsmbMnjmH1uWUmorcRKdenCQn2XnA709MZi0t4DXr-uAtxwoIa4w=w2408-h1805-no",
//     geo: { longitude: 28.6136361, latitude: -81.1748056},
//   }
// ]).then(
//   function(response) {
//     console.log('Upload successful');
//   },
//   function(err) {
//     console.log('there was an error');
//   }
// );

// this is the function to search for the specific photos with geo tags

// app.inputs.search(
//   { input: {
//     geo: {
//       longitude: 116.2380,
//       latitude: 39.5447,
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
//     // there was an error
//   }
// );

// This is the prediction function for getting the tags to compare the photos

// app.models.predict(Clarifai.GENERAL_MODEL, 'https://lh3.googleusercontent.com/9_Uqa0-Hdlel1T10CJrDkaQbs8WIGb30HmaNsAUWMp9_xeT242ae8qE8hyoQOcAacWLzrrAyQCPE0Hi7mBSZjGiSk9X3Doq93h6FK2MWByf0Xdkv3NKJYz0-MqlfOx6jO4qh0qTz1FGv3hdjUhvin4eEEgtxXGM8a0avwyzpwI2fZ6yET6QS-m33HTw3k2ueMPFYAZ97et8jpTvtInvuloyiZ2g95WdiGwnhxuo7wxFrsEqGb8yu7GbT_MUMbVBsKM8HJgnxIOohV4QJkOL8wTmttujW6sr9oM6VstbkrVTisqHkgyiqES-OZPZFYNdIxtCc_-9Eb0_tvBCFwemTFC7dtMkbSE7bQ4JlVS8a0jQHsRMfY6hSowU7U6KK4aXN0pzxnrYqpC9j2KjpTYkyNmdPidKUQzpKZAL1VpYlmYWR_AoXLLhP7FHf1IqzHPNxnlUbICEiOM1x42QDNSEOu3x_zUA5sDsz7TNdqt4QWfKWxG1e015mDSGOe0HVKtxSaP4Lw5NNdmYei6S6r13jQO3qFjYw2v6SRIDzTNh_x2SE4VtreO83q37GewLbC4v7ZPMnGOlhoQyPnNCZLYFYNHvQhhLAT4_sJlLF6WeUyf4Be9ZCvo4BxkmD7YTa2Vkfyr3UMqsUL0VraN8ddbi4T1WUcRJRNmQ=w1355-h1805-no', { maxConcepts: 10 })
//   .then(response => {
//     console.log(response['outputs'][0]['data']['concepts']);
//     })
//   .catch(error => {
//     console.log(error);
//   });

app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://lh3.googleusercontent.com/fq9VvAk0QwMPj3hO0-qOT96ngak95jwrjpa3TE52K-pDfSNlzXuf0JULFpHU2fF7JF_brE9qfqXFOJxMB84X3KJ_tk6RvkA8080HryCHnQPdDMP0Jf0uO1VHbvhteVodz8o2_sn-KDirlihNwjL4hDnofnaq6JvRe4SO-TkMOCQ3jt19Fo0HugBhg06RF7pGwcVJMjTZEmGh5g2XsW05s5VWK0Qw_CkGPlSJHYUQ720l9HfB8T-iK2X6PydY3l5wKfwG5K8gMy8cuS6zbgyqadViHH8vkq-xzgxwn2Szwln_xOUTqtJM928wh73kAXlzkZci6V0LsN41Z8bxl3YrWTI0AuxbkqNepfrorK7b3zyPj6W6iyBQwUojsJvB6dNTxw9tkiIGWdJTKN_PrF1ITqCYxGHyhyBMCDNltK6anp4s5j_asGNC3A8XwkMdXqIRce5CKhjyfYTxEAtYEvAGuSPzS2afFQHIclXGf00l3p8Vv30Eq9mSgVaJsLCZhpXeQTOFOlw6t2WAqDOVC2sc9i10sjPFJF5F-draB5_NPdri3CfSgI9msy4rzDvvyEFRNeL3fEawR38WmTLTeDjACk_sUgw3kqyyEjHq6S6bR7A7BSck0lJGEJmVaa0eVC0PTV-gc7I4xtBVS5b9qs7gyWbvp02lSzs=w2408-h1805-no", { maxConcepts: 5 });
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        console.log(concepts);
      });
