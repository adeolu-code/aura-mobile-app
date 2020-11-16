/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { MyText, Loading, Spinner } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext } from '../../../AppProvider';
import { urls, GetRequest, errorMessage } from '../../utils';

import TransactionRow from '../../components/dashboard/TransactionRow';

import { formatAmount } from '../../helpers'

class TransactionsHistory extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      transactions: [], 
      gettingTransactions: false, activePage: 1, pageSize: 10, totalItems: 0, pageCount: 0, loadMore: false
    };
  }

  componentDidMount() {
    this.getTransactions()
  }
  
  renderLoading = () => {
    const { gettingTransactions } = this.state;
    if (gettingTransactions ) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }
  renderLoadMore = () => {
      const { loadMore } = this.state
      const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles
      if(loadMore) {
          return (
          <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
              <Spinner size={20} color={colors.orange} />
              <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
          </View>
          )
      }
  }
  onEndReached = () => {
    const { pageCount, activePage, loadMore } = this.state
    if(activePage < pageCount && !loadMore) {
        this.setState(()=>({ activePage: this.state.activePage + 1}), 
        () => {
            this.getTransactions(true)
        })
    }
    console.log('End reached')
  }

  renderItem = ({ item, index }) => {
    const { transactions } = this.state
    const { noBorderBottom } = styles
    return (
        <View>
            <TransactionRow transaction={item} wrapperStyle={[transactions.length === index+1 ? noBorderBottom : '']}/>
        </View>
    )
  }

  getTransactions = async (more=false) => {
    const { userData } = this.context.state
    const { transactions, activePage, pageSize } = this.state
    
    more ? this.setState({ loadMore: true }) : this.setState({ gettingTransactions: true })
    const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/property?hostId=${userData.id}&Page=${activePage}&pageSize=${pageSize}`);
    more ? this.setState({ loadMore: false }) : this.setState({ gettingTransactions: false })
    if (response.isError) {
      errorMessage(response.message)
    } else {  
      const dataResult = response.data.data
      let data = []
      if(more) {
          data = [...transactions, ...dataResult]
      } else {
          data = dataResult
      }
      const pageCount =  Math.ceil(response.data.totalItems / pageSize)
      this.setState({ transactions: data, activePage: response.data.page, 
        totalItems: response.data.totalItems, pageSize: response.data.pageSize, pageCount });
    }
  }

  renderEmptyContainer = () => {
      const { emptyContainerStyle } = styles;
      const { transactions, gettingTransactions } = this.state
      const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
      if(transactions.length === 0 && !gettingTransactions) {
          return (
              <View style={{ flex: 1, paddingVertical: 60}}>
                  <View style={emptyContainerStyle}>
                      <Image source={require('../../assets/images/photo/undraw.png')} style={imgStyle} resizeMode="contain" />
                  </View>
                  <MyText style={[textBold, textCenter, textOrange, textH4Style]}>You have no transactions</MyText>
              </View>
          )
      }
  }
 


  render() {
    const { subHeaderContainer,  contentContainer, wrapper } = styles;
    const { textBold, } = GStyles;

    const { transactions } = this.state
    return (
      <SafeAreaView style={{ flex: 1}}>
        {this.renderLoading()}
        <Header {...this.props} title="Transactions History" />
        <View style={subHeaderContainer}>
            
              
              <View style={[contentContainer, { borderBottomWidth: 0 }]}> 

                <FlatList
                  ListFooterComponent={
                    <>
                      {this.renderLoadMore()}
                    </>
                  }
                  ListEmptyComponent={this.renderEmptyContainer()}
                  ListFooterComponentStyle={{ marginBottom: 40}}
                  ListHeaderComponentStyle={{ marginBottom: 20}}
                  data={transactions}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.id}
                  onEndReached={this.onEndReached}
                  onEndReachedThreshold={0.8}
                  // extraData={selectedId}
                />

              </View>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subHeaderContainer: {
    paddingTop: 110, backgroundColor: colors.white, paddingBottom: 30, flex: 1
  },
  contentContainer: {
    paddingHorizontal: 20,

  },
  contentHeader: {
    marginBottom: 30, justifyContent: 'space-between', alignItems: 'flex-end'
  },
  
  
  wrapper: {
    minHeight: 200
  },
  accountRow: {
    marginTop: 15
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  emptyContainerStyle: {
    height: 200, width: '100%', marginBottom: 20
}
});

export default TransactionsHistory;
