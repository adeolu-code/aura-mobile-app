/* eslint-disable prettier/prettier */
import React, { Component} from 'react';
import { setContext, GetRequest, urls } from './src/utils';

import { AppContext } from './AppProvider';

const ReservationsContext = React.createContext({});

const defaultContext = {
  loadingReservations: false, loadingRecentReservations: false, loadingConcludedReservations: false,
  reservations: [], recentReservations: [], concludedReservations: [], totalReservations: 0, totalRecentReservations: [], totalConcludedReservations: 0,
  activeReservationsPage: 1, activeRecentReservationsPage: 1, activeConcludedReservationsPage: 1, perPage: 10, pageCount: 0,
};


class ReservationsProvider extends Component {
  static contextType = AppContext;
  state = defaultContext;

  set = (value) => {
    this.setState(()=>(value), () => {
      setContext({state: this.state});
    });
  };
  getReservations = async () => {
    const { userData } = this.context.state;
    const { activeReservationsPage, perPage } = this.state;
    return new Promise( async (resolve, reject) => {
      this.set({ loadingReservations: true });
      const res = await GetRequest(urls.bookingBase,  `${urls.v}bookings/property`);
      console.log(res.data);
    //   ?UserId=${userData.id}&Page=${activeReservationsPage}&Size=${perPage}
      this.set({ loadingReservations: false });
      if (res.isError) {
        reject(res.message);
      } else {
        const data = res.data;
        console.log(res.data)
        resolve(data);
        console.log('All Reservations ', res.data);
        this.set({ reservations: data.data});
        // , activeReservationsPage: data.page, totalReservations: data.totalItems 
      }
    });
  }
  getRecentReservations = async () => {
    const { userData, propertyTypes } = this.context.state;
    const { activeRecentReservationsPage, perPage } = this.state;
     const type = propertyTypes.find(item => item.name.toLowerCase() === 'recent');

    return new Promise( async (resolve, reject) => {
      this.set({ loadingRecentReservations: true });
      const res = await GetRequest(urls.bookingBase,
      `${urls.v}bookings/property/host/recent/reservations`);
      console.log(res.data)
     // /?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeRecentReservationsPage}&Size=${perPage}
      this.set({ loadingRecentReservations: false });
      if (res.isError) {
        reject(res.message);
      } else {
        const data = res.data;
        resolve(data);
        this.set({ recentReservations: data.data });
       // , activeRecentReservationsPage: data.page, totalRecentReservations: data.totalItems
      }
    });
  }
  getConcludedReservations = async () => {
    const { userData, propertyTypes } = this.context.state;
    const { activeConcludedReservationsPage, perPage } = this.state;
    // const type = propertyTypes.find(item => item.name.toLowerCase() === 'concluded');

    return new Promise( async (resolve, reject) => {
      this.set({ loadingConcludedReservations: true });
      const res = await GetRequest(urls.bookingBase,
      `${urls.v}bookings/property/host/concluded/reservations`);
      // /?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeConcludedReservationsPage}&Size=${perPage}
      this.set({ loadingConcludedReservations: false });
      if (res.isError) {
        reject(res.message);
      } else {
        const data = res.data;
        resolve(data);
        this.set({ concludedReservations: data.data });
        // , activeConcludedReservationsPage: data.page, totalConcludedReservations: data.totalItems
      }
    });
  }

  render() {
    const context = this.state;
    return (
      <ReservationsContext.Provider
        value={{
          state: context,
          set: (value) => {
            return this.set(value);
          },
          getState: (key)=> this.state[key],
          getReservations: () => {
            return this.getReservations();
          },
          getRecentReservations: () => {
            return this.getRecentReservations();
          },
          getConcludedReservations: () => {
            return this.getConcludedReservations();
          },
          reset: () => {
            console.log('resetting context', this.state);
            this.set(defaultContext);
            console.log('resetting context', this.state);
          },
        }}
      >
        {this.props.children}
      </ReservationsContext.Provider>
    );
  }
}

export { ReservationsProvider, ReservationsContext };
export const ReservationsConsumer = ReservationsContext.Consumer;
