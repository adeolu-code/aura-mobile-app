import { Container, Content, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl, TouchableOpacity,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantCuisineApi, getRestaurantPhotoMenuApi } from "../../api/restaurant.api";
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
            menus: []
        };
        this.onEndReachedCalledDuringMomentum = true;
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

        getRestaurantPhotoMenuApi(this.state.id).then(result => {
            if (result != undefined) {
                this.state.menus = result;
                this.setState({});
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
                        <Content scrollEnabled={true}>
                            <TouchableOpacity
                                style={[MyStyle.nextButton, {height: 40, borderRadius: 5, marginBottom: 40}]}
                                onPress={() => {this.props.navigation.navigate('RestaurantUploadImage')}}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Upload Photos</MyText>
                            </TouchableOpacity>
                            <View style={[MyStyle.row]}>
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
                                            />
                                        );
                                    })
                                }
                                <RenderItem 
                                    id={0}
                                    cuisine={"African"}
                                    meal="Bread" 
                                    amount="1000"
                                    navigation={this.props.navigation}
                                />
                            </View>
                        </Content>
                    </Container>
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
                    <MyText style={[textH4Style, textBold]}>
                        Meal: {props.meal}
                    </MyText>
                    <MyText style={[textH4Style, textBold]}>
                        Cuisine: {props.cuisine}
                    </MyText>
                    <MyText style={[textH4Style, textBold]}>
                        Price: NGN {props.amount}
                    </MyText>
                    <RoundButton label={"View"} onClick={() => props.navigation.navigate('RestaurantMenuDetail', {id: props.id, menu: props.menu})} />
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