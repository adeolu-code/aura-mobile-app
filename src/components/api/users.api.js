/* eslint-disable prettier/prettier */
import { urls, Request } from "../../utils";

export async function loginApi(data) {
    // blueprint of api call function
    let res = await Request(urls.identityBase + urls.v1, urls.auth + urls.user + urls.login, data);
    console.log('res', res);
    
    return res;
}