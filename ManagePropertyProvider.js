import React, { Component, useState } from "react";
import { setContext, Request, GetRequest, urls } from "./src/utils";

import { AppContext } from './AppProvider';

const ManagePropertyContext = React.createContext({});

const defaultContext = {
  loadingAllProperties: false, loadingHotels: false, loadingApartments: false,
  properties: [], hotels: [], apartments: [], totalAllProperties: 0, totalAllHotels: 0, totalAllApartments: 0, 
  activeAllPropertiesPage: 1, activeHotelsPage:1, activeApartmentsPage: 1, perPage: 10, pageCount: 0,
};


class ManagePropertyProvider extends Component {
  static contextType = AppContext;
  state = defaultContext;
  
  set = (value) => {
    this.setState(()=>(value), () => {
      setContext({state: this.state});
    })
  };
  getAllProperties = async () => {
    const { userData } = this.context.state
    const { activePage, perPage } = this.state
    return new Promise( async (resolve, reject) => {
      this.set({ loadingAllProperties: true })
      const res = await GetRequest(urls.listingBase,  `${urls.v}listing/me/?UserId=${userData.id}&Page=${activePage}&Size=${perPage}`);
      this.set({ loadingAllProperties: false })
      if(res.isError) {
        reject(res.message)
      } else {
        resolve(res.data)
        this.set({ properties: res.data })
      }
    })
  }
  getHotels = async () => {
    const { userData, propertyTypes } = this.context.state
    const { activePage, perPage } = this.state
    const type = propertyTypes.find(item => item.name.toLowerCase() === 'hotel')

    return new Promise( async (resolve, reject) => {
      this.set({ loadingHotels: true })
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/me/?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activePage}&Size=${perPage}`);
      this.set({ loadingHotels: false })
      if(res.isError) {
        reject(res.message)
      } else {
        resolve(res.data)
        this.set({ hotels: res.data })
      }
    })
  }
  getApartments = async () => {
    const { userData, propertyTypes } = this.context.state
    const { activePage, perPage } = this.state
    const type = propertyTypes.find(item => item.name.toLowerCase() === 'apartment')

    return new Promise( async (resolve, reject) => {
      this.set({ loadingApartments: true })
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/me/?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activePage}&Size=${perPage}`);
      this.set({ loadingApartments: false })
      if(res.isError) {
        reject(res.message)
      } else {
        resolve(res.data)
        this.set({ apartments: res.data })
      }
    })
  }
  componentDidMount = () => {
    console.log('App provider ',this.context)
  }
  

  render() {
    const context = this.state;
    return (
      <ManagePropertyContext.Provider
        value={{
          state: context,
          set: (value) => {
            return this.set(value);
          },
          getState: (key)=> this.state[key],
          getAllProperties: () => {
            return this.getAllProperties()
          },
          getApartments: () => {
            return this.getApartments()
          },
          getHotels: () => {
            return this.getHotels()
          },
          reset: () => {
            console.log("resetting context", this.state);
            this.set(defaultContext);
            console.log("resetting context", this.state);
          },
          
        }}
      >
        {this.props.children}
      </ManagePropertyContext.Provider>
    );
  }
}

export { ManagePropertyProvider, ManagePropertyContext };
export const ManagePropertyConsumer = ManagePropertyContext.Consumer;
