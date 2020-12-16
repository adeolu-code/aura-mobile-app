import React,{ Component } from "react";
import { StatusBar, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import { WebView } from 'react-native-webview';
import { View, Icon } from "native-base";
import GStyles from "../../assets/styles/GeneralStyles";

import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';

import moment from 'moment';
import { formatAmount } from '../../helpers';
const SCREEN_HEIGHT = Dimensions.get('screen').height

class PaymentTourWebView extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, orderDetails: '', url: '',  tour: '', verified: false, cover: false };
    this.state.url = props.route.params?.url;
    this.state.tour = props.route.params?.tour
    this.state.orderDetails = props.route.params?.orderDetails
  }

  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000,elevation: 1, backgroundColor: colors.white }} />) }
  }
  renderError = () => {
    const { formErrors } = this.state
    if(formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => {
    this.cancel()
    return true;
  };
  verifyTransaction = (ref) => {
    this.setState({ loading: true, cover: true })
    const { orderDetails } = this.state
    GetRequest(urls.paymentBase, `${urls.v}pay/verify/${ref}` )
    .then((response) => {
      console.log('Verify ', response)
      if(response.isError) {
        this.setState({ error: response.message, loading: false, verified: false })
      } else {
        this.setState({ verified: true, loading: false  })
      }
      
    })
    
  }
  cancel = () => {
    return null
  }
  onNavChange = (data) => {
      // console.log('on nav change ', data)
      // const { nativeEvent } = data;
      // const apiCall = false;
      // const url = `https://checkout.paystack.com/${this.state.accessCode}`
      // if(!data.url.includes(url)) {
      //     this.verifyTransaction()
      // }
  }
  
  onLoadStart = (data) => {
      data.persist()
      const { nativeEvent } = data;
      const { orderDetails } = this.state
      console.log('On load start ', nativeEvent, orderDetails)
      const verifyUrl = `verifypayment?ref=`
      if(nativeEvent.url.includes(verifyUrl)) {
        const index = nativeEvent.url.indexOf('=')
        const ref = nativeEvent.url.slice(index+1)
        // console.log('Got here url ', nativeEvent.url)
        this.verifyTransaction(ref)
      }
  }
  renderGoBack = () => {
    const { bgStyles, iconContainer } = styles;
    const { textSuccess, textBold, textH4Style } = GStyles
    if(!this.state.verified) {
      return (
        <View>
          <CustomButton buttonText="Go Back" onPress={() => this.props.navigation.goBack() }
                      buttonStyle={{ elevation: 3, marginBottom: 20}} iconName="chevron-left" />
        </View>
      )
    }
  }
  linkToHome = () => {
    this.props.navigation.navigate('Tabs', { screen: 'Explore'})
  }

  linkToBookings = () => {
    this.props.navigation.navigate('Tabs', { screen: 'Bookings', params: { screen: 'Bookings'} })
  }

  renderBgWhite = () => {
      const { bgStyles, iconContainer, bgSuccess, bgDanger } = styles;
      const { textSuccess, textBold, textH4Style, textDanger } = GStyles
      const { cover, verified } = this.state
      if(cover) {
          return (
              <View style={bgStyles}>
                {this.renderLoading()}
                <View style={{ width: '100%', paddingHorizontal: 30, alignItems: 'center'}}>
                  <View style={[iconContainer, verified ? bgSuccess : bgDanger]}>
                    <Icon name={verified ? "checkmark" : "close"} style={{ color: colors.white, fontSize: 30 }} />
                  </View>
                  <MyText style={[textBold, textH4Style, verified ? textSuccess : textDanger, { marginVertical: 30 }]}>
                    { verified ? 'Payment was successful' : 'Verification failed'}
                  </MyText>
                  <View style={{ width: '100%'}}>
                    <CustomButton buttonText="View Bookings" textStyle={{ color: colors.orange}} onPress={this.getIdTypes} onPress={this.linkToBookings}
                      buttonStyle={{ elevation: 3, backgroundColor: colors.white,borderWidth: 1, borderColor: colors.orange, marginBottom: 20}} />
                    
                    <CustomButton buttonText="Home" onPress={this.getIdTypes} onPress={this.linkToHome}
                      buttonStyle={{ elevation: 3, marginBottom: 20}} iconName="home" />
                    {this.renderGoBack()}
                  </View>
                </View>
              </View>
          ) 
      }
  }
  

  render() {
    const { textSuccess
    } = GStyles;
  const { safeViewContainer, container, checkRow, amountRow, amountContainer } = styles
  const { set, state } = this.context

    return (
      <View style={safeViewContainer}>
        {this.renderLoading()}
        {this.renderBgWhite()}
        <Header  {...this.props} title="Complete Payment" />
        <View style={container}>
          <WebView source={{ uri: this.state.url }}
            onLoadStart={this.onLoadStart}
            onNavigationStateChange={this.onNavChange}>

          </WebView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1, backgroundColor: colors.white,
  },
  container: {
    flex: 1, paddingTop: 160, paddingHorizontal: 20
  },
  propertyContainer: {
    width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8
  },
  bgStyles: {
      position: 'absolute', top: 0, backgroundColor: 'white', width: '100%',
      height: SCREEN_HEIGHT, zIndex: 2000, justifyContent: 'center', alignItems: 'center',
  },
  iconContainer: {
    width: 60, height: 60, borderRadius: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.orange
  },
  bgSuccess: {
    backgroundColor: colors.success
  },
  bgDanger: {
    backgroundColor: colors.danger
  }
  
});

export default PaymentTourWebView;
