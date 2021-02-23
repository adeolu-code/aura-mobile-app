import { GetRequest } from './../../../utils';
import Geolocation from 'react-native-geolocation-service';
import { Dimensions, PermissionsAndroid } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
const { width, height } = Dimensions.get('window');

/***
 * Dev: Emeka Dev :)
 */
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class GeolocationHelper {

    /**
     * @param {boolean} runGeolocation
     * @returns {{
     * }} cords
     */
    getCurrentPos = async (runGeolocation=true) => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const cord = position.coords;
                if (runGeolocation) {
                    GeolocationHelper.getGeolocation(cord);
                }

                return {...cord, isError: false}
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                return {...error, isError: true}
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    status = {
        OK: 1,
        FAILED: 0,
        ERROR: -1
    }


    /**
     * generate random color code
     * @returns {`#000000`} randomColor
     */
    static randomColor() {
        return `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, 0)}`;
      }

    /**
     * 
     * @param {double} latitude 
     * @param {double} longitude 
     * @param {Object} delta 
     */
    static getRegionObj(latitude, longitude, delta={latitude: LATITUDE_DELTA, longitude: LONGITUDE_DELTA}, withMarker=false) {
        const id = 0;
        let defaultMarker = {}
        
        const marker = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: delta.latitude,
            longitudeDelta: delta.longitude,
          };
          if (withMarker) {
                defaultMarker = {
                    coordinate: { longitude: delta.longitude, latitude: delta.latitude },
                    key: id++,
                    color: GeolocationHelper.randomColor()
                }
                defaultMarker = [defaultMarker]
            }
          
        return {marker: marker, defaultMarker: defaultMarker}
    }
    
    /***
    * Get Geolocation Data
    * 
    * @param {String} GOOGLE_API_KEY String
    * @param {Object} region
    * @returns {{
    *  "addressDetails": {
    * longitude: any;
    * latitude: any;
    * state: any;
    * country: any;
    * address: any;
    * district: any;
    * }
    *  }} Object
    * 
    */
    static getGeolocation = async (GOOGLE_API_KEY, region={longitude: 0, latitude: 0}) => {
        const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${GOOGLE_API_KEY}`)
        return {
            addressDetails: GeolocationHelper.getAddressDetails(res.results[0]),
        };
        // console.log('Res ', res)
    }
    /***
    * getAddressDetails
    * 
    * @param {Object} Value
    * 
    */
    static getAddressDetails = (res) => {
        const geometryloc = res.geometry.location
        const addressComponents = res.address_components
        const formatted_address = res.formatted_address
        // const addressArr = addressComponents.map(item => item.long_name)
        // const arr = addressArr.splice(addressArr.length - 2, 2)
    
        let countryObj = {};
        let stateObj = {};
        let localityObj = {};
        addressComponents.filter(item => {
            const types = item.types
            const foundCountry = types.find(item => item === 'country')
            const foundState = types.find(item => item === 'administrative_area_level_1')
            const foundLocality = types.find(item => item === 'locality')
            if(foundCountry) {
                countryObj = item
            }
            if(foundState) {
                stateObj = item
            }
            if(foundLocality) {
              localityObj = item
            }
        });

        const locationObj = { 
            longitude: geometryloc.lng, 
            latitude: geometryloc.lat, 
            state: stateObj.long_name, 
            country: countryObj.long_name, 
            address: formatted_address, 
            district: localityObj.long_name
        }
        return locationObj;
    }

    static requestLocationPermission = async () => {
        if(Platform.OS === 'android') {
            this.requestPermissionAndroid()
        } else {
            this.requestPermissionIos()
        }
    };

    requestPermissionAndroid = async () => {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Aura App Location Permission",
              message: "Aura App needs access to your location.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the Location");
            // this.getCurrentPos()
          } else {
            errorMessage('Please grant access to your location to continue')
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn("Warn error ",err);
          errorMessage('Something went wrong, please try again')
        }
    }
    
    requestPermissionIos = async () => {
        request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then((result) => {
            console.log('Request permissions ios ', result)
            switch (result) {
            case 'granted':
                return 1
                break;
            default:
                errorMessage('Please grant access to your location to continue')
                return 0
                break;
            }
        })
        .catch((error) => {
            console.log('Permissions catched error ', error)
            errorMessage('Something went wrong, please try again')
            return -1
        });
    }
}