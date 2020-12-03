import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { View, CheckBox, Container, Content } from "native-base";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import Header from "../../components/Header";
import colors from "../../colors";
import GStyles from "../../assets/styles/GeneralStyles";
import Item from "../../components/label_checkbox/labelCheckbox.component";

export default class PropertyAmenity extends Component {
    constructor() {
        super();

        this.state = {
            kitchenChecked: false,
        };
    }

    // amenities = [
    //     { label: "Breakfast, coffee, tea", value: "bct" }, { label: "Desk/Workspace", value: "dw" }, { label: "Parking Space", value: "ps" },{ label: "Closet/Drawers", value: "cd" }, { label: "Private Entrance", value: "pe" }
    // ];
    amenities = [
        "Kitchen", "Wifi", "Television", "Heat", "Air Conditioning", "Iron", "Swimming Pool", "Gym",
        "Breakfast, coffee, tea","Desk/work space","Parking Space","Closet/Drawers","Private Entrance",
    ];
    safeAmenities = [
        { title: "Kitchen", description: "Check Your Local Laws, Which May Require A Working Smoke Detector In Every Room" },
        { title: "Carbon Monoxide Detector", description: "Check Your Local Laws, Which May Require A Working Smoke Detector In Every Room" },
        {title: "First Aid Kit"},{title: "Fire Extinguisher"},{title: "Lock On Bedroom Door", description: "Private Rooms Can Be Locked For Safety & Privacy"},
    ];

    render() {
        let {
            textOrange, textUnderline, textH2Style, textExtraBold,
            textWhite, textH4Style, textBold, textCenter
        } = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Amenities Available At Your Place" />
                    <Container style={[Styles.container, {marginTop: 150}]}>
                        <Content scrollEnabled={true}>
                            {
                                this.amenities.map((amenity, index) => 
                                    {
                                        let key = "A_";
                                    return (<Item
                                        key={index}
                                        label={amenity}
                                        checked={this.state[key + index]}
                                        onPress={() => this.setState({[key + index]: !this.state[key + index]})}
                                    />
                                    )}
                                )
                            }

                            <TouchableOpacity>
                                <MyText style={[textOrange, textUnderline]}>Add Additional Amenities</MyText>
                            </TouchableOpacity>
                            <MyText style={[textH2Style, textExtraBold, {marginTop: 15,}]}>Safe Amenities</MyText>
                            {
                                this.safeAmenities.map((amenity, index) => 
                                    {
                                        let key = "SA_";
                                        return (<Item
                                            key={index}
                                            label={amenity.title}
                                            description={amenity.description}
                                            checked={this.state[key + index]}
                                            onPress={() => this.setState({[key + index]: !this.state[key + index]})}
                                        />
                                    )
                                })
                            }
                            
                            <TouchableOpacity 
                                style={[Styles.nextButton]}
                                onPress={() => this.props.navigation.navigate('HostSteps')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}