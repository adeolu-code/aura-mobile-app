/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Platform } from 'react-native';
import colors from './colors'
import RNFetchBlob from 'rn-fetch-blob';
import { getToken, setToken } from './helpers';
// import { AppContext, AppConsumer, AppProvider } from '../AppProvider';

let context = undefined;
export let debug = false; 
// export let debug = true; 
export const GLOBAL_PADDING = 20;

const CLIENT_ID = '0987654321'
const CLIENT_SECRET = '1234567890'

export const GOOGLE_API_KEY = "AIzaSyDgK05jlCwTbkjvemPgyjWcT8iiLoVG0xs"; 
export const GOOGLE_SEARCH_KEY = 'AIzaSyDeW1aTWlO-Azt-kFGAIxHsQJflNCY_9mM';

const UNAUTHORIZED_MESSAGE = 'user is unauthorised to perform action'

export const PHOTOGRAPH = 'Photographer';
export const RESTAURANT = 'Restaurant';
export const EXPERIENCE = 'Tour-Guide';
export const HOST = 'Host';

let apiType = '';
let apiUrl = ''
let apiHeaders = '';
let apiData = ''


export const urls = {
   identityBase: "http://aura-identity-service.d6f993e093904834a7f1.eastus.aksapp.io/identity/",
    bookingBase: "http://aura-booking-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    listingBase: "http://aura-listing-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    messagingBase: "http://aura-messaging.d6f993e093904834a7f1.eastus.aksapp.io/",
    paymentBase: "http://aura-payment-service.d6f993e093904834a7f1.eastus.aksapp.io/payment/",
    photographyBase: "http://aura-photography-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    supportBase: "http://aura-support.d6f993e093904834a7f1.eastus.aksapp.io/",
    promotionBase: "http://aura-promotion.d6f993e093904834a7f1.eastus.aksapp.io/",
    storageBase: "http://aura-storage.d6f993e093904834a7f1.eastus.aksapp.io/storage/",
    experienceBase: "http://aura-experience-service.d6f993e093904834a7f1.eastus.aksapp.io/",
    restaurantBase: "http://aura-restaurant.d6f993e093904834a7f1.eastus.aksapp.io/",
    v1: "api/v1/",
    v: "api/v1/",
    auth: "auth/",
    user: "user/",
    login: "login/",
    update: "update/",
    payMethods: "pay/methods/",
    notificationSettings: "notification/settings/",
    deviceInformation: "deviceinformation/",
    identityType: "identitytype/",
    singleUpload: "upload/",
    multiUpload: "upload/multiple/",
    deleteUpload: "upload/delete/",
    profilePictureUpload: "profilepicture/upload/",
    otp: "otp/",
    generate: "generate/",
    verify: "verify/",
    identity: "identity/",
    property: "property/",
    booking: "bookings/",
    messaging: "messaging/",
    messageHeadline: "messaging/headline/",
    guestMessageHeadline: "messaging/guest/headlinemessages",
    hostMessageHeadline: "messaging/host/headlinemessages",
    conversation: "conversation/",
    host: "host/",
    notification: "notification/",
    unread: "unread/",
    read: "read/",
    count: "count/",
    propertyById: "listing/property/",
    referralCode: "lead/api/v1/referral",
    changePassword: "changepassword/",
    forgotPassword: "forgotpassword/",
    complaints: "complaints/",
    bank: "bank/",
    bankAccount: "bankaccount/",
    restaurant: "restaurant/",
    order: "orders/",
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

export function prepareMedia(image) {
  // image crop picker
  return {
      uri: image.path,
      width: image.width,
      height: image.height, 
      mime: image.mime,
      name: image.fileName || image.modificationDate,
   };
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

export function consoleLog(message, ...optionalParams) {
   if (debug) console.log(message, JSON.stringify(optionalParams));
}

export async function refreshToken(apiDetails) {
   const tokenObj = await getToken();
   const headers = {
      ClientId: CLIENT_ID,
      ClientSecret: CLIENT_SECRET,
      RefreshToken: tokenObj.refresh_token
   }
   headers["Content-Type"] = "application/json"
   headers["Access-Control-Allow-Origin"] = "*"
   headers["Authorization"] = "Bearer " + tokenObj.access_token
   const url = `${urls.identityBase}${urls.v}auth/token/renew`

   const response = await fetch(url, { method: 'GET', headers })
   let data = await response.json()
   if(data.isError) {
      // Log user Out
      context.logOut()
      return data
   } else {
      // Set user data to context and to async storage
      setToken(data.data)
      context.set({ token: data.data })
      // repeat the previous api call
      if(apiDetails.type === 'GET') {
         getApi(apiDetails.url, apiDetails.type, apiDetails.headers)
      } else {
         postApi(apiDetails.url, apiDetails.type, apiDetails.headers, apiDetails.body)
      }
   }
}

async function getApi(url, type, headers ) {
   const response = await fetch(url, { method: type, headers })
   let data = response.json()
   return data
}
async function postApi(url, method, headers, body) {
   const response = await fetch(url, {
      method, headers, body })
   let data = response.json()
   return data
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
   consoleLog("url", Base+Url, Data)
   
   if (!PreparedData) {
      headers["Content-Type"] = "application/json"
   }
   else {
    headers["Content-Type"] = "multipart/form-data"
   }
 
   headers["Access-Control-Allow-Origin"] = "*"  
   headers["ClientId"] = CLIENT_ID
   headers["ClientSecret"] = CLIENT_SECRET
   
   if (typeof token === "boolean" && token) {
      headers["Authorization"] = "Bearer " + token
   } else if (token != undefined && token !== null) {
      headers["Authorization"] = "Bearer " + token
   } 
   const body = !PreparedData ? PrepareData(Data) : Data
   const res = await fetch(Base + Url, {
      method, headers, body })

   if(res.status === 401) {
      const apiDetails = {
         url: Base + Url, headers, type: method, body
      }
      refreshToken(apiDetails)
   } else {
      let data = res.json()
      return data
   }
}


export async function GetRequest(Base, Url, accessToken, type = "GET", data=undefined) {
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
      headers["Authorization"] = "Bearer " + token
    } else if (token != undefined && token !== null) {
      headers["Authorization"] = "Bearer " + token
    }   

    let url = Base + Url;
    if (data != undefined) {
      url = new URL(Base + Url);
      let search = new URLSearchParams(data).toString();
      
      url = url+"?"+search;
      consoleLog("get data", data, url);
    }
   const response = await fetch(url, { method: type, headers })
   if(response.status === 401) {
      const apiDetails = {
         url, headers, type
      }
      refreshToken(apiDetails)
   } else {
      let data = response.json()
      return data
   }
} 
// if(data !== undefined && (data.IsError || data.isError) && (data.Message === UNAUTHORIZED_MESSAGE || data.message === UNAUTHORIZED_MESSAGE)) {
//    console.log('Got here utils ', data)
//    context.logOut()
//    return;
// }
 

/* POST Request fetch function **/
export async function UploadRequest(
   Base,
   Url,
   Data,
   method = "POST",
   
 ) {
   const token = await getUserToken();
   let headers = {}
   
   headers["Content-Type"] = "multipart/form-data"
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
      body: Data,
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

export const uploadMultipleFile = async (images) => {
   return new Promise((resolve, reject) => {
      const formData = new FormData();
      images.forEach((item, i) => {
         const filename = item.path.substring(item.path.lastIndexOf('/') + 1)
         formData.append("model", {
            // uri:Platform.OS === 'ios' ? item.sourceURL : item.path,
            uri: item.path,
            name: `${Date.now()}_${filename}`,
            type: item.mime
         });
      });
      UploadRequest(urls.storageBase, `${urls.v}upload/multiple`, formData)
      .then((response) => {
         resolve(response);
      })
      .catch((error) => {
         reject(error)
      })
   })
   
}
export const uploadFile = async (image, fname) => {
   
   return new Promise((resolve, reject) => {
      const formData = new FormData();
      const filename = fname ? fname : image.path.substring(image.path.lastIndexOf('/') + 1)
      formData.append("File", {
         uri: image.path || image.uri,
         name: `${Date.now()}_${filename}`,
         type: image.mime || image.type
      });
      formData.append('FileName', filename)
      UploadRequest(urls.storageBase, `${urls.v}upload`, formData)
      .then((response) => {
         resolve(response)
      })
      .catch((error) => {
         reject(error)
      })
   })
   
}



export const errorMessage = (message, size) => {
   showMessage({
      message, floating: true,
      duration: 5000,
      position: {bottom: 10, left: size ? size : 50, right: size ? size : 50},
      style: { width: '100%', backgroundColor: 'white', paddingHorizontal: 0, borderWidth: 1, borderColor: colors.secondary },
      titleStyle: { textAlign: 'center', color: colors.secondary }
    });
}
export const successMessage = (message, duration) => {
   showMessage({
      message, type: "success", floating: true, duration: 5000 || duration
    });
}

export async function uploadImageApi(data, single=true) {

   const token = await getUserToken();
   let url = urls.storageBase + urls.v;
   url += (single ? urls.singleUpload : urls.multiUpload);
   // url = "http://192.168.43.111:8000/api/farm/upload/";
 
   let res =  RNFetchBlob.fetch('POST', url, {
      'Content-Type' : 'multipart/form-data',
      ClientId: CLIENT_ID,
      ClientSecret: CLIENT_SECRET,
      "Authorization": "Bearer " + token,
    }, data)
    .then((resp) => {  
        return resp;
    }).catch((err) => {
        errorMessage(err);
        return err;
    });

    return res;
}
