import { urls, GetRequest, errorMessage, successMessage } from "../utils";

export async function getPropertyBookingsApi(data) {
    
    let res = await GetRequest(urls.bookingBase + urls.v, urls.booking + urls.property, undefined, "GET", data);
    //console.log("this.context.state.idTypes", res, res.isError);
    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        return res.data;
    }
    
    return;
}