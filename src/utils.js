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
  console.log("Media", JSON.stringify({name: data.fileName,type: data.type,uri: data.uri,size: data.fileSize,}));
  return {
    name: data.fileName,
    type: data.type,
    uri: data.uri,
    size: data.fileSize,
  };
  // return {
  //   name: data.name,
  //   type: data.type,
  //   uri: data.uri,
  //   size: data.size
  // };
}