import { urls, GetRequest, errorMessage, successMessage, Request, consoleLog } from "../utils";

export async function getChatListApi(host, data) {
    let url = "";
    
    if (host) {
        url = urls.hostMessageHeadline;
    } else {
        url = urls.guestMessageHeadline;
    }
    try {
        let res = await GetRequest(urls.messagingBase + urls.messaging + urls.v, url, undefined, "GET", data);
        if (res.isError) {
            errorMessage(res.message);
        }
        else {
            return res.data;
        } 
    } catch (error) {
        return;
    }
    return;
}

export async function getChatConvoApi(data) {
    let url = "";
    
    url = urls.messaging + urls.conversation;

    try {
        let res = await GetRequest(urls.messagingBase + urls.messaging + urls.v, url, undefined, "GET", data);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        } 
    } catch (error) {
        return;
    }
    return;
}

export async function messageHostApi(data) {
    let url = "";
    url = urls.messaging + urls.host;
    try {
        let res = await Request(urls.messagingBase + urls.messaging + urls.v, url, data);
        if (res.isError) {
            errorMessage(res.message);
        }
        else {
            return res.data;
        } 
    } catch (error) {
        return;
    }
    return;
}

export async function messageUserApi(data, host) {
    let url = "";
    const typeUrl = host ? urls.host : urls.user 
    url = urls.messaging + typeUrl;
    try {
        let res = await Request(urls.messagingBase + urls.messaging + urls.v, url, data);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res;
        } 
    } catch (error) {
        return;
    }
    return;
}

export async function makeComplaintApi(data) {
    try {
        let res = await Request(urls.messagingBase + urls.messaging + urls.v, urls.complaints, data);
        consoleLog("update_res", "result comp", res, data);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            return res;
        }
    } catch (error) {
        return;
    }
    return;
}