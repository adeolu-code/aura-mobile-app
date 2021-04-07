/* eslint-disable prettier/prettier */
import React, { Component, useState } from "react";
import { setContext, GetRequest, urls, consoleLog } from "./src/utils";

import { AppContext } from './AppProvider';

const ManageTourContext = React.createContext({});

const defaultContext = {
  loadingAllProperties: false, loadingHotels: false, loadingApartments: false,
  properties: [], hotels: [], apartments: [], totalProperties: 0, totalHotels: 0, totalApartments: 0, 
  activePropertiesPage: 1, activeHotelsPage:1, activeApartmentsPage: 1, perPage: 10, pagePropertiesCount: 0, 
  pageHotelsCount: 0, pageApartmentsCount: 0, loadMoreProperties: false, loadMoreHotels: false, loadMoreApartments: false,
  
};


class ManageTourProvider extends Component {
  static contextType = AppContext;
  state = defaultContext;
  
  set = (value, callBack) => {
    this.setState(()=>(value), () => {
      if(callBack) {
        callBack(value)
      } 
    })
    // this.setState(()=>(value), () => {
    //   setContext({state: this.state});
    // })
  };


  getAllProperties = async (more) => {
    const { userData } = this.context.state
    const { activePropertiesPage, perPage, properties } = this.state
    more ? this.set({ loadMoreProperties: true }) : this.set({ loadingAllProperties: true })
    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.listingBase,  `${urls.v}listing/property/me/?UserId=${userData.id}&Page=${activePropertiesPage}&Size=${perPage}`);
      more ? this.set({ loadMoreProperties: false }) : this.set({ loadingAllProperties: false })
      consoleLog("Properties", res);
      if(res.isError) {
        reject(res.message)
      } else {
        const response = res.data
        resolve(response)
        const dataResult = response.data
        let data = []
        if(more) {
          data = [...properties, ...dataResult]
        } else {
          data = dataResult
        }
        console.log('All properties ', res.data)
        const pagePropertiesCount =  Math.ceil(response.totalItems / perPage)
        this.set({ properties: data, activePropertiesPage: response.page, totalProperties: response.totalItems, pagePropertiesCount })
      }
    })
  }
  getHotels = async (more) => {
    const { userData, propertyTypes } = this.context.state
    const { activeHotelsPage, perPage, hotels } = this.state
    more ? this.set({ loadMoreHotels: true }) : this.set({ loadingHotels: true })
    const type = propertyTypes.find(item => item.name.toLowerCase() === 'hotel')

    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/property/me/?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeHotelsPage}&Size=${perPage}`);
      more ? this.set({ loadMoreHotels: false }) : this.set({ loadingHotels: false })
      if(res.isError) {
        reject(res.message)
      } else {
        const response = res.data
        resolve(response)
        const dataResult = response.data
        let data = []
        if(more) {
          data = [ ...hotels, ...dataResult ]
        } else {
          data = dataResult
        }
        const pageHotelsCount =  Math.ceil(response.totalItems / perPage)
        this.set({ hotels: data, activeHotelsPage: response.page, totalHotels: response.totalItems, pageHotelsCount })
      }
    })
  }
  getApartments = async (more) => {
    const { userData, propertyTypes } = this.context.state
    const { activeApartmentsPage, perPage, apartments } = this.state
    more ? this.set({ loadMoreApartments: true }) : this.set({ loadingApartments: true })

    const type = propertyTypes.find(item => item.name.toLowerCase() === 'apartment')
    return new Promise( async (resolve, reject) => {
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/property/me/?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeApartmentsPage}&Size=${perPage}`);
      more ? this.set({ loadMoreApartments: false }) : this.set({ loadingApartments: false })
      if(res.isError) {
        reject(res.message)
      } else {
        const response = res.data
        resolve(response)
        const dataResult = response.data
        let data = []
        if(more) {
          data = [ ...apartments, ...dataResult ]
        } else {
          data = dataResult
        }
        const pageApartmentsCount =  Math.ceil(response.totalItems / perPage)
        this.set({ apartments: response.data, activeApartmentsPage: response.page, totalApartments: response.totalItems, pageApartmentsCount })
      }
    })
  }
  componentDidMount = () => {
    // console.log('App provider ',this.context)
  }
  

  render() {
    const context = this.state;
    return (
      <ManageTourContext.Provider
        value={{
          state: context,
          set: (value, callBack) => {
            return this.set(value, callBack);
          },
          getState: (key)=> this.state[key],
          getAllProperties: (more=false) => {
            return this.getAllProperties(more)
          },
          getApartments: (more=false) => {
            return this.getApartments(more)
          },
          getHotels: (more=false) => {
            return this.getHotels(more)
          },
          reset: () => {
            console.log("resetting context", this.state);
            this.set(defaultContext);
            console.log("resetting context", this.state);
          },
          
        }}
      >
        {this.props.children}
      </ManageTourContext.Provider>
    );
  }
}

export { ManageTourProvider, ManageTourContext };
export const ManageTourConsumer = ManageTourContext.Consumer;
