import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton, Loading } from '../../../../utils/Index';

import { Icon } from 'native-base';
import colors from '../../../../colors'
import HouseComponent from '../../HouseComponent'
import { color } from 'react-native-reanimated';
import { urls, GetRequest } from '../../../../utils';

class ScrollContent extends Component {
    constructor(props) {
        super(props);
        this.state = { places: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, loadMore: false };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    renderTourComingSoon = () => {
        const { comingSoonContainer, comingSoonImg } = styles
        const { imgStyle, textH3Style, textExtraBold, textOrange, textCenter } = GStyles
        return (
          <View style={comingSoonContainer}>
            <View style={comingSoonImg}>
              <Image source={require('../../../../assets/images/photo/photo2.png')} style={imgStyle} />
            </View>
            <MyText style={[textExtraBold, textH3Style, textOrange, textCenter]}>Coming Soon</MyText>
          </View>
        )
      }
    renderEmptyContainer = () => {
        const { emptyContainerStyle } = styles;
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        const { loading, places } = this.state
        if(places.length === 0 && !loading) {
            return (
            <View>
                <View style={emptyContainerStyle}>
                <Image source={require('../../../../assets/images/no_house1.png')} style={imgStyle} resizeMode="contain" />
                </View>
                <MyText style={[textBold, textCenter, textOrange]}>No Photographer Found</MyText>
            </View>
            )
        }
    }
    getTopRatedPlaces = async (more=false) => {
        try {
            more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
            const { activePage, perPage, places } = this.state
            const res = await GetRequest(urls.listingBase, 
            `${urls.v}listing/property/toprated/?pageSize=${perPage}&Page=${activePage}`);
            console.log('Res places', res)
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
        } catch (error) {
            
        }
    }

    renderItem = () => {

    }

    componentDidMount = () => {

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
    const { heading, noDivider, onPress, places } = this.props
    const { textH3Style, textExtraBold } = GStyles;
    const { scrollItemContainer, scrollContainer, headerContainer, buttonStyle, buttonContainer, dividerContainer, divider } = styles;
    const { width } = Dimensions.get('window')

    return (
      <View>
        <View style={headerContainer}>
            <MyText style={[textH3Style, textExtraBold]}>{heading}</MyText>
        </View>
        {/* <FlatList
            ListFooterComponent={
                <>
                    {this.renderLoadMore()}
                </>
            }
            ListEmptyComponent={this.renderEmptyContainer()}
            ListFooterComponentStyle={{ marginBottom: 40}}
            ListHeaderComponentStyle={{ marginBottom: 20}}
            data={places}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.8}
            // extraData={selectedId}
        /> */}
        {this.renderTourComingSoon()}
        {!noDivider ? <View style={dividerContainer}>
            <View style={divider}></View>
        </View> : <View></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        paddingHorizontal: 20
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%'
    },
    headerContainer: {
        paddingHorizontal: 20, marginTop: 30
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
    comingSoonContainer: {
        padding: 20
      },
      comingSoonImg: {
        height: 240, width: '100%', marginBottom: 20, borderRadius: 10, overflow: 'hidden'
      }
});

export default ScrollContent;
