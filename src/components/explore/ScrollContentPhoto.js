import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText, CustomButton, Loading } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import PhotoComponent from './PhotoComponent';
import ScrollHeader from './ScrollHeader';

import { GetRequest, GOOGLE_API_KEY, urls } from '../../utils';
import { AppContext } from '../../../AppProvider';
import colors from '../../colors';


class ScrollContent extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, photographers: [] };
  }
  linkToPhotograph = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'four' })
  }

    getAddressDetails = (res) => {
        const addressComponents = res.address_components
        let countryObj = null;
        let stateObj = null
        addressComponents.filter(item => {
            const types = item.types
            const foundCountry = types.find(item => item === 'country')
            const foundState = types.find(item => item === 'administrative_area_level_1')
            if(foundCountry) {
                countryObj = item
            }
            if(foundState) {
                stateObj = item
            }
        })
        // console.log('Address Arr ', countryObj, stateObj)
        this.setState({ st: stateObj.long_name })
        this.getPhotographers(stateObj.long_name, countryObj.long_name)
    }

    
    getPhotographers = async () => {
        // const res = await GetRequest(urls.photographyBase, 
        // `${urls.v}photographer/?country=${country}&state=${st}&Size=4&Page=1`);
        try {
            this.setState({ loading: true })
            const res = await GetRequest(urls.photographyBase, 
                `${urls.v}photographer/all?Size=4&Page=1`);
            this.setState({ loading: false })
            if(res.isError) {
                const message = res.Message;
            } else {
                this.setState({ photographers: res.data.data })
            }
        } catch (error) {
            this.setState({ loading: false})
        }
        
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', paddingTop: 50 }} />); }
    }
    componentDidMount = () => {
        this.getPhotographers()
        // const { location } = this.context.state;
        // if(location) {
        //     this.getGeolocation()
        // } 
        
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.refresh !== this.props.refresh) {
            this.getPhotographers()
        }
    }

    renderPhotographers = () => {
        const { photographers } = this.state
        const { scrollItemContainer } = styles;
        if(photographers.length !== 0) {
            return (
                photographers.map((item, i) => {
                    const key = `PH_${i}`
                    const fullName = `${item.firstName} ${item.lastName}`;
                    const coverPhoto = item.coverPhoto ? {uri: item.coverPhoto} : require('../../assets/images/no_photo_img.png')
                    return (
                        <View style={scrollItemContainer} key={key}>
                            <PhotoComponent img={coverPhoto} photo={item}
                            title2="Photographer" location="Lagos" title1={fullName} {...this.props} />
                        </View>
                    )
                })
            )
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
                        <Image source={require('../../assets/images/no_photo.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={[locationContainer, { marginBottom: 20}]}>
                        <MyText style={[textH3Style, textOrange, textBold, textCenter]}>No Photographer Found</MyText>
                    </View>
                </View>
            )
        }
    }


  render() {
    const { scrollItemContainer, scrollContainer, scrollMainContainer, photoContainer, headerContainer , 
        textContainer, buttonContainer } = styles
    const { textDarkGrey, textH4Style, lineHeightText} = GStyles
    const { width } = Dimensions.get('window')

    const { photographers, loading } = this.state

    const { photo } = this.props

    return (
        <Fragment>
            <View style={photoContainer}>
                {this.renderLoading()}
                <View style={headerContainer}>
                    <ScrollHeader title="Book photographers on Aura" noDot />
                </View>
                <View style={textContainer}>
                    <MyText style={[textDarkGrey, textH4Style, lineHeightText]}>
                    Capture experiences, become a Photographer.
                    </MyText>
                </View>
                <View style={scrollMainContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
                        <View style={[scrollContainer, { width: '100%' }]}>
                            {this.renderPhotographers()}
                            {this.renderEmpty()}
                        </View>
                    </ScrollView>
                </View>
                {!loading && photographers.length !== 0 ? <View style={buttonContainer}>
                    <CustomButton buttonText="Find More Photographers" iconName="arrow-right" onPress={this.linkToPhotograph} />
                </View> : <></>}
            </View>
        
        </Fragment>
    );
  }
}
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    scrollMainContainer: {
        marginLeft: 20,
    },
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', 
        // width: '21.5%',
        width: 0.42 * `${width}`,
    },
    photoContainer: {
        paddingVertical: 20,
    },
    headerContainer: {
        paddingHorizontal: 20,
    },
    textContainer: {
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginVertical: 40,
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

export default ScrollContent;
