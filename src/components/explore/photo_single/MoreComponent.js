import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import ScrollContent from './ScrollContent';


import { MyText, CustomButton, Loading } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import { urls, GetRequest } from '../../../utils';

class MoreComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, photographers:[] };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { 
            return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); 
        }
    }
    getPhotographers = async () => {
        const { photo } = this.props
        this.setState({ loading: true })
        const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/all?Size=5&Page=1`);
        this.setState({ loading: false })
        if(res.isError) {
            const message = res.Message;
        } else {
            const data = res.data.data

            const photographers = data.filter(item => item.id !== photo.id)
            this.setState({ photographers })
        }
    }
    renderEmpty = () => {
        const { photographers, loading } = this.state
        const { emptyStyles, locationContainer } = styles;
        const { imgStyle, textOrange, textH3Style, textBold, textCenter } = GStyles
        if(photographers.length === 0 && !loading) {
            
            return (
                <View>
                    <View style={[emptyStyles]}>
                        <Image source={require('../../../assets/images/no_photo.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={[locationContainer, { marginBottom: 20}]}>
                        <MyText style={[textH3Style, textOrange, textBold, textCenter]}>No Photographers Found</MyText>
                    </View>
                </View>
            )
        }
    }

    renderPhotograghers = () => {
        const { photographers } = this.state
        if(photographers.length !== 0) {
            return (
                <ScrollContent photographers={photographers} {...this.props} />
            )
        }
    }

    componentDidMount = () => {
        this.getPhotographers()
    }

  render() {
    const {  contentContainer, divider, container, headerStyle, iconStyle, iconContainer, itemRow, textContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>More Photographers Around You</MyText>
            </View>
            <View style={contentContainer}>
                {this.renderEmpty()}
                {this.renderPhotograghers()}
                
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
        width: '100%'
    },
    headerStyle: {
        marginTop: 25, marginBottom: 5
    },
    contentContainer: {
        paddingBottom: 10
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGreyTwo,
        // marginVertical: 30
    },
    iconContainer: {
        borderWidth: 1, borderColor: colors.white, borderRadius: 30, width: 35, height: 35, 
        justifyContent: 'center', alignItems: 'center', marginRight: 20
    },
    iconStyle: {
        fontSize: 20, color: colors.white
    },
    itemRow: {
        marginBottom: 30, alignItems: 'center'
    },
    textContainer: {
        paddingBottom: 30
    },
    emptyStyles: {
        width: '100%', height: 200,
        marginTop: -40, marginBottom: 20
    },
    locationStyle: {
        borderWidth: 1, borderColor: colors.orange, borderRadius: 8, justifyContent: 'center', alignItems: 'center',
        padding: 12, marginTop: 20, marginBottom:30
    },
    locationContainer: {
        paddingHorizontal: 30
    }
    
});

export default MoreComponent;
