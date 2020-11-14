/* eslint-disable prettier/prettier */
import React, { Component} from 'react';
import { setContext, GetRequest, urls } from './src/utils';

import { AppContext } from './AppProvider';

const ReservationsContext = React.createContext({});

const defaultContext = {
  loadingReservations: false, loadingRecentReservations: false, loadingConcludedReservations: false,
  reservations: [], recentReservations: [], concludedReservations: [], totalReservations: 0, totalRecentReservations: [], totalConcludedReservations: 0,
  activeReservationsPage: 1, activeRecentReservationsPage: 1, activeConcludedReservationsPage: 1, perPage: 10, pageRecentCount: 0, pageConcludedCount: 0, loadMoreConcluded: false, loadMoreRecent: false
};


class ReservationsProvider extends Component {
  static contextType = AppContext;
  state = defaultContext;

  set = (value) => {
    this.setState(()=>(value), () => {
      setContext({state: this.state});
    });
  };
  getRecentReservations = async (more) => {
    const { userData } = this.context.state;
    const { activeRecentReservationsPage, perPage, recentReservations } = this.state;
    more ? this.set({ loadMoreRecent: true }) : this.set({ loadingRecentReservations: true })

    return new Promise( async (resolve, reject) => {
      this.set({ loadingRecentReservations: true });
      const res = await GetRequest(urls.bookingBase,
      `${urls.v}bookings/property/host/recent/reservations/?UserId=${userData.id}&Page=${activeRecentReservationsPage}&Size=${perPage}`);
      more ? this.set({ loadMoreRecent: false }) : this.set({ loadingRecentReservations: false });
      console.log(res.data)
      if (res.isError) {
        reject(res.message);
      } else {
        const response = res.data;
        resolve(response);
        const dataResult = response.data;
        let data = [];
        if (more) {
          data = [ ...recentReservations, ...dataResult ]
        } else {
          data = dataResult;
        }
        const pageRecentCount =  Math.ceil(response.totalItems / perPage)
        this.set({ recentReservations: data.data, activeRecentReservationsPage: data.page, totalRecentReservations: data.totalItems, pageRecentCount });
      }
    });
  }
  getConcludedReservations = async (more) => {
    const { userData} = this.context.state;
    const { activeConcludedReservationsPage, perPage, concludedReservations } = this.state;

    return new Promise( async (resolve, reject) => {
      this.set({ loadingConcludedReservations: true });
      const res = await GetRequest(urls.bookingBase,
      `${urls.v}bookings/property/host/concluded/reservations/?UserId=${userData.id}&Page=${activeConcludedReservationsPage}&Size=${perPage}`);
      more ? this.set({ loadMoreConcluded: false }) : this.set({ loadingConcludedReservations: false });
      if (res.isError) {
        reject(res.message);
      } else {
        const response = res.data;
        resolve(response);
        const dataResult = response.data;
        let data = [];
        if (more) {
          data = [ ...concludedReservations, ...dataResult ]
        } else {
          data = dataResult;
        }
        const pageConcludedCount =  Math.ceil(response.totalItems / perPage)
        this.set({ concludedReservations: data.data, activeConcludedReservationsPage: data.page, totalConcludedReservations: data.totalItems, pageConcludedCount});
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
