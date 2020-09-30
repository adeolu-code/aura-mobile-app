let context = undefined;
export const GLOBAL_PADDING = 20;

export function setContext(appContext) {
    if (context === undefined) {
      context = appContext;
    }
    else {
      context.state = appContext.state;
    }
}

export function prepareMedia(data) {
  console.log("Media", JSON.stringify(data));
  //camera
  return {
    name: data.fileName,
    type: data.type,
    uri: data.uri,
    size: data.fileSize,
  };
  //photo picked
  // return {
  //   name: data.name,
  //   type: data.type,
  //   uri: data.uri,
  //   size: data.size
  // };
}

function PrepareData(Data, type = "json") {
  //change default based on app's api default content type
  if (type == "json") {
     console.log("strigifying data", JSON.stringify(Data))
     return JSON.stringify(Data)
  } else if (type == "multipart") {
     console.log("multipart data")
     const formData = new FormData()
     Object.keys(Data).forEach((e) => {
        formData.append(e, Data[e])
     })
     return formData
  }
}

/* POST Request fetch function **/
export async function Request(
  Base,
  Url,
  Data,
  PreparedData = false,
  method = "POST",
  token = undefined
) {
  //if PreparedData then no need to convert the data to json or multi part e.g is data being passed is already a form data
  //also change content type
  let headers = {}
  
  if (!PreparedData) {
     headers["Content-Type"] = "application/json"
  }

  headers["Access-Control-Allow-Origin"] = "*"   
  
  if (typeof token === "boolean" && token) {
     headers["Authorization"] = "Bearer " + Token
  } else if (token != undefined) {
     headers["Authorization"] = "Bearer " + token
  }   
  
  return fetch(Base + Url, {
     method: method,
     headers: headers,
     body: !PreparedData ? PrepareData(Data) : Data,
  })
     .then((response) => {
        return response.json();
     })
     .then((data) => {
        let keys = Object.keys(data);
        return data
     })
     .catch((error) => {
        return error
     })
}

export async function GetRequest(Base, Url, token = undefined, type = "GET") {
  let headers = {
     Accept: "application/json",
     "Content-Type": "application/json",
     "Access-Control-Allow-Origin": "*",
    }   
    if (typeof token === "boolean" && token) {
      headers["Authorization"] = "Bearer " + Token
    } else if (token != undefined) {
      headers["Authorization"] = "Bearer " + token
    }   return fetch(Base + Url, {
      method: type,
      headers: headers,
    })
     .then((response) => {
        return response.json()
     })
     .then((data) => {
        return data
     })
     .catch((error) => {
       let data = {error: error, type: "error"}
        return data
     })
}
