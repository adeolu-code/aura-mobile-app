/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../../colors";
import { CustomInput, MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { setContext, urls, GetRequest, errorMessage} from '../../utils';
import { AppContext } from '../../../AppProvider';
import MoreListings from './MorePlaces';
import { formatAmount, shortenXterLength } from '../../helpers';

class HostDetails extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
        host: null,
        house: null,
        firstName: '',
        lastName: '',
        profilePicture: null,
        location: null,
        signUpDate: '',
    };
    const { house } = props.route.params;
    this.state.house = house;
  }
 
  componentDidMount() {
    setContext(this.context);
    this.getHost();
  }

  onDecline = () => {
    this.props.onDecline(false);
  }

  renderProfileVerified = () => {
    const { house } = this.state;
    const { iconVerifiedContainer, verifiedStyle } = styles;
    if (house.isVerified) {
        return (
            <View style={{ position: 'absolute', right: 0, top: -5}}>
                <View style={iconVerifiedContainer}>
                    <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                </View>
            </View>
        )
    }
  }

  getHost = async () => {
    const { house } = this.state;
    const response = await GetRequest(urls.identityBase, `${urls.v}user/?id=${house.hostId}`);
    if (response.isError) {
        errorMessage(response.message);
      } else { 
        const data = response.data;
        const firstName = data.firstName;
        const lastName = data.lastName;
        const profilePicture = data.profilePicture;
        const location = data.location;
        const signUpDate = new Date(data.signUpDate);
        const signUpYear = signUpDate.getFullYear();
        this.setState({ host: data, firstName: firstName, lastName: lastName, profilePicture: profilePicture, location: location, signUpDate: signUpYear });
      }
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline,
      textGreen, textBold, textOrange, textExtraBold, textH1Style, textH2Style, textDarkBlue, textDarkGreen, textGrey, flexRow } = GStyles;
    const { modalHeader, closeContainer, modalContainer, 
      buttonContainer, modalBodyStyle, dashStyles, thumbStyle, thumbContainer, About, scrollItemContainer, scrollContainer, scrollMainContainer, iconVerifiedContainer, verifiedStyle  } = styles; 
    const {house} = this.state;
    return (
        <Modal visible={visible} transparent onRequestClose={() => {}} animationType="slide">
          <View style={modalContainer}>
            <View style={modalHeader} >
              <TouchableOpacity onPress={this.onDecline} style={closeContainer}>
                <Icon type="Feather" name="x" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={modalBodyStyle}>
                  <View>
                  <View style={thumbContainer}>
                                <TouchableOpacity>
                                <Image source={{uri: this.state.profilePicture}} resizeMode="cover" style={thumbStyle} />
                                </TouchableOpacity>
                                {this.renderProfileVerified()}
                            </View>
                        <MyText style={[textH1Style, textDarkBlue, textExtraBold]}>{this.state.firstName}{' '}{this.state.lastName}</MyText>
                    <MyText style={[textH5Style, {marginBottom: 20}]}>Host Since {this.state.signUpDate}</MyText>
                  </View>
                  <View style={dashStyles} />
                  <View>
                      <MyText style={[textExtraBold, textH2Style, textDarkBlue, {marginTop: 23}]}>About</MyText>
                      <MyText style={[textH5Style, textGrey, {marginTop: 20}]}>
                            Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum. Sed condimentum sed massa quis ullamcorper. Donec at scelerisque neque. Pellentesque sagittis, massa sodales sodales finibus, felis ligula tempus lorem, eu porttitor ex lacus vel felis.
                      </MyText>
                      <View style={About}>
                        <View style={[flexRow, textH5Style, textDarkBlue, {marginBottom: 15, alignItems: "center"}]}>
                            <Icon type="MaterialCommunityIcons" name="home" style={{color: colors.darkBlue}} />
                            <MyText style={{marginLeft: 10}}>From</MyText>
                            <MyText style={[textBold, {marginLeft: 5}]}>{this.state.location} State</MyText>
                        </View>
                        <View style={[flexRow, textH5Style, textDarkBlue, {alignItems: "center"}]}>
                            <Icon type="MaterialCommunityIcons" name="web" style={{color: colors.darkBlue}} />
                            <MyText style={{marginLeft: 10}}>Speaks</MyText>
                            <MyText style={[textBold, {marginLeft: 5}]}>English & French</MyText>
                        </View>
                      </View>
                  </View>
                  <View style={dashStyles} />
                  <View>
                    <MyText style={[textExtraBold, textH2Style, textDarkBlue, {marginTop: 23, marginBottom: 30}]}>Information Provided</MyText>
                    <View style={[flexRow, textH5Style, {marginBottom: 30, alignItems: "center"}]}>
                        <Icon type="MaterialCommunityIcons" name="check-circle" style={{color: colors.skyBlue}} />
                        <MyText style={{marginLeft: 10}}>Government ID</MyText>
                    </View>
                    <View style={[flexRow, textH5Style, {marginBottom: 30, alignItems: "center"}]}>
                        <Icon type="MaterialCommunityIcons" name="check-circle" style={{color: colors.skyBlue}} />
                        <MyText style={{marginLeft: 10}}>Email Address</MyText>
                    </View>
                    <View style={[flexRow, textH5Style, {marginBottom: 30, alignItems: "center"}]}>
                        <Icon type="MaterialCommunityIcons" name="check-circle" style={{color: colors.skyBlue}} />
                        <MyText style={{marginLeft: 10}}>Phone Number</MyText>
                    </View>
                  </View>
                  <View style={dashStyles} />
                  <View>
                {house ? <MoreListings {...this.props} house={house}  /> : <Fragment />}
                  </View>
                  <View style={dashStyles} />
                  <View style={[flexRow, textH5Style, {marginTop: 30, alignItems: "center", marginBottom: 30}]}>
                        <Icon type="Ionicons" name="flag" style={{color: colors.green}} />
                        <TouchableOpacity>
                            <MyText style={[textUnderline, textDarkGreen, {marginLeft: 20}]}>Report This Listing</MyText>
                        </TouchableOpacity>
                    </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, width: '100%', backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20,
    paddingVertical: 20, position: 'absolute', top: 0,zIndex: 4, width: '100%', backgroundColor: colors.white,
  },
  About: {
      marginTop: 29,
      marginBottom: 29,
      justifyContent: "space-between",
  },
  scrollItemContainer: { 
    marginRight: '1.8%', width: '21.5%'
},
scrollContainer: {
    flexDirection: 'row', marginVertical: 30,
    // borderWidth: 1
},
scrollMainContainer: {
    marginLeft: 20,
},
thumbStyle: {
    width: 56, height: 56, borderRadius: 56,
},
thumbContainer: {
    width: 60, height: 60, borderRadius: 60, marginRight: 20, borderWidth: 2,borderColor: colors.orange
},
iconVerifiedContainer: {
    width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
    justifyContent: 'center', alignItems: 'center',
},
verifiedStyle: {
    fontSize: 12, color: colors.white,
},
  closeContainer: {
    // width: 50, height: 50
  },
  modalBodyStyle: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 75,
  },
  inputContainer: {
    marginBottom: 30
  },
  buttonContainer: {
    marginTop: 30, marginBottom: 20
  },
  dashContainer: {
    flexDirection: "row", flex: 1,marginTop: 40, marginBottom: 20, alignItems: "center",justifyContent: "center",
  },
  dashStyles: {
    height: 1, backgroundColor: colors.lightGrey, flex: 1
  },
  accountStyle: {
    marginBottom: 90, marginTop: 70, alignSelf: 'center'
  },
  
  
  buttonStyle: {
    borderWidth: 1, borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    elevation: 2,
    marginTop: 20,
  },
  
//   verifiedStyle: {
//     fontSize: 12, color: colors.white
// },
// iconVerifiedContainer: {
//     width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
//     justifyContent: 'center', alignItems: 'center',
// },
});

export default HostDetails;
