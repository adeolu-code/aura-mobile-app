import { Container, Content, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantCuisineApi } from "../../api/restaurant.api";
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


export default class RestaurantMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            cuisines: [],
            page: 1,
            size: 20,
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
                                onPress={() => {}}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Upload Photos</MyText>
                            </TouchableOpacity>
                            <View style={[MyStyle.row]}>
                                
                            </View>
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}


const RenderItem = (props)  => {
    const {textH4Style, textOrange, textH2Style, textBold} = GStyles;
    return (
        <View style={[Styles.itemParentView]}>
            <Pressable style={[Styles.parentView, {marginBottom: 5}]}>
                <View style={[Styles.textSection]}>
                    <View style={[Styles.textView]}>
                        <MyText style={[textH4Style, textOrange,{padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                            Meal: {props.meal}
                        </MyText>
                        <LabelInput 
                            label={"Cuisine"} 
                            picker
                            itemStyle={{marginLeft: 5}}
                            onPickerChange={(val) => this.setState({bankId: val})}
                        />
                        
                        <MyText style={[textH4Style, textOrange, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                            Price: ₦ {props.amount}
                        </MyText>
                        <MyText style={[{padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                            Date: {moment(props.date).format("DD/MM/YYYY")}
                        </MyText>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}