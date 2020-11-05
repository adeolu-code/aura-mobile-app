/* eslint-disable prettier/prettier */
import { urls, Request, successMessage, errorMessage, GetRequest } from "../../utils";

export async function setNotificationSettingsApi(data, context) {
    
    let res = await Request(urls.identityBase + urls.v1 , urls.user + urls.notificationSettings, data);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
        // update context to set user settings
        let notificationSettings = context.state.notificationSettings || {};
        
        let settingsKeys = Object.keys(data);
        
        settingsKeys.map(settingKey => {
            let key = settingKey.split("_");
            if (notificationSettings[key[0]] == undefined) {
                notificationSettings[key[0]] = {};
                notificationSettings[key[0]][key[1].toLowerCase()] = data[settingKey];
            }
            else {
                notificationSettings[key[0]][key[1].toLowerCase()] = data[settingKey];
            }
            
        });
        
        context.set({notificationSettings: notificationSettings});
    }
    
    return res;
}

export async function getNotificationSettingsApi(context) {
    
    let res = await GetRequest(urls.identityBase + urls.v1 , urls.user + urls.notificationSettings);
    
// console.log("res.data.userId != undefinedl", (res.data.userId != undefined && res.data.userId != null))
    if (res.isError == true) {
        errorMessage(res.message);
    }
    else if (res.isError == false) {
        // set context set user settings
        if (res.data != undefined && res.data != null) {
            delete res.data.userId;
            context.set({notificationSettings: res.data});
        }
    }
    
    return res;
}