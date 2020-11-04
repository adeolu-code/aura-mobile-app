import { urls, Request, successMessage, errorMessage, GetRequest } from "../../utils";

export async function getPayMethodsApi() {
    
    let res = await GetRequest(urls.paymentBase + urls.v , urls.payMethods);
    console.log('result', res);

    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
    }
    
    return res;
}