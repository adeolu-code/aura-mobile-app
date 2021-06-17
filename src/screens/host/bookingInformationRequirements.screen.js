import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, FlatList } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText, CheckBox, CustomButton, CustomInput, Loading } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";

import { urls, Request, GetRequest, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider'

export default class BookingInformationRequirements extends Component {
    static contextType = AppContext
    constructor() {
        super();

        this.state = { bookingReqValues: [], bookingReqs: [], gettingBookingReq: false, toggleAddBookingReq: false,
        addInfoValue: '', addingInfo: false, loading: false, gettingHouse: false };
        this.scrollViewRef = React.createRef();
    }
    guestProvisionList = [
        "Agree to your House Rules",
        "Message you about their trip",
        "Let you know how many guests are coming over",
        "Confirm their check-in time if they are arriving withing 2 days"
    ];

    auraProvisionList = [
        "Government issued submitted to Aura",
        "Recommendation by other host with no negative feedbacks",
    ];
    renderLoading = () => {
        const { loading, gettingHouse } = this.state;
        if (loading || gettingHouse) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
    }

    getBookingReq = async () => {
        try {
            this.setState({ gettingBookingReq: true })
            const res = await GetRequest(urls.listingBase, `${urls.v}listing/bookingrequirement`);
            this.setState({ gettingBookingReq: false})
            if(res.IsError || res.isError) {
                console.log(res.error)
                // errorMessage('Something went wrong, please try again')
            } else {
                const data = res.data;
                this.setState({ bookingReqs: data });
            } 
        } catch (error) {
            this.setState({ gettingBookingReq: false})
        }
        
    }
    getBookingValue = (id) => {
        const { bookingReqValues } = this.state;
        const found = bookingReqValues.find(item => item === id)
        return found ? true : false
    }
    onCheckBookingReq = (arg) => {
        const { bookingReqValues } = this.state
        const item = arg.item;
        const value = arg.value;
        let arr = [...bookingReqValues]
        if(value) {
            arr.push(item.id)
            this.setState({ bookingReqValues: arr })
        } else {
            const index = arr.findIndex(x => x === item.id )
            if(index !== -1) {
                arr.splice(index, 1)
                this.setState({ bookingReqValues: arr})
            }
        }
    }
    onChangeText = (text, value) => {
        this.setState({ addInfoValue: value })
    }
    saveNewReq = async () => {
        this.setState({ addingInfo: true })
        const obj = { requirement: this.state.addInfoValue }
        // console.log('Obj ', obj)
        const res = await Request(urls.listingBase, `${urls.v}listing/bookingrequirement`, obj);
        this.setState({ addingInfo: false})
        console.log(res)
        if(res.IsError || res.isError) {
            // console.log(res.error)
            errorMessage(res.message)
        } else {
            const data = res.data;
            this.setState({ addInfoValue: ''})
            this.getBookingReq()
        }
    }

    renderBookingReq = () => {
        const { gettingBookingReq } = this.state
        const { textBold, textH4Style, textOrange } = GStyles
        if(gettingBookingReq) {
            return (
                <MyText style={[textH4Style, textOrange, textBold]}>Loading...</MyText>
            )
        }
        return (
            <>
                {this.renderBookingReqWithUserId()}
                {this.renderBookingReqWithoutUserId()}
            </>
        )
    }
    renderItem = ({ item }) => {
        return (
            <LockItem label={item.requirement} />
        )
    }
    renderBookingReqWithUserId = () => {
        const { bookingReqs, gettingBookingReq } = this.state
        if(bookingReqs.length !== 0 && !gettingBookingReq) {
            const filtered = bookingReqs.filter(item => !item.userId)
            return (
                <FlatList
                    data={filtered}
                    renderItem={this.renderItem}
                    keyExtractor={(item, i) => "FL_"+i}
                />
            )
            // return filtered.map((item, index) => {
            //     let key = "FL_"+index;
            //     return (
            //         <LockItem label={item.requirement} key={key} />
            //     ) 
            // })
        }
    }
    renderBookingReqWithoutUserId = () => {
        const { bookingReqs, gettingBookingReq } = this.state;
        const { textNormal, textH5Style } = GStyles
        if(bookingReqs.length !== 0 && !gettingBookingReq) {
            const filtered = bookingReqs.filter(item => item.userId)
            return filtered.map((item, index) => {
                let key = "FLW_"+index;
                return (
                    <CheckBox title={item.requirement} key={key} item={item} 
                    onPress={this.onCheckBookingReq} value={this.getBookingValue(item.id)} 
                        labelTextStyles={[textNormal, textH5Style]}  />
                ) 
            })
        }
    }
    renderAddInfo = () => {
        const { toggleAddBookingReq, addingInfo } = this.state
        const { flexRow, textH4Style, textOrange, textBold } = GStyles
        if(addingInfo) {
            return (
                <MyText style={[textH4Style, textOrange, textBold, { marginTop: 20}]}>Saving...</MyText>
            )
        }
        if(toggleAddBookingReq) {
            return (
                <View style={[flexRow, { flex: 1, alignItems: 'flex-end', marginBottom: 30 }]} 
                onLayout={event => {
                    console.log('Layout ',event.nativeEvent.layout)
                    this.layout = event.nativeEvent.layout
                    // this.setState({ layout: event.nativeEvent.layout})
                    
                    }}>
                    <View style={{ flex: 8, paddingRight: 20}}>
                        <CustomInput placeholder=" " value={this.state.addInfoValue} attrName="addInfo" onChangeText={this.onChangeText} />
                    </View>
                    <View style={{ flex: 2}}>
                        <CustomButton buttonText="Save" buttonStyle={{ height: 55}} disabled={this.state.addInfoValue === ''}
                        onPress={this.saveNewReq} />
                    </View>
                </View>
            )
        }
    }
    submit = () => {
        const { state, set } = this.context
        const { bookingReqValues } = this.state
        const propertyFormData = state.propertyFormData
        const obj = { ...propertyFormData, bookingRequirements: bookingReqValues }
        // console.log(obj)
        set({ propertyFormData: obj })
        this.props.navigation.navigate('HouseRules')
    }
    getHouse = async () => {
        const { state, set } = this.context
        const ppty = state.propertyFormData;
        try {
            this.setState({ gettingHouse: true })
            const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/${ppty.id}`);
            this.setState({ gettingHouse: false })
            // console.log('Get house ', res)
            if(res.isError) {
                const message = res.Message;
            } else {
                const data = res.data;
                if(data !== null) {
                    const bookingReqValues = data.bookingRequirements ? data.bookingRequirements.map(item => item.id) : []
                    const houseRules = data.houseRules ? data.houseRules.map(item => item.id) : []
                    this.setState({ bookingReqValues })
                    set({ propertyFormData: { ...ppty, houseRules, bookingRequirements: bookingReqValues } })
                }
            }
        } catch (error) {
            this.setState({ gettingHouse: false })
        }
        
      }

    componentDidMount = () => {
        this.getBookingReq()
        this.getHouse()
    }
    toggleAddBookingReq = () => {
        const { toggleAddBookingReq } = this.state
        this.setState(() => ({ toggleAddBookingReq: !toggleAddBookingReq }), () => {
            if(this.state.toggleAddBookingReq) {
                // this.scrollViewRef.current.scrollTo({x:20, y: this.yAxis, animated: true})
                // this.scrollViewRef.current.scrollToEnd({ animated: true })
                setTimeout(() => {
                    this.scrollViewRef.current.scrollToEnd({ animated: true })
                }, 5);
            }
            
        })
        
    }

    render() {
        const {
            textOrange, textExtraBold, textGrey, lineHeightText, textNormal,
            textBold, flexRow,
            textH4Style,
            textH3Style,
            textCenter,
            imgStyle,
            textWhite,
            textH5Style, 
            textUnderline,
            textDarkGrey,
          } = GStyles;
        const { gettingBookingReq, addingInfo, gettingHouse } = this.state
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header {...this.props} title="Booking Information Requirements" wrapperStyles={{ position: 'relative'}} />
                    <View style={[Styles.container, { marginTop: 0,marginBottom: 180}]} >
                        <ScrollView ref={this.scrollViewRef} scrollEventThrottle={20}  >
                            <MyText style={[textH3Style, textExtraBold, { marginBottom: 5}]}>Guest Must Provide</MyText>
                            <MyText style={[textH5Style, textGrey, lineHeightText]}>
                                Before Booking any apartment, users must provide any of the following informations
                            </MyText>
                            {/* <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} disabled={gettingBookingReq || addingInfo || gettingHouse}
                                    onPress={this.submit} /> */}
                            <View style={[{marginVertical: 20}]}>
                                {this.renderBookingReq()}
                            </View>
                            
                            <TouchableOpacity onPress={this.toggleAddBookingReq}>
                                <MyText style={[textUnderline,textOrange, textBold, { marginBottom: 15 }]}>Add Additional Requirement</MyText>
                            </TouchableOpacity>

                            {this.renderAddInfo()}

                            <View style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5,}]}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} disabled={gettingBookingReq || addingInfo || gettingHouse}
                                    onPress={this.submit} />
                            </View>
                        </ScrollView>
                        
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const LockItem = (props) => {
    return (
        <View style={[Styles.rowView, {alignItems: "center"}]}>
            <Icon name={"lock"} type="MaterialIcons" style={[Styles.lockIcon]} />
            <MyText>{props.label}</MyText>
        </View>
    );
}