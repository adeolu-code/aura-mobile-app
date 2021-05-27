import { urls, GetRequest, errorMessage, successMessage, consoleLog, Request } from "../utils";

export async function getPropertyBookingsApi(data, endpoint="property") {
    if (endpoint == "property" || endpoint == "") endpoint = urls.property;
    if (endpoint == "tour") endpoint = urls.experienceBase;
    // http://aura-booking-service.d6f993e093904834a7f1.eastus.aksapp.io/api/v1/bookings/property
    try {
        let res = await GetRequest(urls.bookingBase + urls.v, urls.booking + endpoint, undefined, "GET", data);
        //console.log("this.context.state.idTypes", res, res.isError);
        if (res.isError) {
            //errorMessage(res.message);
            console.log(res.message);
        } else {
            return res.data;
        }
    } catch (error) {
        return;
    }
    return;
}

export async function getExperienceApi(id, page=1,size=1, endpoint="experience") {
    try {
        let res = await GetRequest(urls.bookingBase + urls.v, urls.booking + endpoint  + "?Page="+page+"&Size="+size+"&userId=" + id , undefined, "GET");
        consoleLog(urls.restaurantBase + urls.v, urls.restaurant + urls.order + urls.host + "?Page="+page+"&Size="+size);
        //
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

export async function cancelBookingAPI(data) {
    try {
        let res = await Request(urls.bookingBase + urls.v, urls.booking + "cancellation/", data);
        if (res.isError) {
            errorMessage(res.message);
        }
        else {
            successMessage(res.message);
            return res.data;
        }
    } catch (error) {
        return;
    }
    return;
}