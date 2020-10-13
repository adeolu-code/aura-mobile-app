import React, { Component, useState } from "react";
import { setContext, Request, GetRequest, urls } from "./src/utils";

import { setUser } from './src/helpers';

const AppContext = React.createContext({});

const defaultContext = {
  name: "Aura",
  balance: 0,
  userData: undefined,
  token: undefined,
  isLoggedIn: false,
};


class AppProvider extends Component {
  state = defaultContext;
  
  set = (value) => {
    this.setState(value);
    setTimeout(() => {
      setContext({state: this.state});
    }, 1000);
  };

  getUserProfile = (token) => {
    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.identityBase, 'api/v1/user/me', token);
      if (res.isError) {
        reject(res.message)
      } else {
        const userData = { ...res.data, token}
        await setUser(userData)
        resolve(res.data)
        this.set({ userData: userData, isLoggedIn: true, token })
      }
    })
  }

  render() {
    const context = this.state;
    return (
      <AppContext.Provider
        value={{
          state: context,
          set: (value) => {
            return this.set(value);
          },
          getState: (key)=> this.state[key],
          getUserProfile: (token) => {
            return this.getUserProfile(token)
          },
          reset: () => {
            console.log("resetting context", this.state);
            this.set(defaultContext);
            console.log("resetting context", this.state);
          },
          
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export { AppProvider, AppContext };
export const AppConsumer = AppContext.Consumer;
