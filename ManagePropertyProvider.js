/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import { setContext, Request, GetRequest, urls } from "./src/utils";

import { AppContext } from './AppProvider';

const ManagePropertyContext = React.createContext({});

const defaultContext = {
  loadingAllProperties: false, loadingHotels: false, loadingApartments: false,
  properties: [], hotels: [], apartments: [], totalAllProperties: 0, totalHotels: 0, totalApartments: 0, 
  activePropertiesPage: 1, activeHotelsPage:1, activeApartmentsPage: 1, perPage: 10, pageCount: 0,
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
    const { activePropertiesPage, perPage } = this.state
    return new Promise( async (resolve, reject) => {
      this.set({ loadingAllProperties: true })
      const res = await GetRequest(urls.listingBase,  `${urls.v}listing/property/me/?UserId=${userData.id}&Page=${activePropertiesPage}&Size=${perPage}`);
      this.set({ loadingAllProperties: false })
      if(res.isError) {
        reject(res.message)
      } else {
        const data = res.data
        resolve(data)
        console.log('All properties ', res.data)
        this.set({ properties: data.data, activePropertiesPage: data.page, totalAllProperties: data.totalItems })
      }
    })
  }
  getHotels = async () => {
    const { userData, propertyTypes } = this.context.state;
    const { activeHotelsPage, perPage } = this.state;
    const type = propertyTypes.find(item => item.name.toLowerCase() === 'hotel')

    return new Promise( async (resolve, reject) => {
      this.set({ loadingHotels: true })
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/property/me/?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeHotelsPage}&Size=${perPage}`);
      this.set({ loadingHotels: false })
      if(res.isError) {
        reject(res.message)
      } else {
        const data = res.data
        resolve(data)
        this.set({ hotels: data.data, activeHotelsPage: data.page, totalHotels: data.totalItems })
      }
    })
  }
  getApartments = async () => {
    const { userData, propertyTypes } = this.context.state
    const { activeApartmentsPage, perPage } = this.state
    const type = propertyTypes.find(item => item.name.toLowerCase() === 'apartment')

    return new Promise( async (resolve, reject) => {
      this.set({ loadingApartments: true })
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/property/me/?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeApartmentsPage}&Size=${perPage}`);
      this.set({ loadingApartments: false })
      if(res.isError) {
        reject(res.message)
      } else {
        const data = res.data
        resolve(data)
        this.set({ apartments: data.data, activeApartmentsPage: data.page, totalApartments: data.totalItems })
      }
    })
  }
  componentDidMount = () => {
    // console.log('App provider ',this.context)
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
