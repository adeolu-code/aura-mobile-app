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