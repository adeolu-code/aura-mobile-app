/* eslint-disable prettier/prettier */
import { urls, Request, successMessage, errorMessage } from "../utils";

export async function editProfileApi(data, context) {
    
    let res = await Request(urls.identityBase + urls.v , urls.user + urls.update, data);

    if (res.isError) {
        errorMessage(res.message);
    }
    else {
        successMessage(res.message);
        /** update context **/
        let userData = context.state.userData;
        data.otherVerifiedPhoneNumbers = JSON.parse(data.otherVerifiedPhoneNumbers);
        context.set({userData: {...userData, ...data}});
    }
    
    return res;
}