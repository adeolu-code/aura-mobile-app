import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';

import { Icon } from 'native-base'

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import GuestRow from '../../components/dashboard/GuestsRow';

import { GetRequest, urls, SCREEN_HEIGHT } from '../../utils'
import { formatAmount } from '../../helpers';
import moment from 'moment'

class HomeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { reservations: [], gettingReservations: false, propertyId: '', house: '', gettingHouse: false, recent: true };
        const { propertyId, recent } = props.route.params;
        this.state.propertyId = propertyId;
        this.state.recent = recent
    }
    renderLoading = () => {
        const { loading, gettingReservations, gettingHouse } = this.state;
        if (gettingReservations || gettingHouse ) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
    }
    linkToGuest = (reservation) => {
        this.props.navigation.navigate('GuestProfile', { reservation })
    }
    getReservation = async () => {
        const { propertyId, recent } = this.state
        try {
            this.setState({ gettingReservations: true })
            const res = await GetRequest(urls.bookingBase, `${urls.v}bookings/property/ByProperty/?propertyId=${propertyId}&isRecent=${recent}`);
            console.log('Reserve details ', res)
            this.setState({ gettingReservations: false })
            if(res.isError) {
                const message = res.Message;
            } else {
                const data = res.data;
                if(data !== null) {
                this.setState({ reservations: data })
                }
            }
        } catch (error) {
            this.setState({ gettingReservations: false })
        }
        
    }
    getHouse = async () => {
        const { propertyId } = this.state
        try {
            this.setState({ gettingHouse: true })
            const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/${propertyId}`);
            console.log('House Details ', res)
            this.setState({ gettingHouse: false })
            if(res.isError) {
                const message = res.Message;
            } else {
                const data = res.data;
                if(data !== null) {
                this.setState({ house: data })
                }
            }
        } catch (error) {
            this.setState({ gettingHouse: false })
        }
    }
    
    getEarliestDate = () => {
        const { reservations } = this.state
        if(reservations.length !== 0) {
            const checkInDateArr = reservations.map(item => new Date(item.check_In_Date).getTime())
            const arr = checkInDateArr.sort(function(a, b){return a-b})
            const firstItem = moment(new Date(arr[0])).format('DD/MM/YYYY')
            return firstItem
        }
        return '**/**/****'
    }
    getEarliestTime = (arrival) => {
        const { reservations } = this.state
        if(reservations.length !== 0) {
            // const hh = moment(reservations[0].arrival_Time_From, 'hh:mm').format('hh')
            // console.log('Hour ',hh)
            const arrivalTimeArr = reservations.map(item => moment(item.arrival_Time_From, 'hh:mm').format('hh'))
            const leaveTimeArr = reservations.map(item => moment(item.arrival_Time_To, 'hh:mm').format('hh'))
            let arr = []
            if(arrival) {
                arr = arrivalTimeArr.sort(function(a, b){return a-b})
            } else {
                arr = leaveTimeArr.sort(function(a, b){return b-a})
            }
            return moment(`${arr[0]}:00`, 'hh:mm').format('hh:mm a')
        }
        return 0
    }

    renderGuests = () => {
        const { reservations } = this.state
        if(reservations.length !== 0) {
            return reservations.map((item, index) => {
                const imgUrl = item.userIdentityUrl ? {uri: item.userIdentityUrl} : require('../../assets/images/profile.png')
                return (
                    <View key={index}>
                        <GuestRow name={item.guest_Name} img={imgUrl} {...this.props} onPress={this.linkToGuest.bind(this, item)} />
                        <View style={styles.divider}></View>
                    </View>
                )
            })
        }
    }
    displayAmount = () => {
        const { reservations } = this.state
        if(reservations.length !== 0) {
            return formatAmount(reservations.reduce((sum, current) => sum + current.total_Cost, 0))
        }
        return 0
    }
    componentDidMount = () => {
        this.getReservation()
        this.getHouse()
    }


  render() {
    const { contentContainer, imgContainer, titleStyle, detailsContainer,rowContainer, lowerContainer, divider } = styles;
    const { imgStyle, flexRow,upperCase, textH5Style, textLightGrey, textGrey, textH4Style, textBold, textDarkGrey,
        textRight, textH6Style, textExtraBold, textH3Style, textH2Style } = GStyles
    const { reservations, house } = this.state
    const title = house ? house.title : ''
    const address = house ? house.address : '';
    const imgUrl = house && house.mainImage ? {uri: house.mainImage.assetPath} : require('../../assets/images/no_house1.png')
    const propertyType = house ? house.propertyType.name : ''
    const roomType = house ? house.roomType.name : ''
    const reservationsCount = reservations;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <Header {...this.props} title={title} wrapperStyles={{ paddingBottom: 5, position: 'relative'}} sub={address} />
        <ScrollView>
            <View style={[contentContainer]}>
                <View style={imgContainer}>
                    <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={[flexRow, titleStyle]}>
                    <Icon name="information-circle" style={{ marginRight: 5, color: colors.grey, fontSize: 20}} />
                    <MyText style={[upperCase, textH5Style]}>Reservation Details</MyText>
                </View>

                <View style={detailsContainer}>
                    <View style={[flexRow, rowContainer]}>
                        <View>
                            <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Property Category</MyText>
                            <MyText  style={[textH4Style, textBold]}>{propertyType}</MyText>
                        </View>
                        <View>
                            <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Start Date</MyText>
                            <MyText style={[textH4Style, textBold]}>{this.getEarliestDate()}</MyText>
                        </View>
                    </View>

                    <View style={[flexRow, rowContainer]}>
                        <View>
                            <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Property Type</MyText>
                            <MyText  style={[textH4Style, textBold]}>{roomType}</MyText>
                        </View>
                        <View>
                            <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Time</MyText>
                            <MyText style={[textH4Style, textBold]}>{this.getEarliestTime(true)} - {this.getEarliestTime(false)}</MyText>
                        </View>
                    </View>

                    <View style={[flexRow, rowContainer]}>
                        <View>
                            <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Reservation</MyText>
                            <MyText  style={[textH4Style, textBold]}>{reservations.length} Reservations</MyText>
                        </View>
                        <View>
                            <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                            <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦ </MyText>{this.displayAmount()}</MyText>
                        </View>
                    </View>
                </View>
            </View>

            <View style={lowerContainer}>
                <MyText style={[textH2Style, textExtraBold, textDarkGrey, { marginBottom: 25}]}>Guests</MyText>
                {this.renderGuests()}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    contentContainer: {
        // paddingTop: 150,
        paddingTop: 15,
        paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 4, paddingBottom: 20
    },
    imgContainer: {
        width: '100%', height: 220, borderRadius: 8, overflow: 'hidden',backgroundColor: colors.lightGrey, borderWidth: 1,
        borderColor: colors.lightGrey
    },
    titleStyle: {
        marginTop: 20, marginBottom: 30, paddingVertical:8, borderBottomColor: colors.lightGrey, borderBottomWidth: 1
    },
    rowContainer: {
        paddingBottom: 25, justifyContent: 'space-between'
    },
    lowerContainer: {
        paddingHorizontal: 20, paddingVertical: 20
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    }
});

export default HomeDetails;
