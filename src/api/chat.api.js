import { urls, GetRequest, errorMessage, successMessage, Request } from "../utils";

export async function getChatListApi(host, data) {
    let url = "";
    
    if (host) {
        url = urls.hostMessageHeadline;
    }
    else {
        url = urls.guestMessageHeadline;
    }

    let res = await GetRequest(urls.messagingBase + urls.messaging + urls.v, url, undefined, "GET", data);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function getChatConvoApi(data) {
    let url = "";
    
    url = urls.messaging + urls.conversation;

    let res = await GetRequest(urls.messagingBase + urls.messaging + urls.v, url, undefined, "GET", data);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function messageHostApi(data) {
    let url = "";
    
    url = urls.messaging + urls.host;

    let res = await Request(urls.messagingBase + urls.messaging + urls.v, url, data);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function messageUserApi(data) {
    let url = "";
    
    url = urls.messaging + urls.user;

    let res = await Request(urls.messagingBase + urls.messaging + urls.v, url, data);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res;
    }
    
    return;
}