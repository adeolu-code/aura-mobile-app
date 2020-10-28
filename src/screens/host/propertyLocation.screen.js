import React, { Component } from "react";
import Header from "../../components/Header";
import { Container, Content, View } from "native-base";
import { SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { LabelInput } from "../../components/label_input/labelInput.component";

export default class PropertyLocation extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        const {
            textWhite,
            textOrange,
            textBold,
            textH4Style,
            textCenter,
            textUnderline,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Where Is Your Property Located" />
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <MyText style={[Styles.topDescriptionText]}>Guests will only get your exact location once they've booked a reservation</MyText>
                            <MyText style={[textOrange, textUnderline, Styles.topDescriptionText]}>Use Present Location</MyText>
                            <LabelInput 
                                label={"Are You Listing As A Part Of A Company?"}
                                textarea
                            />
                            <View style={[Styles.rowView]}>
                              <LabelInput 
                                 label={"Country"}
                                 picker
                                 pickerOptions={[
                                     {
                                         label: "Nigeria",
                                         value: "Nigeria"
                                     },
                                 ]}
                                 itemStyle={{flex: 0.5}}
                             />
                             <LabelInput 
                                 label={"State"}
                                 picker
                                 pickerOptions={[
                                     {
                                         label: "Enugu",
                                         value: "Enugu"
                                     },
                                 ]}
                                 itemStyle={{flex: 0.5}}
                             />
                            </View>
                            <View style={[Styles.rowView]}>
                              <LabelInput 
                                 label={"City"}
                                 picker
                                 pickerOptions={[
                                     {
                                         label: "Enugu",
                                         value: "Enugu"
                                     },
                                 ]}
                                 itemStyle={{flex: 0.5}}
                             />
                             <LabelInput 
                                 label={"Zip Code"}
                                 itemStyle={{flex: 0.5}}
                             />
                            </View>
                            <TouchableOpacity 
                                style={[Styles.nextButton]}
                                onPress={() => this.props.navigation.navigate('PropertyAmenity')}
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