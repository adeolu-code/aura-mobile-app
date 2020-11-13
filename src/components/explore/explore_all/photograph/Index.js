import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, Spinner, Loading } from '../../../../utils/Index';
import colors from '../../../../colors';

import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';
import { urls, GetRequest } from '../../../../utils'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographers: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, loadMore: false,
    };
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }
  renderItem = ({item}) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    const coverPhoto = item.coverPhoto ? {uri: item.coverPhoto} : require('../../../../assets/images/no_photo_img.png')
    return (
      <View style={{paddingHorizontal: 20}}>
        <ItemComponent title={fullName} price="₦ 3,000" location="Lagos" verified={item.isVerified}
            img={coverPhoto} />
      </View>
    )
    
  }

  renderEmptyContainer = () => {
    const { emptyContainerStyle } = styles;
    const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
    const { loading, photographers } = this.state
    if(photographers.length === 0 && !loading) {
      return (
        <View>
          <View style={emptyContainerStyle}>
            <Image source={require('../../../../assets/images/no_photo.png')} style={imgStyle} resizeMode="contain" />
          </View>
          <MyText style={[textBold, textCenter, textOrange]}>No Photographer Found</MyText>
        </View>
      )
    }
  }
  componentDidMount = () => {
    this.getPhotographers()
  }

  getPhotographers = async (more=false) => {
      const { perPage, activePage } = this.state
      this.setState({ loading: true })
      const res = await GetRequest(urls.photographyBase, 
      `${urls.v}photographer/all?Size=${perPage}&Page=${activePage}`);
      console.log('Res places', res)
      more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
      if(res.isError) {
        const message = res.Message;
      } else {
        const dataResult = res.data.data
        const pageCount =  Math.ceil(res.data.totalItems / perPage)
        this.setState({ photographers: dataResult, activePage: res.data.page, totalItems: res.data.totalItems, perPage: res.data.pageSize, pageCount })
      }
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
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey } = GStyles
    const { photographers } = this.state
    return (
      <Fragment>
        <View style={contentMainContainer}>
          {this.renderLoading()}
          
            <FlatList
              ListHeaderComponent={
                <>
                  <View style={container}>
                    <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Photographers On Aura</MyText>
                  </View>
                </>
              }
              ListFooterComponent={
                <>
                  {this.renderLoadMore()}
                </>
              }
              ListEmptyComponent={this.renderEmptyContainer()}
              ListFooterComponentStyle={{ marginBottom: 40}}
              ListHeaderComponentStyle={{ marginBottom: 20}}
              data={photographers}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
            
        </View>
      </Fragment>
      // <View style={container}>
      //   <TouchableOpacity style={filterContainer}>
      //     <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
      //   </TouchableOpacity>
      //   <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Photographers On Aura</MyText>
      //   <View style={contentContainer}>
      //     <ItemComponent title="Carmen Cooper" price="₦ 3,000" location="Lagos" verified
      //     img={require('../../../../assets/images/photo/photo.png')} />
      //     <ItemComponent title="Benjamin Rivera" price="₦ 3,600" location="Ibadan" 
      //     img={require('../../../../assets/images/photo/photo2.png')} />
      //     <ItemComponent title="Chuka Obi" price="₦ 4,000" location="Abuja" verified
      //     img={require('../../../../assets/images/photo/photo3.png')} />
      //     <ItemComponent title="Kelechi Amadi" price="₦ 9,000" location="Lagos" 
      //     img={require('../../../../assets/images/photo/photo5.png')} />
      //   </View>
      // </View>
    );
  }
}


const styles = StyleSheet.create({
  contentMainContainer: {
      marginTop:180,
  },
  container: {
    paddingHorizontal: 20
  },
  
  contentContainer: {
    paddingVertical: 30
  },
  filterContainer: {
    borderRadius: 30, borderWidth:1, borderColor: colors.darkGrey, paddingHorizontal: 20, paddingTop: 4, paddingBottom:6, 
    flexDirection: 'row', alignSelf: 'flex-start', marginTop: 20
  },
  emptyContainerStyle: {
    height: 200, width: '100%', marginBottom: 20
  }
});

export default Index;
