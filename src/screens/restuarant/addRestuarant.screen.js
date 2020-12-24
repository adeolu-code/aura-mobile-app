import { Body, Container, Content, Icon, Item, Left, Right, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, Image,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantApi } from "../../api/restaurant.api";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { Loading, MyText } from "../../utils/Index";
import { Styles } from "./restuarant.style";


export default class AddRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            more: false,
        };
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    getRestaurant = () => {
        this.ss
        getRestaurantApi().then(result => {
            if (result != undefined) {
                this.setState({restaurant: result.data});
            }
        })
    }

    onSubmit = () => {

    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold, textBlack} = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Restaurant"} sub={"Name, address and location"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 130}]}>
                        <Content scrollEnabled={true} style={{marginBottom: 20}}>
                            <Image 
                                source={require("./../../assets/images/pizza.jpg")} 
                                style={[Styles.center, Styles.pizzaImage]}
                            />
                            <View>
                                <LabelInput placeholder="Restaurant Name" input  />
                                <TouchableOpacity 
                                    onPress={() => this.setState({more: true})}
                                    style={[Styles.addIconView]}
                                >
                                    <Icon name="add-outline" style={[Styles.addIcon]} />
                                    <MyText>Add more location</MyText>
                                </TouchableOpacity>
                            </View>
                            { this.state.more &&
                            <View>
                                <View style={[Styles.row, {width: '100%', }]}>
                                    <LabelInput 
                                        label={"Select Country"} 
                                        picker 
                                        onPickerChange={(val) => this.setState({country: val})} 
                                        itemStyle={Styles.halfWidth}
                                    />
                                    <LabelInput 
                                        label={"Enter Address"} 
                                        input 
                                        onChangeText={(val) => this.setState({address: val})} 
                                        itemStyle={Styles.halfWidth}
                                    />
                                </View>
                                <View style={[Styles.row, {width: '100%', }]}>
                                    <LabelInput 
                                        label={"Enter State"} 
                                        input 
                                        onChangeText={(val) => this.setState({state: val})} 
                                        itemStyle={Styles.halfWidth}
                                    />
                                    <LabelInput 
                                        label={"Enter City"} 
                                        input 
                                        onChangeText={(val) => this.setState({city: val})} 
                                        itemStyle={Styles.halfWidth}
                                    />
                                </View>
                                <View style={[Styles.row, {width: '100%', }]}>
                                    <LabelInput 
                                        label={"Enter Zipcode"} 
                                        input 
                                        onChangeText={(val) => this.setState({zipcode: val})} 
                                        itemStyle={Styles.fullWidth}
                                    />
                                </View>
                                <View style={[Styles.row, {width: '100%', }]}>
                                    <TouchableOpacity 
                                    style={[Styles.nextButton, {height: 40, borderRadius: 5}, Styles.halfWidth]}
                                    onPress={() => this.onSubmit()}
                                    >
                                        <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Submit</MyText>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    style={[Styles.nextButton, {height: 40, borderRadius: 5, marginLeft: 5, backgroundColor: colors.veryLightGrey}, Styles.halfWidth]}
                                    onPress={() => this.setState({more: false})}
                                    >
                                        <MyText style={[textH3Style, textCenter, textBlack, textBold]}>Cancel</MyText>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                            }
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}