/* eslint-disable prettier/prettier */
import React, { Component} from 'react';
import { setContext, GetRequest, urls } from './src/utils';

import { AppContext } from './AppProvider';

const ReviewsContext = React.createContext({});

const defaultContext = {
  loadingReviews: false, loadingRatings: false,
  ratings: [], reviews: [], 
};


class ReviewsProvider extends Component {
  static contextType = AppContext;
  state = defaultContext;

  set = (value) => {
    this.setState(()=>(value), () => {
      setContext({state: this.state});
    });
  };

  getReviews = async (more) => {
    return new Promise( async (resolve, reject) => {
      this.set({ loadingReviews: true });
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/review/comment/host`);
      this.set({ loadingReviews: false })
      console.log('reviews ',res)
      if (res.isError || res.IsError) {
        reject(res.message);
      } else {
        resolve(res);
        const dataResult = res.data;
        this.set({ reviews: dataResult });
      }
    });
  }

  getRatings = async () => {
    return new Promise( async (resolve, reject) => {
      this.set({ loadingRatings: true });
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/review/rating/host`);
      this.set({ loadingRatings: false })
      console.log('Ratings',res)
      if (res.isError || res.IsError) {
        reject(res.message);
      } else {
        resolve(res);
        const dataResult = res.data;
        this.set({ ratings: dataResult });
      }
    });
  }

  render() {
    const context = this.state;
    return (
      <ReviewsContext.Provider
        value={{
          state: context,
          set: (value) => {
            return this.set(value);
          },
          getState: (key)=> this.state[key],
          getReviews: () => {
            return this.getReviews();
          },
          getRatings: () => {
            return this.getRatings();
          },
          reset: () => {
            console.log('resetting context', this.state);
            this.set(defaultContext);
            console.log('resetting context', this.state);
          },
        }}
      >
        {this.props.children}
      </ReviewsContext.Provider>
    );
  }
}

export { ReviewsProvider, ReviewsContext };
export const ReviewsConsumer = ReviewsContext.Consumer;
