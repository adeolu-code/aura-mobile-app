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