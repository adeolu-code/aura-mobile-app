/* eslint-disable prettier/prettier */
import { urls, Request, GetRequest, errorMessage, successMessage } from "../utils";

export async function loginApi(data) {
    // blueprint of api call function
    let res = await Request(urls.identityBase + urls.v, urls.auth + urls.user + urls.login, data);
    
    return res;
}

export async function getDeviceInfoApi() {
    // blueprint of api call function
    let res = await GetRequest(urls.identityBase + urls.v, urls.user + urls.deviceInformation);
    
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        // successMessage(res.message);
        return res.data;
    }
    
    return;
}

export async function getIdentityTypesApi() {
    
    let res = await GetRequest(urls.identityBase + urls.v, urls.identityType);
    //console.log("this.context.state.idTypes", res, res.isError);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        // successMessage(res.message);
        return res.data;
    }
    
    return;
}

export async function generateOTPApi() {
    
    let res = await Request(urls.identityBase + urls.v, urls.user + urls.otp + urls.generate);
    //console.log("this.context.state.idTypes", res, res.isError);
    if (res.isError == false ) {
        successMessage(res.message);
    }
    else {
        errorMessage(res.Message);
    }
    
    return res;
}

export async function verifyOTPApi() {
    
    let res = await GetRequest(urls.identityBase + urls.v, urls.user + urls.otp + urls.verify);
    //console.log("this.context.state.idTypes", res, res.isError);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
        return res.data;
    }
    
    return;
}

export async function getReferralCodeApi() {
    
    let res = await GetRequest(urls.promotionBase , urls.referralCode);
    //console.log("this.context.state.idTypes", res, res.isError);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function forgotPasswordApi(data) {
    
    let res = await GetRequest(urls.identityBase + urls.v , urls.user + urls.forgotPassword, undefined, "GET", data);

    if (res.isError == true) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
    }
    
    return res;
}