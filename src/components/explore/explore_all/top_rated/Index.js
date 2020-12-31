import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, Pressable } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../../utils/Index';

import { Icon } from 'native-base';
import ScrollContent from './ScrollContent';
import ScrollContentFood from './ScrollContentFood';
import ScrollContentPhotograph from './ScrollContentPhotograph';
import ScrollContentTour from './ScrollContentTour';
import ExploreLocation from '../ExploreLocation';

import { AppContext } from '../../../../../AppProvider';

import LoginModal from '../../../../components/auth/LoginModal';
import SignUpModal from '../../../../components/auth/SignUpModal';



import colors from '../../../../colors';
class Index extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = { showRegisterModal: false, showLoginModal: false };
  }

  openLoginModal = () => {
    this.setState({ showLoginModal: true })
  }
  closeLoginModal = (bool) => {
    this.setState(() => ({ showLoginModal: false }), () => {
      // if(bool) {
      //   this.openModal();
      // }
    })
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false })
  }
  
  linkToFood = () => {
    this.props.link('three')
  }
  linkToHouse = () => {
    this.props.link('two')
  }
  linkToPhoto = () => {
    this.props.link('four')
  }
  linkToTour = () => {
    this.props.link('five')
  }

  componentDidMount = () => {

  }

  renderAuth = () => {
    const { isLoggedIn } = this.context.state
    const { textBold, textOrange, textCenter, imgStyle, textH4Style } = GStyles
    if(!isLoggedIn) {
      return (
        <View>
          <View style={{ width: '100%', paddingBottom: 30 }}>
                <View style={styles.emptyContainerStyle}>
                    <Image source={require('../../../../assets/images/auth.png')} style={imgStyle} resizeMode="contain" />
                </View>
                <MyText style={[textBold, textCenter, textOrange, textH4Style]}>Please Log in to See Top Rated</MyText>
                <View style={{ paddingHorizontal: 30, marginTop: 20}}>
                  <CustomButton buttonText="Login" textStyle={{ color: colors.orange }} onPress={this.openLoginModal}
                  buttonStyle={{ elevation: 2, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.orange}} />
                </View>
            </View>
        </View>
      )
    }
  }

  render() {
    const { contentMainContainer } = styles
    const { isLoggedIn } = this.context.state
    return (
      <Fragment>
        <ScrollView style={contentMainContainer}>
          <View>
            {this.renderAuth()}
            {isLoggedIn ? <ScrollContent heading="Top Apartments & Hotels"  {...this.props} /> : <></>}
            {/* <ScrollContentFood heading="Top Restaurants" onPress={this.linkToFood} {...this.props} />
            <ScrollContentPhotograph heading="Top Photographers" onPress={this.linkToPhoto} {...this.props} />
            <ScrollContentTour heading="Top Tour Guides" noDivider onPress={this.linkToTour} {...this.props} /> */}
            <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} openSignUp={this.openSignUpModal} close />

            <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  contentMainContainer: {
      marginTop:180,
  },
  container: {
    paddingHorizontal: 20
  },
  contentContainer: {
    paddingVertical: 30
  },
  emptyContainerStyle: {
      height: 260, width: '100%', marginBottom: 20, marginTop: 30,
  }
});

export default Index;
