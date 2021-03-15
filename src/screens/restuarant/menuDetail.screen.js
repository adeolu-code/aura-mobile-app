import { Container, Content, Footer, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl, TouchableOpacity,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantCuisineApi, getRestaurantServicesApi, getRestaurantOperationApi,updateRestaurantPhotoMenuApi } from "../../api/restaurant.api";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import { Loading, MyText } from "../../utils/Index";
import { Styles } from "./restuarant.style";
import moment from "moment";
import NoContent from "../../components/no_content/noContent.component";
import { FlatList } from "react-native-gesture-handler";
import { consoleLog } from "../../utils";
import { MyStyle } from "../../myStyle";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { RoundButton } from "../../components/helper/components/round_button/roundButton.component";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";

const menuItem = {
    "category": "",
    "mealName": "",
    "cuisine": "",
    "price": 0,
    "isCoverPhoto": true,
    "profileId": "",
    "description": "",
    "assetPath": ""
  }

export default class RestaurantMenuDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            cuisines: [],
            page: 1,
            size: 20,
            menu: props.route?.params?.menu || menuItem,
            services: [],
            operations: [],
            isEdit: props.route?.params?.menu != undefined,


        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.setState({loading: true});
        getRestaurantCuisineApi(this.state.page,this.state.size).then(result => {
            consoleLog("res_menu","getRestaurantCuisineApi", result);
            if (result != undefined) {
                this.setState({cuisines: result});
            }
            this.setState({loading: false});
            
        });

        getRestaurantServicesApi().then(result => {
            if (result != undefined) {
                this.setState({services: result});
            }
        });

        getRestaurantOperationApi().then(result => {
            if (result != undefined) {
                this.setState({operations: result});
            }
        });
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    onSave = async () => {
        this.setState({loading: true});
        if (this.state.isEdit) {
            let data = {
                "category": this.state.menu.category,
                "mealName": this.state.menu.mealName,
                "cuisine": this.state.menu.cuisine,
                "price": this.state.menu.price,
                "isCoverPhoto": this.state.menu.isCoverPhoto,
                "profileId": this.state.menu.profileId,
                "description": this.state.menu.description,
                "assetPath": this.state.menu.assetPath
            }
            console.log("menu", this.state.menu);
            await updateRestaurantPhotoMenuApi(this.state.menu?.id, this.state.menu);
        }

        this.setState({loading: false});
    }


    render() {
        const {textCenter, textH3Style, textWhite, textBold} = GStyles;
        let uri = require("./../../assets/images/food_bg/food_bg.png");
        if (this.state.menu?.assetPath) {
            uri = {uri: this.state.menu?.assetPath};
        }

        console.log("this.state.menu?.price", this.state.menu?.price, this.state.menu);

        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Menu Detail"} sub={""} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 150}]}>
                        <Content scrollEnabled={true}>
                            <View style={[MyStyle.row]}>
                                <View style={[Styles.itemParentView,{height: null}, MyStyle.pd10]}>
                                    <View style={[MyStyle.fullWidth, {marginBottom: 5}]}>
                                        <Image source={uri} style={[MyStyle.customWidth(200), MyStyle.hPx(140)]} />
                                        <View style={[Styles.textSection]}>
                                            <View style={[Styles.textView]}>
                                                <LabelInput 
                                                    label={"Service"} 
                                                    picker
                                                    itemStyle={{marginLeft: 5}}
                                                    onPickerChange={(val) => {
                                                        if (this.state.menu?.category) {
                                                            this.state.menu.category = val;
                                                            this.setState({});
                                                        };
                                                    }}
                                                    selectedOption={this.state.menu?.category}
                                                    pickerOptions={this.state.services.map(service => {
                                                        return {label: service.name, value: service.id}
                                                    })}
                                                />
                                                <LabelInput 
                                                    label="Meal"
                                                    value={this.state.menu?.mealName}
                                                    onChangeText={(val) => {
                                                        if (this.state.menu?.mealName) {
                                                            this.state.menu.mealName=val;
                                                            this.setState({});
                                                        }
                                                    }}
                                                />
                                                <LabelInput 
                                                    label={"Cuisine"} 
                                                    picker
                                                    itemStyle={{marginLeft: 5}}
                                                    onPickerChange={(val) => {
                                                        if (this.state.menu?.cuisine) {
                                                            this.state.menu.cuisine = val;
                                                            this.setState({});
                                                        }
                                                    }}
                                                    pickerOptions={this.state.cuisines.map(cuisine => {
                                                        return {label: cuisine.name, value: cuisine.id}
                                                    })}
                                                    selectedOption={this.state.menu?.cuisine}
                                                />
                                                <LabelInput 
                                                    label="Price"
                                                    value={this.state.menu?.price}
                                                    onChangeText={(val) => {
                                                        if (this.state.menu?.price) {
                                                            this.state.menu.price=val;
                                                            this.setState({});
                                                        }
                                                    }}
                                                />
                                                <LabelInput 
                                                    label="Description"
                                                    value={this.state.menu?.description}
                                                    textarea
                                                    onChangeText={(val) => {
                                                        if (this.state.menu?.description) {
                                                            this.state.menu.description=val;
                                                            this.setState({});
                                                        }
                                                    }}
                                                />
                                                <LabelCheckbox label={"Cover Photo?"} checked={this.state.menu?.isCoverPhoto} onPress={(val) => {
                                                    if (this.state.menu?.isCoverPhoto !== undefined) {
                                                        this.state.menu.isCoverPhoto = !this.state.menu.isCoverPhoto;
                                                        this.setState({});
                                                    }
                                                }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Content>
                        <Footer style={[MyStyle.transparent]}>
                            <RoundButton label="Save" onClick={() => this.onSave()} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}
