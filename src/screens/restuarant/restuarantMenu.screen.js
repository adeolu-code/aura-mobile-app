import { Container, Content, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl, TouchableOpacity,Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantCuisineApi, getRestaurantPhotoMenuApi, deleteRestaurantPhotoMenuApi } from "../../api/restaurant.api";
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
import AlertPro from "react-native-alert-pro";


export default class RestaurantMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            cuisines: [],
            page: 1,
            size: 20,
            id: props.route?.params?.id,
            menus: [],
            selectedId: undefined,
            refreshing: false
        };
        this.onEndReachedCalledDuringMomentum = true;
    }
    
    AlertPro = undefined;

    componentDidMount() {
        this.init();
        this.AlertPro = React.createRef();
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

        this.getMenu();
    }

    getMenu = () => {
        getRestaurantPhotoMenuApi(this.state.id).then(result => {
            if (result != undefined) {
                this.state.menus = result;
                this.setState({loading: false, refreshing: false});
            }
        });
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }


    render() {
        const {textCenter, textH3Style, textWhite, textBold} = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Photos"} sub={"Review Your Uploaded Pictures And Update Your Restaurant Photos"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 150}]}>
                        {/* <Content scrollEnabled={false}> */}
                            <ScrollView 
                            nestedScrollEnabled={true}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={
                                            () => {
                                                this.setState({refreshing: true});
                                                this.setState({loading: true});
                                                this.getMenu();
                                            }
                                        }
                                    />
                                }>

                                
                            <RoundButton
                                style={{height: 40, borderRadius: 5, marginBottom: 40}}
                                icon={"ios-add-circle-outline"}
                                label={"Add Meal"}
                                onClick={() => this.props.navigation.navigate('RestaurantUploadImage', {nextScreen: 'RestaurantMenuDetail', new: true, profileId: this.props.route?.params?.id})}
                            />
                                {/* <TouchableOpacity
                                    style={[MyStyle.nextButton, {height: 40, borderRadius: 5, marginBottom: 40}]}
                                    onPress={() => {
                                        this.props.navigation.navigate('RestaurantUploadImage', {nextScreen: 'RestaurantMenuDetail', new: true, profileId: this.props.route?.params?.id});
                                    }}
                                >
                                    <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Upload Photos</MyText>
                                </TouchableOpacity> */}
                                <View style={[]}>
                                    {
                                        this.state.menus.map((menu, index) => {
                                            return (
                                                <RenderItem 
                                                    key={index}
                                                    id={menu.id}
                                                    cuisine={menu.cuisine}
                                                    meal={menu.mealName}
                                                    amount={menu.price}
                                                    navigation={this.props.navigation}
                                                    menu={menu}
                                                    onDelete={(id) => {
                                                        this.setState({selectedId: id});
                                                        this.AlertPro.open();
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </View>
                            </ScrollView>
                        {/* </Content> */}
                    </Container>
                    <AlertPro
                        ref={ref => {
                            this.AlertPro = ref;
                        }}
                        onConfirm={() => {
                            if(this.state.selectedId) {
                                this.setState({loading: true});
                                deleteRestaurantPhotoMenuApi(this.state.selectedId).finally(() => {
                                    this.getMenu();
                                    this.setState({loading: false});
                                });
                            }
                            
                            this.AlertPro.close();
                        }}
                        title="Delete confirmation"
                        message="Are you sure to delete the entry?"
                        textCancel="Cancel"
                        textConfirm="Delete"
                        customStyles={{
                            mask: {
                            backgroundColor: "transparent"
                            },
                            container: {
                            borderWidth: 1,
                            borderColor: "#9900cc",
                            shadowColor: "#000000",
                            shadowOpacity: 0.1,
                            shadowRadius: 10
                            },
                            buttonCancel: {
                            backgroundColor: "red"
                            },
                            buttonConfirm: {
                            backgroundColor: "#ffa31a"
                            }
                        }}
                    />
                </SafeAreaView>
            </>
        );
    }
}


const RenderItem = (props)  => {
    const uri = require("./../../assets/images/food_bg/food_bg.png");
    const {textH4Style, textOrange, textH2Style, textBold} = GStyles;
    return (
        <View style={[Styles.itemParentView,{height: null}, MyStyle.pd10]}>
            <View style={[MyStyle.fullWidth]}>
            <View style={[]}>
                <View style={[]}>
                    <MyText style={[textH4Style, textOrange,{padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                        Meal: {props.meal}
                    </MyText>
                    <MyText style={[textH4Style, textBold]}>
                        Cuisine: {props.cuisine}
                    </MyText>
                    <MyText style={[textH4Style, textOrange, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                        Price: NGN {props.amount}
                    </MyText>

                    <RoundButton
                        icon={"link"}
                        label={"View"}
                        onClick={() => props.navigation.navigate('RestaurantMenuDetail', {id: props.id, menu: props.menu})}
                    />
                    <RoundButton
                        icon={"trash"}
                        label={"Delete"}
                        onClick={() => props.onDelete(props.id)}
                    />
                </View>
            </View>
{/*                 
                <View style={[Styles.textSection]}>
                    <View style={[Styles.textView]}>
                        <MyText style={[textH4Style, textBold]}>
                            Meal: {props.meal}
                        </MyText>
                        <MyText style={[textH4Style, textBold]}>
                            Price: {props.amount}
                        </MyText>
                        <RoundButton label={"Edit"} onClick={props.navigation.navigate('RestaurantMenuDetail', {id: props.id})} />
                    </View>
                </View> 
*/}
            </View>
        </View>
    );
}