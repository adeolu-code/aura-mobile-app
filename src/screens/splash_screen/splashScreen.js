import React, { useState, useContext, useEffect } from "react";
import { Container, Header, Content } from "native-base";
import { Image, TouchableOpacity, PermissionsAndroid, Platform, StatusBar, Alert, BackHandler, Linking } from "react-native";
import { Styles } from "./splashScreenStyle";

import Geolocation from 'react-native-geolocation-service';
import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';
import { getUser, getToken } from '../../helpers';
import { AppContext } from '../../../AppProvider';
import DeviceInfo from 'react-native-device-info';


const auraAnimated = require("./../../assets/aura_splash_animation.gif");
const splashTimeout = 3800;

import AppVersion from '../../../appVersion';

const navigateToTab = async (props) => {
    // props.navigation.navigate("Tabs");
    props.navigation.navigate('Tabs', {screen: 'Explore', params: { screen: 'Explore'} })
    // console.log("moved", new Date().getMinutes(), new Date().getSeconds());
}

const AndroidStoreUrl = 'https://play.google.com/store/apps/details?id=';
const IOSStoreUrl = 'https://apps.apple.com/gh/app/'


const SplashScreen = (props) => {
    const [play, setPlay] = useState(true);
    const context = useContext(AppContext);

    const checkVersion = async () => {
        const res = await GetRequest(urls.identityBase, `${urls.v}auth/version`)
        // console.log('Check version ', res)
        try {
            if(res.isError) {

            } else {
                if(Platform.OS === 'android') {
                    checkAndroid(res.data)
                } else {
                    checkIOS(res.data)
                }
            }
        } catch (error) {
            errorMessage(error.message)
        }
        
        // http.get('versions')
        // .then((res) => {
        //   const data =  res.data;
        //   if(Platform.OS === 'android') {
        //     this.checkAndroid(data.android)
        //   } else {
        //     this.checkIOS(data.ios)
        //   }
        //   console.log('Res ', res)
        // })
        // .catch(error => {
        //   console.log(error)
        //   this.checkLogin()
        //   Notifications.events().registerNotificationOpened( (notification: Notification, completion: () => void) => {
        //     console.log("Notification opened by device user", notification.payload);
        //     completion();
        //   });
        // })
    }
    const checkAndroid = (versionNumber) => {
        if(versionNumber !== AppVersion.android) {
          const bundleId = DeviceInfo.getBundleId();
          const url = `${AndroidStoreUrl}${bundleId}`
          alertMessage(url)
        }
    }
    const checkIOS = (versionNumber) => {
        if(versionNumber !== AppVersion.ios) {
          const url = `${IOSStoreUrl}`
          alertMessage(url)
        } 
    }
    const alertMessage = (url) => {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(url)
              }
            }
          ]
        )
    }
    const requestLocationPermission = async () => {
        if(Platform.OS === 'android') {
            await requestPermissionAndroid()
        } else {
            await requestPermissionIos()
        }
        setTimeout(() => {
            // console.log("timer out", play, new Date().getMinutes(), new Date().getSeconds());
            setPlay(false);
            navigateToTab(props);
        }, splashTimeout);
    };

    const requestPermissionAndroid = async () => {
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
            getCurrentPos()
          } else {
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn("Warn error ",err);
        }
      }
    
    const requestPermissionIos = async () => {
        const request = await Geolocation.requestAuthorization('whenInUse')
        if(request === 'granted') {
            getCurrentPos();
        }
        // request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        // .then((result) => {
        //     console.log('Request permissions ios ', result)
        //     switch (result) {
        //     case 'granted':
        //         getCurrentPos();
        //         break;
        //     default:
        //         break;
        //     }
        // })
        // .catch((error) => {
        //     console.log('Permissions catched error ', error)
        // });
    }
    const getCurrentPos = async () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const cord = position.coords;
                // console.log('Cord ', cord, position)
                context.set({ location: cord })
                // http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${cord.latitude},${cord.longitude}&key=${Dev.API_KEY}`
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    // const checkTokenExpired = (tokenObj) => {
    //     const diff = moment(tokenObj.expires_in).diff(moment(), 'days')
    // }

    const checkLogin = async () => {
        const userData = await getUser()
        const token = await getToken()
        console.log('User await ', userData, token)
        if(userData && token && token.access_token) {
            
            context.getUserProfile(token.access_token)
            .catch((error) => {
                console.log('Error caught ', error)
            })
            context.set({ userData, token, isLoggedIn: true })
            // console.log('check login userData ', userData, token)
            // if(expired) {
            //     this.props.signOut()
            // } else {
                
            // }
        } 
    }
    useEffect(() => {
        checkVersion();
        setContext(context)
        checkLogin()
        requestLocationPermission()
        // setTimeout(() => {
        //     // console.log("timer out", play, new Date().getMinutes(), new Date().getSeconds());
        //     setPlay(false);
        //     navigateToTab(props);
        // }, splashTimeout);
    }, [])

    // setTimeout(() => {
    //     // console.log("timer out", play, new Date().getMinutes(), new Date().getSeconds());
    //     setPlay(false);
    //     navigateToTab(props);
    // }, splashTimeout);

    return (
        <Container>
            <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
            <Content style={Styles.contentStyle} contentContainerStyle={Styles.contentContainerStyle}>
                <TouchableOpacity style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignSelf: "stretch"}} onPress={() => navigateToTab(props)}>
                    {
                        play &&
                        <Image source={auraAnimated} style={Styles.imageStyle} />
                    }
                    
                </TouchableOpacity>
                
            </Content>
        </Container>
    );
}

export default SplashScreen;