import { urls, GetRequest, errorMessage, successMessage, consoleLog, Request } from "../utils";

export async function getRestaurantOrdersApi(page=1,size=1, type="host") {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.order + ((type == "host") ? urls.host : urls.user) + "?Page="+page+"&Size="+size , undefined, "GET");
    console.log(urls.restaurantBase + urls.v, urls.restaurant + urls.order + urls.host + "?Page="+page+"&Size="+size);
    //
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function getRestaurantApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.host, undefined, "GET");
    //
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function updateRestaurantApi(profileId, data) {
    
    let res = await Request(urls.restaurantBase + urls.v, urls.restaurant + profileId, data, false, "PUT");
    //
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
        return res.data;
    }
    
    return;
}

export async function getRestaurantServicesApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantServices, undefined, "GET");
    //
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function getRestaurantOpenDaysApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantOpen, undefined, "GET");
    //
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function getRestaurantOpenTimeApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantOpentime, undefined, "GET");
    //
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function getRestaurantOperationApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantOperation, undefined, "GET");
    
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function saveRestaurantApi(data) {
    
    let res = await Request(urls.restaurantBase + urls.v, urls.restaurant , data, false, "POST");
    //
    
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
        return res.data;
    }
    
    return;
}


export async function getRestaurantRevewApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantComment, undefined, "GET");
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}

export async function getRestaurantRatingApi() {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantRating, undefined, "GET");
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}