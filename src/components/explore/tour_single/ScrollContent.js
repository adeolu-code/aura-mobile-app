/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText, Loading } from '../../../utils/Index';
// import GStyles from '../../../assets/styles/GeneralStyles';
import PhotoComponent from './PhotoComponent';

import { GetRequest, urls } from '../../../utils';
import { shortenXterLength, formatAmount } from '../../../helpers'
class ScrollContent extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, tours: [] };
    }
    renderLoading = () => {
        const { gettingTour, loading, loadingImages } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
    }
    getTours = async (more=false) => {
        try {
            this.setState({ loading: true })
            const { tourId } = this.props
            const res = await GetRequest(urls.experienceBase, `${urls.v}experience/get/list/?status=Adminpublished&Page=1&Size=4`);
            console.log('Res tours', res)
            this.setState({ loading: false })
            if(res.isError) {
                const message = res.Message;
                errorMessage(message)
            } else {
                const dataResult = res.data.data
                const tours = dataResult.filter(item => item.id !== tourId)
                this.setState({ tours })
            }
        } catch (error) {
            
        }
    }
    linkTo = (tour) => {
        this.props.navigation.push('Other', { screen: 'TourSingle', params: { tourId: tour.id } })
    }

    renderTours = () => {
        const { tours } = this.state;
        if(tours.length > 0) {
            return tours.map((item) => {
                let title = item.title ? item.title : ''
                title = shortenXterLength(title, 35)
                const imgUrl = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../../assets/images/no_tour.png')
                const price = `₦ ${formatAmount(item.pricePerGuest)} / person`
                const location = `${item.meetUpCity}, ${item.meetUpState}`
                return (
                    <View style={styles.scrollItemContainer} key={item.id}>
                        <PhotoComponent img={imgUrl} onPress={this.linkTo.bind(this, item)}
                        title2={title} location={location} title1={price} {...this.props} />
                    </View>
                )
            })
        }
    }

    componentDidMount = () => {
        this.getTours()
    }

  render() {
    const { scrollItemContainer, scrollContainer } = styles
    const { width } = Dimensions.get('window')

    const { photo } = this.props

    return (
        <>
            {this.renderLoading()}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
                <View style={[scrollContainer, { width: '100%' }]}>
                    {this.renderTours()}
                </View>
            </ScrollView>
        </>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%',
    },
});

export default ScrollContent;
