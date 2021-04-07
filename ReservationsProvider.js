/* eslint-disable prettier/prettier */
import React, { Component} from 'react';
import { setContext, GetRequest, urls } from './src/utils';

import { AppContext } from './AppProvider';

const ReservationsContext = React.createContext({});

const defaultContext = {
  loadingReservations: false, loadingConReservations: false,
  reservations: [], concludedReservations: [], 
  totalReservations: 0, totalConReservations: 0,
  reservationsPage: 1, concludedReservationsPage: 1,
  perPage: 10, pageCountReservations: 0, 
  pageCountConcluded: 0, 
  loadMoreConcluded: false, loadMoreReservations: false,
};


class ReservationsProvider extends Component {
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
    // });
  };
  getRecentReservations = async (more) => {
    const { userData } = this.context.state;
    const { reservationsPage, perPage, reservations } = this.state;
    more ? this.set({ loadMoreReservations: true }) : this.set({ loadingReservations: true })

    return new Promise( async (resolve, reject) => {
      this.set({ loadingReservations: true });
      try {
        const res = await GetRequest(urls.bookingBase,
        `${urls.v}bookings/property/host/recent/reservations/?Page=${reservationsPage}&Size=${perPage}`);
  
        more ? this.set({ loadMoreReservations: false }) : this.set({ loadingReservations: false });
        console.log('Recent reservations ',res)
        if (res.isError) {
          reject(res.message);
        } else {
          resolve(res);
          const dataResult = res.data;
          let data = [];
          if (more) {
            data = [ ...reservations, ...dataResult ]
          } else {
            data = dataResult;
          }
          const pageCountReservations =  Math.ceil(res.totalItems / perPage)
          this.set({ reservations: data, reservationsPage: res.page, totalReservations: res.totalItems, pageCountReservations });
        }
      } catch (error) {
        reject(error)
      }
    });
  }
  getConcludedReservations = async (more) => {
    const { userData} = this.context.state;
    const { concludedReservationsPage, perPage, concludedReservations } = this.state;

    return new Promise( async (resolve, reject) => {
      try {
        this.set({ loadingConReservations: true });
        const res = await GetRequest(urls.bookingBase,
        `${urls.v}bookings/property/host/concluded/reservations/?Page=${concludedReservationsPage}&Size=${perPage}`);
        more ? this.set({ loadMoreConcluded: false }) : this.set({ loadingConReservations: false });
        if (res.isError) {
          reject(res.message);
        } else {
          resolve(res);
          const dataResult = res.data;
          let data = [];
          if (more) {
            data = [ ...concludedReservations, ...dataResult ]
          } else {
            data = dataResult;
          }
          const pageConcludedCount =  Math.ceil(res.totalItems / perPage)
          this.set({ concludedReservations: data, concludedReservationsPage: res.page, totalConReservations: res.totalItems, pageConcludedCount});
        }
      } catch (error) {
        reject(error)
      }
      
    });
  }

  render() {
    const context = this.state;
    return (
      <ReservationsContext.Provider
        value={{
          state: context,
          set: (value, callBack) => {
            return this.set(value, callBack);
          },
          getState: (key)=> this.state[key],
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
