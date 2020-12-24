import { Container, Content, View } from "native-base";
import React,{ Component } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import TopTab from "../../components/top_tab/topTabComponent";
import { MyStyle } from "../../myStyle";
import { Loading, MyText } from "../../utils/Index";
import { Styles } from "./restuarant.style";
import { RenderStars } from "./../../components/render_stars/renderStars";


export default class RestaurantReviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            tab: 0,
        };
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    tabChange = (index) => {
        this.setState({tab: index});
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold} = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Reviews and Ratings"} sub={"Reviews, Ratings And Reports placed By Clients For Meals"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 160}]}>
                        <Content scrollEnabled={true}>
                            <TopTab tabs={["Reviews", "Ratings"]} onClick={(tab) => this.tabChange(tab)} />
                            {
                                this.state.tab == 0 &&
                                <View style={[MyStyle.mt05]}>
                                    <RenderReview 
                                    customer={"Ade Ade"}
                                    review={"Bad Rewview on my side"}
                                    date={"01/01/2020"}
                                    />
                                </View>
                            }
                            {
                                this.state.tab == 1 &&
                                <View style={[MyStyle.mt05]}>
                                    <RenderRating 
                                        stars={4} 
                                        customer={"Ade Ade"}
                                        date={"01/01/2020"}
                                    />
                                </View>
                            }
                            {/* <RenderItem 
                                meal="hvhvh"
                                customer="Feurme Takpe"
                                amount="500"
                                date="01/01/2020"
                            /> */}
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const RenderReview = (props)  => {
    const {textH4Style, textOrange, textH2Style, textBold, textBlack} = GStyles;
    return (
        <View style={[Styles.itemParentView]}>
            <Pressable style={[Styles.parentView, {marginBottom: 5}]}>
                <View style={[Styles.textSection]}>
                    <View style={[Styles.textView]}>
                        <View style={[MyStyle.row]}>
                            <MyText style={[textH2Style, textBold, textOrange, MyStyle.halfWidth,{padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                {props.customer}
                            </MyText>
                            <MyText style={[MyStyle.halfWidth,{padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                {props.date}
                            </MyText>
                        </View>
                        <View style={MyStyle.underline}></View>
                        <MyText style={[textBold, textH4Style, textBlack, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                            {props.review}
                        </MyText>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const RenderRating = (props)  => {
    const {textH4Style, textOrange, textH2Style, textBold, textBlack} = GStyles;
    return (
        <View style={[Styles.itemParentView]}>
            <Pressable style={[Styles.parentView, {marginBottom: 5}]}>
                <View style={[Styles.textSection]}>
                    <View style={[Styles.textView]}>
                        <MyText style={[textH2Style, textBold, textOrange, {padding: 0, paddingLeft: 2, paddingRight: 2,paddingBottom:5}]}>
                            {props.customer}
                        </MyText>
                        <MyText style={[{padding: 0, paddingLeft: 2, paddingRight: 2,paddingBottom:5}]}>
                            {props.date}
                        </MyText>
                        <RenderStars 
                            stars={props.stars} 
                            starActive={{fontSize: 19}} 
                            starInactive={{fontSize: 18}}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}