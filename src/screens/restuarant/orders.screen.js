import { Container, Content, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantOrdersApi } from "../../api/restaurant.api";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import { Loading, MyText } from "../../utils/Index";
import { Styles } from "./restuarant.style";
import moment from "moment";
import NoContent from "./../../components/no_content/noContent.component";
import { FlatList } from "react-native-gesture-handler";
import { consoleLog } from "../../utils";


export default class RestaurantOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            orders: [],
            page: 1,
            size: 5,
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        this.setState({loading: true});
        getRestaurantOrdersApi(this.state.page,this.state.size).then(result => {
            consoleLog("result", result);
            if (result != undefined) {
                this.setState({orders: result.items});
            }
            this.setState({loading: false});
            
        });
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    getMore = () => {
        consoleLog("more");
        if(!this.onEndReachedCalledDuringMomentum){
            this.state.page =  this.state.page + 1;
            this.state.size = this.state.size + 20;
            this.setState({});

            this.getOrders();
            
            this.onEndReachedCalledDuringMomentum = true;
        }
        
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold} = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Orders"} sub={"Orders placed By Clients For Meals"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 140}]}>
                        {/* <Content scrollEnabled={true}> */}
                            {
                                Array.isArray(this.state.orders) && this.state.orders.length > 0 ?
                                // this.state.orders.map((order, index) => {
                                //     return (
                                //         <RenderItem 
                                //             key={index}
                                //             meal={order.orderedForName}
                                //             customer={order.user}
                                //             amount={order.amount}
                                //             date={order.createdOn}
                                //         />
                                //     );
                                // })
                                    <FlatList
                                        data={this.state.orders}
                                        renderItem={({ item, onPress, style }) => {
                                            const order = item;
                                            consoleLog("order", order);
                                            return <RenderItem 
                                                key={order.id}
                                                meal={order.orderedForName}
                                                customer={order.user}
                                                amount={order.amount}
                                                date={order.createdOn}
                                                refreshControl={
                                                    <RefreshControl
                                                      refreshing = {this.state.refreshing}
                                                      onRefresh = {() => this.getOrders()}
                                                    />
                                                }
                                                onEndReached={() => this.getMore()}
                                                onEndReachedThreshold={0.5}
                                            />
                                        }}
                                        keyExtractor={(item) => item.id}
                                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    />
                                :
                                <NoContent text="No Orders" />
                            }
                            
                        {/* </Content> */}
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

// const RenderItem2 = (props)  => {
//     return (
//         <View style>

//         </View>
//     );
// };

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
                        <MyText style={[{padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                Customer: {props.customer}
                        </MyText>
                        
                        <MyText style={[textH4Style, textOrange, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                            Total Cost: NGN {props.amount}
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