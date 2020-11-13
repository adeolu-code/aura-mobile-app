import { urls, GetRequest, errorMessage, successMessage, Request } from "../utils";

export async function getPropertyByIdApi(propertyId) {
    let url = "";

    url = urls.propertyById + propertyId;

    let res = await GetRequest(urls.listingBase + urls.v, url, undefined, "GET");
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}