import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton, Loading, Spinner } from '../../../../utils/Index';

import { Icon } from 'native-base';
import colors from '../../../../colors'
import HouseComponent from '../../../../components/explore/HouseComponent'
import { color } from 'react-native-reanimated';
import { urls, GetRequest } from '../../../../utils';
import { formatAmount, shortenXterLength } from '../../../../helpers';
import { AppContext } from '../../../../../AppProvider';


class ScrollContent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { places: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, loadMore: false };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    linkToHouse = (house) => {
        this.props.navigation.navigate('Other', { screen: 'HouseSingle', params: { house }})
      }
    linkToHouses = () => {
        console.log(this.props)
        this.props.link('two')
    }
    renderEmptyContainer = () => {
        const { emptyContainerStyle } = styles;
        const { width } = Dimensions.get('screen')
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        const { loading, places } = this.state
        if(places.length === 0 && !loading) {
            return (
            <View style={{ width, paddingBottom: 30 }}>
                <View style={emptyContainerStyle}>
                    <Image source={require('../../../../assets/images/no_house1.png')} style={imgStyle} resizeMode="contain" />
                </View>
                <MyText style={[textBold, textCenter, textOrange,textH4Style]}>No Apartments and Hotels Found</MyText>
            </View>
            )
        }
    }
    getTopRatedPlaces = async (more=false) => {
        more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
        const { activePage, perPage, places } = this.state
        
        const res = await GetRequest(urls.listingBase, 
        `${urls.v}listing/property/toprated/?pageSize=${perPage}&Page=${activePage}`);
        more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
        if(res.isError) {
            const message = res.Message;
        } else {
            const dataResult = res.data.data
            let data = []
            if(more) {
                data = [...places, ...dataResult]
            } else {
                data = dataResult
            }
            const pageCount =  Math.ceil(res.data.totalItems / perPage)
            this.setState({ places: data, activePage: res.data.page, totalItems: res.data.totalItems, perPage: res.data.pageSize, pageCount })
        }
    }
    onEndReached = () => {
        const { pageCount, activePage, loadMore } = this.state
        if(activePage < pageCount && !loadMore) {
            this.setState(()=>({ activePage: this.state.activePage + 1}), 
            () => {
                this.getTopRatedPlaces(true)
            })
        }
    }

    renderItem = ({item}) => {
        const { scrollItemContainer } = styles
        const formattedAmount = formatAmount(item.pricePerNight)
        let title = item.title ? item.title : 'no title'
        title = shortenXterLength(title, 18)
        const type = item.propertyType?.name;
        const imgUrl = item.mainImage ? { uri: item.mainImage.assetPath } : require('../../../../assets/images/no_house1.png')
        return (
            <View style={scrollItemContainer}>
                <HouseComponent img={imgUrl} verified={item.isVerified} title={title} location={item.state} onPress={this.linkToHouse.bind(this, item)}
                price={`₦ ${formattedAmount} / night`} {...this.props} rating={item.rating} />
            </View>
        )
    }

    componentDidMount = () => {
        this.getTopRatedPlaces()
    }
    renderLoadMore = () => {
        const { loadMore } = this.state;
        const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles
        if(loadMore) {
            return (
                <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
                    <Spinner size={20} color={colors.orange} />
                    <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
                </View>
            )
        }
    }

  render() {
    const { heading, noDivider, onPress } = this.props
    const { textH3Style, textExtraBold } = GStyles;
    const { scrollItemContainer, scrollContainer, headerContainer, buttonStyle, buttonContainer, dividerContainer, divider } = styles;
    const { width } = Dimensions.get('window')

    const { places, loading } = this.state

    return (
      <View>
        <View style={headerContainer}>
            <MyText style={[textH3Style, textExtraBold]}>{heading}</MyText>
        </View>
        {this.renderLoading()}
        <FlatList
            horizontal={true}
            ListFooterComponent={
                <>
                    {this.renderLoadMore()}
                </>
            }
            ListEmptyComponent={this.renderEmptyContainer()}
            ListFooterComponentStyle={{ marginBottom: 60, marginRight: 80}}
            ListHeaderComponentStyle={{ marginBottom: 20, marginRight: 20}}
            data={places}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.8}
            // extraData={selectedId}
        />
        {places.length !== 0 && !loading ? <View style={buttonContainer}>
            <CustomButton buttonText="View more place" iconName="arrow-right"
                buttonStyle={buttonStyle} onPress={this.linkToHouses} />
        </View> : <></>}
        {!noDivider ? <View style={dividerContainer}>
            <View style={divider}></View>
        </View> : <View></View>}
      </View>
    );
  }
}
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        paddingHorizontal: 20
        // borderWidth: 1
    }, 
    scrollItemContainer: {
        paddingLeft: 20, 
        marginRight: 10,
        width: 0.45 * `${width}`
    },
    headerContainer: {
        paddingHorizontal: 20, marginTop: 30, marginBottom: 30
    },
    buttonContainer: {
        paddingHorizontal: 20, marginTop: 20, marginBottom: 40
    },
    buttonStyle: {
        backgroundColor: colors.black,
      },
    dividerContainer: {
        paddingHorizontal: 20
    },
    divider: {
        height: 1, backgroundColor: colors.lightGrey, width: '100%'
    },
    emptyContainerStyle: {
        height: 160, width: '100%', marginBottom: 20, marginTop: 20,
    }
});

export default ScrollContent;
