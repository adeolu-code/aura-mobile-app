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
import RestaurantReviewRating from "./../../components/restuarant_review/reviewRating.component";
import moment from "moment";
import { getRestaurantRatingApi, getRestaurantRevewApi } from "../../api/restaurant.api";
import NoContentComponent from "../../components/no_content/noContent.component";
import { AppContext } from "../../../AppProvider";


export default class RestaurantReviews extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            tab: 0,
            reviews: [],
            ratings: [],
        };
    }

    componentDidMount() {
        this.getRatingReview();
    }

    getRatingReview = ()=> {
        this.setState({loading: true});
        getRestaurantRatingApi().then(result => {
            if (result != undefined) {
                this.setState({ratings: result});
            }
        });
        getRestaurantRevewApi().then(result => {
            if (result != undefined) {
                this.setState({reviews: result, loading: false});
            }
        });
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
        console.log(this.context.state.currentDashboard)
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
                                    {
                                        this.state.reviews.length > 0 ?
                                            this.state.reviews.map((review, index) => {
                                                <RenderReview 
                                                    key={index}
                                                    customer={review.user}
                                                    review={review.comment}
                                                    createdOn={review.createdOn}
                                                    profilePicture={{uri: review.profilePicture}}
                                                />
                                            })
                                        :
                                        <NoContentComponent text={"No Reviews yet"} />
                                    }
                                    
                                </View>
                            }
                            {
                                this.state.tab == 1 &&
                                <View style={[MyStyle.mt05]}>
                                    {
                                        this.state.ratings.length > 0 ?
                                        this.state.ratings.map((rating, index) => {
                                            <RenderRating 
                                                key={index}
                                                stars={rating.rating} 
                                                customer={rating.user}
                                                createdOn={rating.createdOn}
                                                profilePicture={{uri: rating.profilePicture}}
                                            />
                                        })
                                        :
                                            <NoContentComponent text={"No Ratings yet"} />
                                    }
                                    
                                </View>
                            }
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const RenderReview = (props)  => {
    const {textH4Style, textOrange, textH2Style, textBold, textBlack} = GStyles;
    console.log("props", props);
    return (
        <RestaurantReviewRating 
            user={props.customer}
            imageSource={props.profilePicture}
            date={moment(props.createdOn).fromNow()}
            comment={props.review}
        />
    );
}

const RenderRating = (props)  => {
    const {textH4Style, textOrange, textH2Style, textBold, textBlack} = GStyles;
    return (
        <RestaurantReviewRating 
            rating
            user={props.customer}
            imageSource={props.profilePicture}
            date={moment(props.createdOn).fromNow()}
            child={
                <RenderStars 
                    stars={props.stars} 
                    starActive={{fontSize: 19}} 
                    starInactive={{fontSize: 18}}
                />
            }
        />
    );
}