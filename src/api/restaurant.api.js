import { urls, GetRequest, errorMessage, successMessage, consoleLog, Request } from "../utils";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-community/async-storage";

export async function getRestaurantOrdersApi(page=1,size=1, type="host") {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.order + ((type == "host") ? urls.host : urls.user) + "?Page="+page+"&Size="+size , undefined, "GET");
        consoleLog("update_res", "res", res);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        
        return; 
    } catch (error) {
        return;
    }
}

export async function getRestaurantApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.host, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function updateRestaurantApi(profileId, data) {
    try {
        let res = await Request(urls.restaurantBase + urls.v, urls.restaurant + profileId, data, false, "PUT");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function getRestaurantServicesApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantServices, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return; 
    } catch (error) {
        return;
    }
}

export async function getRestaurantOpenDaysApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantOpen, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function getRestaurantOpenTimeApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantOpentime, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function getRestaurantOperationApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantOperation, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return; 
    } catch (error) {
        return;
    }
}

export async function saveRestaurantApi(data) {
    try {
        let res = await Request(urls.restaurantBase + urls.v, urls.restaurant , data, false, "POST");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}


export async function getRestaurantRevewApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantComment, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return; 
    } catch (error) {
        return;
    }
}

export async function getRestaurantRatingApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantRating, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function getRestaurantCuisineApi() {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.restaurantCuisine, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function getRestaurantPhotoMenuApi(profileId) {
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.photoMenu + profileId, undefined, "GET");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            return res.data;
        }
        return; 
    } catch (error) {
        return;
    }
}

export async function updateRestaurantPhotoMenuApi(profileId, data) {
    try {
        let res = await Request(urls.restaurantBase + urls.v, urls.restaurant + urls.photo + profileId, data, false, "PUT");
        console.log("res", res);
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function uploadRestaurantPhotoMenuApi(profileId, assetPath, data) {
    try {
        let res = await Request(urls.restaurantBase + urls.v, urls.restaurant + urls.photo + "menu/multiple", data, false, "POST");
        console.log("res", res, urls.restaurantBase + urls.v+ urls.restaurant + urls.photo + "menu");
        
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}

export async function deleteRestaurantPhotoMenuApi(id) {
    
    try {
        let res = await GetRequest(urls.restaurantBase + urls.v, urls.restaurant + urls.photo + "?photoId=" + id, undefined, "DELETE");
        if (res.isError) {
            errorMessage(res.message);
        } else {
            successMessage(res.message);
            return res.data;
        }
        return;
    } catch (error) {
        return;
    }
}