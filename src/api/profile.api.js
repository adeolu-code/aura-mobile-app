/* eslint-disable prettier/prettier */
import { urls, Request, successMessage, errorMessage, GetRequest } from "../utils";
import { getToken } from '../helpers';

export async function editProfileApi(data, context) {
    try {
        let res = await Request(urls.identityBase + urls.v , urls.user + urls.update, data);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            /** update context **/
            let userData = context.state.userData;
            // data.otherVerifiedPhoneNumbers = JSON.parse(data.otherVerifiedPhoneNumbers);
            context.set({userData: {...userData, ...data}});
            const token = await getToken()
            context.getUserProfile(token.access_token)
        }
        return res;
    } catch (error) {
        return;
    }
}

export async function uploadProfileImageApi(data, context) {
    try {
        let res = await Request(urls.identityBase + urls.v , urls.user + urls.profilePictureUpload, data);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            /** update context **/
            let userData = context.state.userData;
            context.set({userData: {...userData, ...data}});
        }
        return res;
    } catch (error) {
        return;
    }
}

export async function uploadIdentityImageApi(data) {
    try {
        let res = await Request(urls.identityBase + urls.v , urls.user + urls.identity + urls.singleUpload, data);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
        }
        return res; 
    } catch (error) {
        return;
    }
}

export async function changePasswordApi(data) {
    try {
        let res = await Request(urls.identityBase + urls.v , urls.user + urls.changePassword, data);
        // console.log("res", res);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
        }
        return res;
    } catch (error) {
        return;
    }
}

export async function getBankApi() {
    try {
        let res = await GetRequest(urls.identityBase + urls.v , urls.bank);
        return res;
    } catch (error) {
        return;
    }
}

export async function getUserBankDetailsApi(userId) {   
    try {
        let res = await GetRequest(urls.identityBase + urls.v , urls.user + urls.bankAccount +"?userId="+ userId) ;
        return res; 
    } catch (error) {
        return;
    } 
}

export async function updateUserBankDetailsApi(data) {  
    try {
        let res = await Request(urls.identityBase + urls.v , urls.user + urls.bankAccount, data) ;
        if (res.isError == true) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
        }
        return res;
    } catch (error) {
        return;
    }  
}


