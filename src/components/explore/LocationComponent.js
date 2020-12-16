import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import { GetRequest, errorMessage, GOOGLE_API_KEY } from '../../utils';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}



class LocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { region: null, markers: [] };
  }

  componentDidMount = () => {
    const { location } = this.props;
    if(location) {
      const obj =  {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      const defaultMarker = {
        coordinate: { longitude: location.longitude, latitude: location.latitude },
        key: id++,
        color: randomColor()
      }
      const markers = [defaultMarker]
      this.setState({ region: obj, markers })
    } 
  }

  renderMapView = () => {
    const { region, markers } = this.state;
    const { mapContainer } = styles;
    const { imgStyle } = GStyles
    if(region && region.latitude !== null && region.longitude !== null) {
      return (
        <View style={[mapContainer]}>
          <MapView region={this.state.region} onRegionChange={this.onRegionChange} minZoomLevel={15}
            style={{ height: '100%', width: '100%'}} scrollEnabled={false}>
            {markers.map(marker => (
              <Marker key={marker.key} coordinate={marker.coordinate} pinColor={marker.color} />
            ))}
          </MapView>
        </View>
      )
    }
    return (
      <View style={mapContainer}>
        <Image source={require('../../assets/images/globe/globe.png')} resizeMode="contain" style={imgStyle} />
      </View>
    )
  }

  render() {
    const {  contentContainer, divider, container, mapContainer, headerStyle } = styles;
    const { textH2Style, textExtraBold,  textH4Style, imgStyle  } = GStyles;
    const { wrapper, noDivider, address } = this.props
    return (
        <View style={[container, wrapper]}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Location</MyText>
            </View>
            <View style={contentContainer}>
                <MyText style={[textH4Style]}>{address}</MyText>
                <View style={mapContainer}>
                    {this.renderMapView()}
                </View>
            </View>
            {!noDivider ? <View style={divider}></View> : <View></View>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20
    },
    iconStyle: {
        fontSize: 25, marginRight: 25
    },
    mapContainer: {
        width: '100%', height: 230, borderRadius: 8, overflow: 'hidden', marginTop: 15, marginBottom: 30
    },
    contentContainer: {
        
    },
    
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default LocationComponent;
