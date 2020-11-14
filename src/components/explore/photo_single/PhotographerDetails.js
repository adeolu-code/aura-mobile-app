import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import StarComponent from '../../../components/StarComponent';

class PhotographerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        images: [{ source: require('../../../assets/images/photo/pic.png'),
            dimensions: { width: 120, height: 150 }
        },  { source: require('../../../assets/images/photo/pic5.png'),
            dimensions: { width: 200, height: 510 }
        }]
    };
  }

  renderVerified = () => {
      const { photo } = this.props;
      if(photo && photo.isVerified) {
          return (
            <View style={{ position: 'absolute', right: 0, top: -5}}>
                <View style={styles.iconVerifiedContainer}>
                    <Icon name="check" type="FontAwesome5" style={styles.verifiedStyle} />
                </View>
            </View>
          )
      }
  }

  render() {
    const { container, thumbContainer, thumbTxtContainer, divider, iconVerifiedContainer, 
        verifiedStyle, thumbStyle, iconStyle, contentContainer } = styles;
    const { flexRow, imgStyle, textExtraBold, textH3Style, textH4Style, textGrey, textH5Style, 
        textBold } = GStyles
    const { photo } = this.props
    const fullName = photo ? `${photo.firstName} ${photo.lastName}` : '****'
    const imgUrl = photo && photo.coverPhoto ? {uri: photo.coverPhoto} : require('../../../assets/images/profile.png');
    const description = photo ? photo.description : '****'
    return (
      <View style={container}>
        
        
        <View style={[flexRow, thumbTxtContainer]}>
            <View style={thumbContainer}>
                <Image source={imgUrl} resizeMode="cover" style={thumbStyle} />
                {this.renderVerified()}
            </View>
            <View>
                <MyText style={[textH3Style, { marginBottom: 5}]}>{fullName}</MyText>
                <StarComponent />
            </View>
        </View>

        <View>
            <MyText style={[textGrey, textH4Style]}>{description}</MyText>
        </View>

        {/* <View style={[flexRow, contentContainer]}>
            <View>
                <Icon type="MaterialIcons" name="schedule" style={iconStyle} />
                <MyText style={[textGrey, textH5Style, { marginBottom:5}]}>Duration Of Tour</MyText>
                <MyText style={[textH4Style]}>2 Hours</MyText>
            </View>
            <View>
                <Icon type="MaterialIcons" name="people-alt" style={iconStyle} />
                <MyText style={[textGrey, textH5Style, { marginBottom:5}]}>People Size</MyText>
                <MyText style={[textH4Style]}>Up To 4 People</MyText>
            </View>
            <View>
                <Icon type="MaterialIcons" name="assignment" style={iconStyle} />
                <MyText style={[textGrey, textH5Style, { marginBottom:5}]}>Equipment</MyText>
                <MyText style={[textH4Style]}>Camera</MyText>
            </View>
        </View> */}
        
        
        {/* <View style={divider}></View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, paddingVertical: 30
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    thumbTxtContainer: {
        paddingBottom: 15, alignItems:'center'
    },
    iconStyle: {
        fontSize: 25, marginBottom: 5
    },
    contentContainer: {
        justifyContent: 'space-between', paddingVertical: 30
    }
});

export default PhotographerDetails;
