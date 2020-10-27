import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText, CustomButton, Loading } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import PhotoComponent from './PhotoComponent';
import ScrollHeader from './ScrollHeader';

import { GetRequest, GOOGLE_API_KEY, urls } from '../../utils';
import { AppContext } from '../../../AppProvider';

class ScrollContent extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, photographers: [] };
  }
  linkToPhotograph = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'four' })
  }

    getGeolocation = async () => {
        const { location } = this.context.state
        this.setState({ loading: true })
        const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`)
        this.getAddressDetails(res.results[0])
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
    getPhotographers = async (st, country) => {
        const res = await GetRequest(urls.photographyBase, 
        `api/v1/photographer/?country=${country}&state=${st}&Size=4&Page=1`);
        // console.log('Photographers ', res)
        this.setState({ loading: false })
        if(res.isError) {
            const message = res.Message;
        } else {
            this.setState({ photographers: res.data })
        }
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', paddingTop: 50 }} />); }
    }
    componentDidMount = () => {
        const { location } = this.context.state;
        if(location) {
            this.getGeolocation()
        } 
        
    }


  render() {
    const { scrollItemContainer, scrollContainer, scrollMainContainer, photoContainer, headerContainer , 
        textContainer, buttonContainer } = styles
    const { textDarkGrey, textH4Style, lineHeightText} = GStyles
    const { width } = Dimensions.get('window')

    const { photo } = this.props

    // const actualWidth = (20/width) * 100
    return (
        <Fragment>
            <View style={photoContainer}>
                {this.renderLoading()}
                <View style={headerContainer}>
                    <ScrollHeader title="Book photographers on Aura" noDot />
                </View>
                <View style={textContainer}>
                    <MyText style={[textDarkGrey, textH4Style, lineHeightText]}>
                        Curabitur vulputate arcu odio, ac facilisis diam accumsan ut.
                        Ut imperdiet et leo in vulputate.
                    </MyText>
                </View>
                <View style={scrollMainContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
                        <View style={[scrollContainer, { width: '100%' }]}>
                            <View style={scrollItemContainer}>
                                <PhotoComponent img={require('../../assets/images/photo/photo.png')} 
                                title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                            </View>
                            <View style={scrollItemContainer}>
                                <PhotoComponent img={require('../../assets/images/photo/photo1.png')} 
                                title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                            </View>
                            <View style={scrollItemContainer}>
                                <PhotoComponent img={require('../../assets/images/photo/photo3.png')} 
                                    title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                            </View>
                            <View style={scrollItemContainer}>
                                <PhotoComponent img={require('../../assets/images/photo/photo4.png')} 
                                    title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                            </View>
                        </View>
                    </ScrollView>
                    {/* <ScrollContentPhoto {...this.props} /> */}
                </View>
                <View style={buttonContainer}>
                    <CustomButton buttonText="Find More Photographers" iconName="arrow-right" onPress={this.linkToPhotograph} />
                </View>
            </View>
        
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
                <View style={[scrollContainer, { width: '100%' }]}>
                    <View style={scrollItemContainer}>
                        <PhotoComponent img={require('../../assets/images/photo/photo.png')} 
                        title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                    </View>
                    <View style={scrollItemContainer}>
                        <PhotoComponent img={require('../../assets/images/photo/photo1.png')} 
                        title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                    </View>
                    <View style={scrollItemContainer}>
                        <PhotoComponent img={require('../../assets/images/photo/photo3.png')} 
                            title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                    </View>
                    <View style={scrollItemContainer}>
                        <PhotoComponent img={require('../../assets/images/photo/photo4.png')} 
                            title2="Photographer" location="Lagos" title1="Daniel Ubake" {...this.props} />
                    </View>
                </View>
            </ScrollView> */}
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
    scrollMainContainer: {
        marginLeft: 20,
    },
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%'
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
      
});

export default ScrollContent;
