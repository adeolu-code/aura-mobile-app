/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText, Loading, Spinner} from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import FilterModal from './FilterModal';
import ManagePropertyRow from './ManagePropertyRow';
import { formatAmount, shortenXterLength } from '../../helpers';


import colors from '../../colors';
import { Icon } from 'native-base';

class AllTours extends Component {
    constructor(props) {
        super(props);
        this.state = { showFilterModal: false, loadMore: false, property: null, modalImg: require('../../assets/images/no_house1.png'), refreshing: false };
    }
    linkToSingleHome = (house) => {
        this.props.navigation.navigate('Other', { screen: 'HouseSingle', params: { house } })
    }
    openFilterModal = (item) => {
        const modalImg = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../assets/images/no_house1.png')
        this.setState({ modalImg, property: item, showFilterModal: true  });
    }
    closeFilterModal = () => {
        this.setState({ showFilterModal: false });
    }
    renderLoading = () => {
        const { loading, refreshing } = this.state;
        if ((loading) && !refreshing) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100, elevation: 5 }} />); }
    }
    onEndReached = () => {
        const { set, state, getAllProperties } = this.props.propertyContext
        if(state.activePropertiesPage < state.pagePropertiesCount && !state.loadMoreProperties) {
            set({ activePropertiesPage: state.activePropertiesPage + 1 }, () => {
                getAllProperties(true)
            })
        }
        // console.log('End reached')
    }
    renderLoadMore = () => {
        const { state } = this.props.propertyContext
        const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles
        if(state.loadMoreProperties) {
            return (
            <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
                <Spinner size={20} color={colors.orange} />
                <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
            </View>
            )
        }
    }
    renderItem = ({item}) => {
        const { rowContainer } = styles
        let title = item.title ? item.title : 'No title'
        title = shortenXterLength(title, 18)
        const location = `${item.address}, ${item.state}`
        const imgUrl = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../assets/images/no_house1.png')
        return (
            <View style={rowContainer}>
                <ManagePropertyRow title={title} img={imgUrl} openModal={this.openFilterModal.bind(this, item)} location={location} 
                status={item.status} {...this.props} propertyType={item.propertyType.name} roomType={item.roomType.name} item={item}
                onPress={this.linkToSingleHome.bind(this, item)} />
            </View>
        )
    }
    onRefresh = () => {
        const { set, state, getAllProperties } = this.props.propertyContext
        this.setState({ refreshing: true })
        getAllProperties()
        .finally(() => {
            this.setState({ refreshing: false })
        })
    }
    renderProperties = () => {
        const { properties } = this.props.propertyContext.state
        return (
            <FlatList
                refreshControl={
                    <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing}
                    colors={[colors.orange, colors.success]} progressBackgroundColor={colors.white} />
                }
            //   onRefresh={this.onRefresh}
            //   refreshing={this.state.refreshing}
              ListFooterComponent={
                <>
                  {this.renderLoadMore()}
                </>
              }
              ListEmptyComponent={this.renderEmptyContainer()}
              data={properties}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
        )
    }

    renderEmptyContainer = () => {
        const { emptyContainerStyle } = styles;
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        const { state } = this.props.propertyContext
        if(state.properties.length === 0 && !state.loadingAllProperties) {
            return (
                <View style={{ flex: 1, paddingVertical: 60}}>
                    <View style={emptyContainerStyle}>
                        <Image source={require('../../assets/images/house_searching.png')} style={imgStyle} resizeMode="contain" />
                    </View>
                    <MyText style={[textBold, textCenter, textOrange]}>You have not added properties</MyText>
                </View>
            )
        }
    }

    render() {
        const { contentContainer, rowContainer } = styles
        const { property } = this.state
        return (
            <>
                {this.renderLoading()}
                <View style={contentContainer}>
                    {/* {this.renderProperties()}
                    <FilterModal visible={this.state.showFilterModal} onDecline={this.closeFilterModal} property={property}
                    img={this.state.modalImg}  title={property && property.title ? property.title : 'No title'} {...this.props} /> */}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 210, paddingHorizontal: 20, paddingBottom:30,
    },
    rowContainer: {
        marginBottom: 20, borderRadius: 6, 
        // borderWidth: 1, 
        paddingHorizontal: 1, paddingVertical: 1
    },
    emptyContainerStyle: {
        height: 200, width: '100%', marginBottom: 20
    }
});

export default AllTours;
