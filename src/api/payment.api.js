import { urls, successMessage, errorMessage, GetRequest } from "../../utils";

export async function getPayMethodsApi() {
    try {
        let res = await GetRequest(urls.paymentBase + urls.v , urls.payMethods);
        if (res.isError) {
            errorMessage(res.message);
        }
        else {
            successMessage(res.message);
        }
        return res;
    } catch (error) {
        
    }
}