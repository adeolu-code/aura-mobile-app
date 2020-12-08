import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText, CustomButton, Loading } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import FoodComponent from './FoodComponent';
import ScrollHeader from './ScrollHeader';

import { setContext, Request, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../helpers';

import colors from '../../colors';

class ScrollContentFood extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, restaurants: [], noDot: true, first: true };
  }
    linkToRestaurants = () => {
        this.props.navigation.navigate('ExploreAll', { tab: 'three' })
    }
    linkToRestaurant = (restaurant) => {
        this.props.navigation.navigate('Other', { screen: 'FoodSingle', params: { restaurantId: restaurant.profileId } })
    }

    getRestaurants = async (long, lat) => {
        this.setState({ loading: true })
        const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/?Size=4&Page=1`);
        console.log('Res restaurants', res)
        this.setState({ loading: false })
        if(res.isError) {
            const message = res.Message;
        } else {
            const data = res.data.items
            this.setState({ restaurants: data })
            if(data.length !== 0) {
                this.setState({ noDot: false })
            }
        }
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', paddingTop: 50 }} />); }
    }

    renderRestaurants = () => {
        const { restaurants } = this.state
        if(restaurants !== 0 ) {
            return restaurants.map((item, i) => {
                const key = `REST_${i}`
                const imgUrl = item.assetPath ? {uri: item.assetPath} : require('../../assets/images/no_food.png')
                const location = `${item.city}, ${item.state}`
                return (
                    <View style={styles.scrollItemContainer} key={key}>
                        <FoodComponent title={item.restaurant} img={imgUrl} location={location} 
                        {...this.props} onPress={this.linkToRestaurant.bind(this, item)} />
                    </View>
                )
            })
        }
    }
    renderEmpty = () => {
        const { restaurants, loading } = this.state
        const { emptyStyles, locationContainer } = styles;
        const { imgStyle, textOrange, textH3Style, textBold, textCenter } = GStyles
        if(restaurants.length === 0 && !loading) {
            
            return (
                <View>
                    <View style={[emptyStyles]}>
                        <Image source={require('../../assets/images/no_food.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={[locationContainer, { marginBottom: 20}]}>
                        <MyText style={[textH3Style, textOrange, textBold, textCenter]}>No Restaurants Found</MyText>
                    </View>
                </View>
            )
        }
    }

    renderButton = () => {
        const { restaurants, loading } = this.state;
        const { buttonStyle, buttonContainer } = styles
        if(restaurants.length !== 0 && !loading) {
            return (
                <View style={buttonContainer}>
                    <CustomButton buttonText="Find More Restaurants" iconName="arrow-right" onPress={this.linkToRestaurants} />
                </View>
            )
        }
    }

    componentDidMount = () => {
        this.getRestaurants()
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.refresh !== this.props.refresh) {
            this.getRestaurants()
        }
    }

  render() {
    const { scrollItemContainer, scrollContainer, headerContainer, foodContainer, textContainer, scrollMainContainer  } = styles;
    const { width } = Dimensions.get('window')
    const { textWhite, textH4Style, lineHeightText } = GStyles

    return (
        <View style={foodContainer}>
            {this.renderLoading()}
              <View style={headerContainer}>
                <ScrollHeader title="Good food & restaurants" white noDot />
              </View>
              <View style={textContainer}>
                <MyText style={[textWhite, textH4Style, lineHeightText]}>
                  The best restaurants, delivering to your doorstep
                </MyText>
              </View>

              <View style={scrollMainContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
                    <View style={[scrollContainer, { width: '100%' }]}>
                        {this.renderRestaurants()}
                    </View>
                </ScrollView>
              </View>
              {this.renderEmpty()}
              {this.renderButton()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
    }, 
    scrollMainContainer: {
        marginLeft: 20
    },
    scrollItemContainer: {
        marginRight: '1.8%', width: '21.5%', 
    },
    foodContainer: {
        paddingVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    headerContainer: {
        paddingHorizontal: 20,
    },
    textContainer: {
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginVertical: 40,
    },
    emptyStyles: {
        width: '100%', height: 200,
        marginTop: -40, marginBottom: 20
    },
});

export default ScrollContentFood;
