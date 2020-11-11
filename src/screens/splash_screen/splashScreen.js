import React, { useState, useContext, useEffect } from "react";
import { Container, Header, Content } from "native-base";
import { Image, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import { Styles } from "./splashScreenStyle";

import Geolocation from 'react-native-geolocation-service';
import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';
import { getUser, getToken } from '../../helpers';
import { AppContext } from '../../../AppProvider';


const auraAnimated = require("./../../assets/aura_splash_animation.gif");
// const auraAnimated = require("./../../assets/aura_animation.gif");
const splashTimeout = 3800;

const navigateToTab = async (props) => {
    props.navigation.navigate("Tabs");
    // console.log("moved", new Date().getMinutes(), new Date().getSeconds());
}


const SplashScreen = (props) => {
    const [play, setPlay] = useState(true);
    const context = useContext(AppContext);


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
        request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then((result) => {
            console.log('Request permissions ios ', result)
            switch (result) {
            case 'granted':
                getCurrentPos();
                break;
            default:
                break;
            }
        })
        .catch((error) => {
            console.log('Permissions catched error ', error)
        });
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
        if(userData && token) {
            context.set({ userData, token, isLoggedIn: true })
            context.getUserProfile(token.access_token)
            .catch((error) => {
                console.log('Error caught ', error)
            })
            // console.log('check login userData ', userData, token)
            // if(expired) {
            //     this.props.signOut()
            // } else {
                
            // }
        } 
    }
    useEffect(() => {
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
            <Header androidStatusBarColor={"black"} style={{backgroundColor: "black"}} />
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