import React, { Component } from "react";
import { StatusBar, SafeAreaView, ScrollView, Pressable, Image } from "react-native";
import Header from "../../components/Header";
import { View } from "native-base";
import { Styles } from "./profile.style";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { getDeviceInfoApi } from "../../api/users.api";
import NoContentComponent from "../../components/no_content/noContent.component";
import moment from 'moment';

export default class DeviceSharing extends Component {
    constructor() {
        super();

        this.state = {
            devices: [],
        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        getDeviceInfoApi().then(result => result != undefined && this.setState({devices: result}));
    }

    render() {
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={ "Device Sharing"} />
                    <View style={[Styles.container, {marginTop: 140}]}>
                        <MyText>Device History</MyText>
                        <ScrollView style={[Styles.deviceHistoryScrollView]}>
                            {
                                this.state.devices.length > 0 ?
                                this.state.devices.map((device, index) => {
                                    return (
                                        <DeviceItem 
                                            key={index}
                                            device={device.deviceInfo}
                                            location={"Lagos, Lagos"}
                                            date={moment(device.dateCreated).format("MMMM, DD YYYY")}
                                            time={moment(device.dateCreated).format("hh:mm")}
                                        />
                                    );
                                })
                                :
                                    <NoContentComponent />
                            }
                            {/* <DeviceItem 
                                device={"OS X 10.15.3 Chrome"}
                                location={"Lagos, Lagos"}
                                date={"March 4, 2020"}
                                time={"11:35am"}
                            />
                            <DeviceItem 
                                device={"OS X 10.15.3 Chrome"}
                                location={"Abuja, Nigeria"}
                                date={"March 4, 2020"}
                                time={"08:35am"}
                            /> */}
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const DeviceItem = (props) => {
    const {textBold, textH3Style, textCenter, textGreen, textH4Style, textGrey, textH5Style} = GStyles;
    return (
        <View style={[Styles.deviceItemView]}>
            <View style={[Styles.rowView]}>
                <Image
                    source={require("./../../assets/images/profile/aura_computer_desktop.png")} 
                    style={[Styles.computerImage]}
                    resizeMode={"contain"}
                />
                <MyText style={[textBold, textH3Style, textCenter, Styles.deviceText]}>{props.device}</MyText>
            </View>
            <View style={[Styles.rowView]}>
                <MyText style={[textH5Style, textGrey]}>{props.location}</MyText>
                <MyText style={[textH5Style, textGrey, Styles.dateTimeText]}>{props.date} at {props.time}</MyText>
            </View>
            <Pressable>
                <MyText style={[textGreen, textH4Style]}>Logout of Device</MyText>
            </Pressable>
        </View>
    );
}