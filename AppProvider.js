/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import { setContext, Request, GetRequest, urls } from "./src/utils";

import { setUser, clearData } from './src/helpers';

import * as RootNavigation from './src/RootNavigation';


const AppContext = React.createContext({});

const defaultContext = {
  name: "Aura",
  balance: 0,
  userData: undefined,
  token: undefined,
  isLoggedIn: false,
  propertyTypes: [],
  gettingPropertyTypes: false,
  roomTypes: [],
  gettingRoomTypes: false,
  propertyFormData: null,
  location: null,
  isInApp: false,
  edit: false,
  editTour: false,
  step: 1,
  notificationSettings: {messages: {}, policy: {}, reminders: {}},
  photographOnboard: null,
  currentDashboard: 1,
  tourOnboard: null
};



class AppProvider extends Component {
  state = defaultContext;
  set = (value) => {
    // this.setState(value);
    this.setState(()=>(value), () => {
      setContext({state: this.state});
    })
    // setTimeout(() => {
    //   setContext({state: this.state});
    // }, 1000);
  };

  componentDidMount = () => {
  }

  getUserProfile = (token) => {
    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.identityBase, `${urls.v}user/me`, token);
      if (res.IsError || res.isError) {
        await clearData()
        this.set({ userData: undefined, isLoggedIn: false })
        reject(res.message)
      } else {
        await setUser(res.data)
        resolve(res.data)
        this.set({ userData: res.data, isLoggedIn: true })
        this.getPropertyTypes()
      }
    })
  }
  getPropertyTypes = () => {
    this.set({ gettingPropertyTypes: true})
    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/propertytype`);
      // console.log("property types", res);
      if (res.IsError || res.isError) {
        this.set({ gettingPropertyTypes: false})
        reject(res.message)
      } else {
        this.set({ propertyTypes: res.data, gettingPropertyTypes: false })
        const name = res.data[0].name.toLowerCase()
        this.getRoomTypes(name)
        resolve(res.data)
      }
    })
  }
  getRoomTypes = (type) => {
    this.set({ gettingRoomTypes: true})
    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/roomtype/${type}`);
      if (res.IsError || res.isError) {
        this.set({ gettingRoomTypes: false})
        reject(res.message)
      } else {
        this.set({ roomTypes: res.data, gettingRoomTypes: false })
        resolve(res.data)
      }
    })
  }


  logOut = async () => {
    await clearData()
    this.set({ userData: null, isLoggedIn: false })
    console.log('called logout')
    // RootNavigation.navigate('Dashboard', { screen: 'Dashboard' });
    // RootNavigation.navigate('Tabs', { screen: 'Dashboard' });
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
            return this.getUserProfile(token);
          },
          getRoomTypes: (value) => {
            return this.getRoomTypes(value);
          },
          getPropertyTypes: () => {
            return this.getPropertyTypes()
          },
          logOut: () => {
            return this.logOut()
          },
          reset: () => {
            this.set(defaultContext);
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
