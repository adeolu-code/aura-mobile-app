/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext } from '../../../AppProvider';
import { urls, GetRequest, errorMessage } from '../../utils';

import TransactionRow from '../../components/dashboard/TransactionRow';


import { formatAmount } from '../../helpers'
import EditBankModal from '../../components/dashboard/EditBankModal';

class Earnings extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      weeklyEarnings: 0,
      totalEarnings: 0,
      error: false,
      gettingEarnings: false, gettingBankAccount: false, gettingTransactions: false, bankDetails: null, edit: false,
      transactions: [], showModal: false, 
    };
  }
  openModal = (bool) => {
    bool ? this.setState({ edit: true }) : this.setState({ edit: false })
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  componentDidMount() {
    this.getEarnings();
    this.getBankAccount();
    this.getTransactions()
    
  }
  linkToTransactions = () => {
    this.props.navigation.navigate('TransactionsHistory')
  }
  loading = () => {
    return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />);
  }
  renderEarningsLoading = () => {
      const { gettingEarnings } = this.state;
      if (gettingEarnings ) { this.loading() }
  }
  renderBankDetailsLoading = () => {
      const { gettingBankAccount} = this.state;
      if (gettingBankAccount ) { return this.loading() }
  }
  renderTransactionsLoading = () => {
    const { gettingTransactions } = this.state;
      if (gettingTransactions ) { this.loading() }
  }

  


  getEarnings = async () => {
    this.setState({ gettingEarnings: true })
    const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/experience/host/earnings`);
    this.setState({ gettingEarnings: false })
    console.log('Earnings ', response)
    if (response.isError) {
      errorMessage(response.message)
    } else {  
      const data = response.data;
      
      const weekly = data.weeklyEarnings;
      const total = data.totalEarnings;
      this.setState({ weeklyEarnings: weekly, totalEarnings: total});
    }
  }

  getBankAccount = async () => {
    const { userData } = this.context.state
    this.setState({ gettingBankAccount: true })
    const response = await GetRequest(urls.identityBase, `${urls.v}user/bankaccount?userId=${userData.id}`);
    this.setState({ gettingBankAccount: false })
    console.log('Account ', response)
    if (response.isError) {
      errorMessage(response.message)
    } else {  
      const data = response.data;
      this.setState({ bankDetails: data});
    }
  }

  getTransactions = async () => {
    const { userData } = this.context.state
    this.setState({ gettingTransactions: true })
    const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/property?hostId=${userData.id}&Page=1&pageSize=5`);
    this.setState({ gettingTransactions: false })
    console.log('Transactions ', response)
    if (response.isError) {
      errorMessage(response.message)
    } else {  
      const data = response.data;
      this.setState({ transactions: data.data});
    }
  }

  renderTransactions = () => {
    const { transactions } = this.state
    if(transactions.length !== 0) {
      return transactions.map((item, index) => {
        return (
          <TransactionRow key={item.id} transaction={item} />
        )
      })
    }
  }

  renderEmptyTransactions = () => {
    const { transactions, gettingTransactions } = this.state
    const { emptyContainerStyle } = styles;
    const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
    if(transactions.length === 0 && !gettingTransactions) {
      return (
        <View>
            <View style={emptyContainerStyle}>
                <Image source={require('../../assets/images/photo/undraw.png')} style={imgStyle} resizeMode="contain" />
            </View>
            <MyText style={[textBold, textCenter, textOrange, textH4Style]}>No Transactions</MyText>
        </View>
      )
    }
  }

  renderBankAccount = () => {
    const { bankDetails } = this.state
    const { bankButtonStyle,accountRow, wrapper } = styles;
    const { textBold, textH4Style, flexRow, textOrange, textH2Style, textExtraBold, textDarkGrey } = GStyles;
    if(bankDetails) {
      return (
        <View>
          
          <View style={[flexRow, accountRow]}>
            <MyText style={[textH4Style, textBold]}>Account Name: </MyText>
            <MyText style={[textH4Style]}>{bankDetails.accountName}</MyText>
          </View>

          <View style={[flexRow, accountRow]}>
            <MyText style={[textH4Style, textBold]}>Account Number: </MyText>
            <MyText style={[textH4Style]}>{bankDetails.accountNumber}</MyText>
          </View>
          <View style={[flexRow, accountRow]}>
            <MyText style={[textH4Style, textBold]}>Bank: </MyText>
            <MyText style={[textH4Style]}>{bankDetails.bank.name}</MyText>
          </View>
          <TouchableOpacity style={bankButtonStyle} onPress={this.openModal.bind(this, true)}>
            <MyText style={[textOrange, textH4Style]}>Edit Bank Details</MyText>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderNoAccount = () => {
    const { bankDetails, gettingBankAccount } = this.state
    const { bankButtonStyle,accountRow, wrapper } = styles;
    const { textBold, textH4Style, flexRow, textOrange, textH2Style, textExtraBold, textDarkGrey } = GStyles;
    if(!bankDetails && !gettingBankAccount) {
      return (
        <View>
          <View style={[flexRow, accountRow]}>
            <MyText style={[textH4Style, textBold, textOrange]}>No Bank Details Yet </MyText>
          </View>
          <TouchableOpacity style={bankButtonStyle} onPress={this.openModal.bind(this, false)}>
            <MyText style={[textOrange, textH4Style]}>Add Bank Details</MyText>
          </TouchableOpacity>
        </View>
      )
    }
  }

  refresh = (data) => {
    this.setState({ bankDetails: data })
  }
 


  render() {
    const { subHeaderContainer, profileContainer, walletContainer, profileText, firstRow, contentHeader, bankButtonStyle,
      secondRow, viewContainer, walletImgContainer, contentContainer, noBorderBottom, accountRow, wrapper } = styles;
    const { textBold, textH4Style, flexRow, imgStyle, textGrey, textWhite, textOrange, textUnderline, textGreen,
      textH5Style, textDarkGreen, textH2Style, textExtraBold, textDarkGrey } = GStyles;
    const { weeklyEarnings, totalEarnings, transactions } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <Header {...this.props} title="Tour Earnings" sub="Total Earnings, Monthly and Weekly Including Transaction History" />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={subHeaderContainer}>

            <View style={walletContainer}>
              <View style={[flexRow, firstRow]}>
                <View style={walletImgContainer}>
                  <Image source={require('../../assets/images/icons/wallet/wallet.png')} resizeMode="contain" style={imgStyle} />
                </View>
              </View>
              <View style={[flexRow, secondRow]}>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Weekly Earnings</MyText>
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {weeklyEarnings ? formatAmount(weeklyEarnings) : 0}</MyText>
                </View>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Total Earnings</MyText>
                <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {totalEarnings ? formatAmount(totalEarnings) : 0}</MyText>
                </View>
              </View>
            </View> 

            <View style={[walletContainer, { borderWidth: 0}]}>
              <View style={[flexRow, firstRow, { marginBottom: 30}]}>
                <View style={walletImgContainer}>
                  <Image source={require('../../assets/images/icons/wallet/wallet.png')} resizeMode="contain" style={imgStyle} />
                </View>
              </View>
              <View style={[flexRow, secondRow ]}>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Total Disbursement</MyText>
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {totalEarnings ? formatAmount(totalEarnings) : 0}</MyText>
                </View>
                {/* <TouchableOpacity style={viewContainer}>
                  <MyText style={[textH5Style, textWhite, textBold]}>Generate Statement</MyText>
                </TouchableOpacity> */}
              </View>
              
            </View>

          </View>

          <View style={wrapper}>
            {this.renderBankDetailsLoading()}
            <View style={contentContainer}>
              <View style={[flexRow, contentHeader, { marginBottom: 0 }]}>
                <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Bank Details</MyText>
              </View> 
              {this.renderBankAccount()}
              {this.renderNoAccount()}
            </View>

          </View>

          {/* <View style={wrapper}>
            {this.renderTransactionsLoading()}
            <View style={[contentContainer, { borderBottomWidth: 0 }]}> 
              <View style={[flexRow, contentHeader, { marginBottom: 0 }]}>
                <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Transactions History</MyText>
                {transactions.length !== 0 ? <TouchableOpacity onPress={this.linkToTransactions}>
                  <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
                </TouchableOpacity> : <></>}
              </View>

              {this.renderTransactions()}
              {this.renderEmptyTransactions()}

            </View>


          </View> */}
          <EditBankModal visible={this.state.showModal} onDecline={this.closeModal} bankDetails={this.state.bankDetails} 
          refresh={this.refresh} edit={this.state.edit} />

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subHeaderContainer: {
    paddingTop: Platform.OS === 'ios' ? 120 : 150, backgroundColor: colors.white, paddingBottom: 30,
    paddingHorizontal: 20, borderBottomWidth: 4, borderBottomColor: colors.lightGrey
  },
  imgContainer: {
    width: 55, height: 55, borderRadius: 60, overflow:'hidden'
  },
  profileImg: {
    flex: 1, 
    // borderWidth: 1
  },
  profileText: {
    flex: 4, flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 2,
    // borderWidth: 1, 
  },
  walletContainer: {
    backgroundColor: colors.lightGreen, borderRadius: 8, marginTop: 30, paddingVertical: 20, paddingHorizontal: 25, elevation: 2
  },
  firstRow: {
    justifyContent: 'space-between', marginBottom: 30
  },
  secondRow: {
    justifyContent: 'space-between'
  },
  walletImgContainer: {
    width: 40, height: 40, borderRadius: 40, backgroundColor: colors.fadedGreen,
    padding: 8
  },
  viewContainer: {
    backgroundColor: colors.green, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 6, justifyContent: 'center'
  },
  contentContainer: {
    paddingHorizontal: 20, paddingVertical: 25, backgroundColor: colors.white, borderBottomWidth: 4, borderBottomColor: colors.lightGrey

  },
  contentHeader: {
    marginBottom: 30, justifyContent: 'space-between', alignItems: 'flex-end'
  },
  rowContainer: {
    marginBottom: 20,
  },
  divider: {
    height: 1, width: '100%', backgroundColor: colors.lightGrey,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  reservation: {
    width: '100%',
    paddingHorizontal: 20,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },
  wrapper: {
    minHeight: 200
  },
  accountRow: {
    marginTop: 15, flexWrap: 'wrap'
  },
  bankButtonStyle: {
    borderWidth: 1, borderColor: colors.orange, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 6,
    marginTop: 20, flex: 1, alignSelf: 'flex-start'
  },
  emptyContainerStyle: {
      height: 200, width: '100%', marginBottom: 20
  }
});

export default Earnings;
