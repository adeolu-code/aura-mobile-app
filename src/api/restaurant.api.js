import { urls, GetRequest, errorMessage, successMessage, consoleLog } from "../utils";

export async function getRestaurantOrdersApi(page=1,size=1) {
    
    let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.order + urls.host + "?Page="+page+"&Size="+size , undefined, "GET");
    console.log(urls.restaurantBase + urls.v, urls.restaurant + urls.order + urls.host + "?Page="+page+"&Size="+size);
    //console.log("this.context.state.idTypes", res, res.isError);
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
    //console.log("this.context.state.idTypes", res, res.isError);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}