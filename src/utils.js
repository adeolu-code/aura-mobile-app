/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";
import colors from './colors'

let context = undefined;
export const GLOBAL_PADDING = 20;

const CLIENT_ID = '0987654321'
const CLIENT_SECRET = '1234567890'

export const GOOGLE_API_KEY = "AIzaSyDgK05jlCwTbkjvemPgyjWcT8iiLoVG0xs"


export const urls = {
   identityBase: "http://aura-identity-service.d6f993e093904834a7f1.eastus.aksapp.io/identity/",
    bookingBase: "http://aura-booking-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    listingBase: "http://aura-listing-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    messagingBase: "http://aura-messaging.d6f993e093904834a7f1.eastus.aksapp.io/",
    paymentBase: "http://aura-payment-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    photographyBase: "http://aura-photography-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    supportBase: "http://aura-support.d6f993e093904834a7f1.eastus.aksapp.io/",
    promotionBase: "http://aura-promotion.d6f993e093904834a7f1.eastus.aksapp.io/",
    storageBase: "http://aura-storage.d6f993e093904834a7f1.eastus.aksapp.io/",
    v1: "/api/v1/",
    auth: "auth/",
    user: "user/",
    login: "login/"
}
const getUserToken = async () => {
	try {
      let token = await AsyncStorage.getItem("token");
      token = JSON.parse(token);
		return token.access_token;
	} catch (error) {
		return error;
	}
};


export function setContext(appContext) {
    if (context === undefined) {
      context = appContext;
    }
    else {
      context.state = appContext.state;
    }
}

export function prepareMedia(data) {
  console.log("Media", JSON.stringify(data));
  //camera
  return {
    name: data.fileName,
    type: data.type,
    uri: data.uri,
    size: data.fileSize,
  };
  //photo picked
  // return {
  //   name: data.name,
  //   type: data.type,
  //   uri: data.uri,
  //   size: data.size
  // };
}

function PrepareData(Data, type = "json") {
  //change default based on app's api default content type
  if (type == "json") {
     return JSON.stringify(Data)
  } else if (type == "multipart") {
     const formData = new FormData()
     Object.keys(Data).forEach((e) => {
        formData.append(e, Data[e])
     });
     return formData;
  }
}

/* POST Request fetch function **/
export async function Request(
  Base,
  Url,
  Data,
  PreparedData = false,
  method = "POST",
  
) {
  //if PreparedData then no need to convert the data to json or multi part e.g is data being passed is already a form data
  //also change content type
  const token = await getUserToken();
  let headers = {}
  
  if (!PreparedData) {
     headers["Content-Type"] = "application/json"
  }

  headers["Access-Control-Allow-Origin"] = "*"  
  headers["ClientId"] = CLIENT_ID
  headers["ClientSecret"] = CLIENT_SECRET
  
  if (typeof token === "boolean" && token) {
     headers["Authorization"] = "Bearer " + token
  } else if (token != undefined && token !== null) {
     headers["Authorization"] = "Bearer " + token
  }   
  
  return fetch(Base + Url, {
     method: method,
     headers: headers,
     body: !PreparedData ? PrepareData(Data) : Data,
  })
     .then((response) => {
        return response.json();
     })
     .then((data) => {
        let keys = Object.keys(data);
        return data
     })
     .catch((error) => {
        return error
     })
}

export async function GetRequest(Base, Url, accessToken, type = "GET") {
   let token = '';
   if(accessToken) {
      token = accessToken;
   } else {
      token = await getUserToken();
   }
   let headers = {
     Accept: "application/json",
     "Content-Type": "application/json",
     "Access-Control-Allow-Origin": "*",
    }   
    if (typeof token === "boolean" && token) {
      headers["Authorization"] = "Bearer " + Token
    } else if (token != undefined && token !== null) {
      headers["Authorization"] = "Bearer " + token
    }   
    return fetch(Base + Url, {
      method: type,
      headers: headers,
    })
     .then((response) => {
        return response.json()
     })
     .then((data) => {
        return data
     })
     .catch((error) => {
       let data = {error: error, type: "error"}
        return data
     })
}

export const errorMessage = (message, size) => {
   showMessage({
      message, floating: true,
      position: {bottom: 10, left: size ? size : 50, right: size ? size : 50},
      style: { width: '100%', backgroundColor: 'white', paddingHorizontal: 0, borderWidth: 1, borderColor: colors.secondary },
      titleStyle: { textAlign: 'center', color: colors.secondary }
    });
}
export const successMessage = (message) => {
   showMessage({
      message, type: "success", floating: true
    });
}
