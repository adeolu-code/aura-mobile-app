import { Container, Content, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantOrdersApi } from "../../api/restaurant.api";
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
import { getBankApi, getUserBankDetailsApi } from "../../api/profile.api";
import { AppContext } from "../../../AppProvider";


export default class RestaurantEarnings extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            orders: [],
            page: 1,
            size: 20,
            banks: [],
            userBank: {accountName: "", accountNumber: ""},
            selectedBank: "",
            "bankId":"",
            "accountNumber":"",
            "accountName":"",
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    componentDidMount() {

        this.init();
    }

    init = () => {
        this.getOrders();
        this.getBank();
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
        consoleLog("update_res","more");
        if(!this.onEndReachedCalledDuringMomentum){
            this.state.page =  this.state.page + 1;
            this.state.size = this.state.size + 20;
            this.setState({});

            this.getOrders();
            
            this.onEndReachedCalledDuringMomentum = true;
        }
        
    }

    sumOrderAmounts = () => {
        let totalSum = 0;
        this.state.orders?.map(order => {
            totalSum += order.amount;
        });
        return totalSum;
    }

    getBank = async () => {
        this.setState({loading: true});
        await getBankApi().then(result => {
            if (result != undefined) {
                result.data.map(bank => {
                    this.setState({banks: [
                        ...this.state.banks,
                        ...[{value: bank.id, label: bank.name}]
                    ]});
                });
            }
        });
        
        getUserBankDetailsApi(this.context.state.userData.id).then(result => {
            console.log("result", JSON.stringify(result), this.context.state.userData.id);
            if (result != undefined && result.data) {
                this.setState({
                    userBank: result.data,
                    accountName: result.data.accountName,
                    accountNumber: result.data.accountNumber,
                    bankId: result.data.bank.id,
                });
            }
            else if (!result.data) {
                // no bannk record
                this.setState({isNewBank: true});
            }
        })
        
        this.setState({loading: false});
    }

    addBank = () => {
        this.props.navigation.navigate('Profile', {screen: 'Bank'});
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold, textH4Style, textOrange} = GStyles;
        console.log("this.state.accountName", this.state.accountName, this.state);
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"My Earnings"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 120}]}>
                        <Content scrollEnabled={true}>
                            <View style={[MyStyle.row, {marginBottom: 20}]}>
                                <MyText style={[textH3Style, textBold]}>
                                    Total Earnings:
                                </MyText>
                                <MyText style={[textH4Style, textOrange, {marginTop: 5, marginLeft: 10}]}>
                                    NGN {this.sumOrderAmounts()}
                                </MyText>
                            </View>
                            <MyText style={[textH3Style, textBold]}>Bank</MyText>
                            <View>
                                {
                                    this.state.accountNumber 
                                    ?    
                                    <>
                                        <LabelInput 
                                            label={"Account Name"} 
                                            // placeholder={this.state.accountName ? this.state.accountName : "Account Name"}
                                            placeholder={"Account Name"}
                                            itemStyle={{marginLeft: 5, height: 40}}
                                            onChangeText={(val) => this.setState({accountName: val})}
                                        />  
                                        <LabelInput
                                            label={"Commercial Bank"} 
                                            picker
                                            placeholder={""}
                                            itemStyle={{marginLeft: 5}}
                                            pickerOptions={this.state.banks.sort(function(a, b) {
                                                var textA = a.label.toUpperCase();
                                                var textB = b.label.toUpperCase();
                                                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                                            })}
                                            selectedOption={this.state.userBank.bank != undefined 
                                                ? 
                                                    (this.state.selectedBank
                                                        ? this.state.selectedBank
                                                        : this.state.userBank.bank.id
                                                    ) 
                                                : 
                                                this.state.selectedBank}
                                            //
                                            onPickerChange={(val) => this.setState({bankId: val})}
                                        />  
                                        <LabelInput 
                                            label={"Account Number"} 
                                            placeholder={this.state.userBank.accountNumber != undefined ? this.state.userBank.accountNumber : "XXXXXXXXXXXX"}
                                            onChangeText={(val) => this.setState({accountNumber: val})}
                                                
                                        /> 
                                        <TouchableOpacity
                                            style={[MyStyle.nextButton, {height: 40, borderRadius: 5, marginBottom: 40}]}
                                            onPress={() => this.addBank()}
                                        >
                                            <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Edit Bank</MyText>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <TouchableOpacity
                                        style={[MyStyle.nextButton, {height: 40, borderRadius: 5}]}
                                        onPress={() => this.addBank()}
                                    >
                                        <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Add Bank</MyText>
                                    </TouchableOpacity>
                                }
                            </View>
                            
                            <MyText style={[textH4Style, textBold, {marginBottom: 20}]}>
                                Transaction History
                            </MyText>
                                {
                                    Array.isArray(this.state.orders) && this.state.orders.length > 0 ?
                                        <FlatList
                                            data={this.state.orders}
                                            renderItem={({ item, onPress, style }) => {
                                                const order = item;
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
                                            onMomentumScrollBegin={() => { 
                                                this.onEndReachedCalledDuringMomentum = false; 
                                            }}
                                        />
                                    :
                                    <NoContent text="No Orders" />
                                }
                                
                        </Content>
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