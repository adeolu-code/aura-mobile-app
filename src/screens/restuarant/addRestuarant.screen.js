import { Body, Container, Content, Icon, Item, Left, Right, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, Image,TouchableOpacity, TouchableWithoutFeedback, Modal,PermissionsAndroid, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantApi, updateRestaurantApi } from "../../api/restaurant.api";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { MyStyle } from "../../myStyle";
import { consoleLog, errorMessage, GetRequest } from "../../utils";
import { Loading, MyText, CountryPickerComponent } from "../../utils/Index";
import { Styles } from "./restuarant.style";
import AwesomeAlert from 'react-native-awesome-alerts';
import { AppContext } from "../../../AppProvider";
import Geolocation from 'react-native-geolocation-service';
import AutoCompleteComponent from "../../components/explore/AutoCompleteComponent";


export default class AddRestaurant extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            more: false,
            hasData: false,
            restaurant: {},
            street: "",
            state: "",
            country: "",
            zipcode: "",
            defaultCountry: "",
            country: null,
            hasLocation: false,
        };
    }

    componentDidMount() {
        this.getRestaurant();
    }

    requestLocationPermission = async () => {
        if(Platform.OS === 'android') {
            this.requestPermissionAndroid()
        } else {
            this.requestPermissionIos()
        }
    };

    getGeolocation = async (cord) => {
        const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${cord.latitude},${cord.longitude}&key=${GOOGLE_API_KEY}`)
        this.setState({ loading: false })
        this.getAddressDetails(res.results[0])
    }

    getCountry = (country) => {
        this.setState({ country: country.name, toggleAutoComplete: !this.state.toggleAutoComplete })
    }
    
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
            this.getCurrentPos()
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
                this.getCurrentPos();
                break;
            default:
                errorMessage('Please grant access to your location to continue')
                break;
            }
        })
        .catch((error) => {
            console.log('Permissions catched error ', error)
            errorMessage('Something went wrong, please try again')
        });
    }

    getCurrentPos = async () => {
        this.setState({ loading: true })
        Geolocation.getCurrentPosition(
            async (position) => {
                const cord = position.coords;
                this.getGeolocation(cord)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    getSelectedLocation = (value) => {
        const { geometry } = value.details
        const data = value.data
        const city = data.terms[data.terms.length - 2].value
        console.log('Value ', JSON.stringify(data), city)
        // console.log(longitude: geometry.location.lng, latitude: geometry.location.lat)
    
        this.setState(()=>({ street: data.description, city, hasLocation: true }), ()=>{
          
        })
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    getRestaurant = () => {
        this.ss
        getRestaurantApi().then(result => {
            
            if (result != undefined) {
                consoleLog(result);
                this.setState({restaurant: result, hasData: true});
            }
        })
    }

    onAddLocation = () => {
        this.setState({more: false, });
        
        consoleLog(this.state.state, this.state.country, this.state.street, this.state.city ,this.state.zipcode);
        
        if (this.state.state == '' || this.state.country == '' || this.state.street == '' || this.state.city == '' || this.state.zipcode == '') {
            errorMessage('All fields are required.');
            return;
        }
        this.setState({loading: true});

        this.state.restaurant.locations.push({
            country: this.state.country,
            street: this.state.street,
            state: this.state.state,
            city: this.state.city,
            zipCode: this.state.zipcode,
        });
        // update
        updateRestaurantApi(this.state.restaurant.id, this.state.restaurant).then(result => this.setState({loading: false}));
        
        
    }

    initRemoveLocation = (street, state, country) => {
        if (this.state.hasData) {
            this.setState({street: street, state: state, country: country, showDelete: true});
        }
    }

    onRemoveLocation = () => {
        if (this.state.hasData) {
            let locations = this.state.restaurant.locations.filter(x => {
               if (!(this.state.street == x.street && this.state.state == x.state && x.country == this.state.country))  {
                   return x;
               }
            });

            this.state.restaurant.locations = locations;
            this.setState({showDelete: false});
            // update
            updateRestaurantApi(this.state.restaurant.id, this.state.restaurant);
        }
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold, textBlack, textH4Style} = GStyles;
        const { country } = this.state
        let countrySymbol = null;
        try {
            countrySymbol = country ? country.cca2.toLowerCase() : null
        }
        catch {}
        
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Restaurant"} sub={"Name, address and location"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 130}]}>
                        <Content scrollEnabled={true} style={{marginBottom: 20}}>
                            <Image 
                                source={require("./../../assets/images/pizza.jpg")} 
                                style={[Styles.center, Styles.pizzaImage]}
                            />
                            <View>
                                <LabelInput placeholder="Restaurant Name" input value={this.state.hasData && this.state.restaurant.name} />
                                <TouchableOpacity 
                                    onPress={() => this.setState({more: !this.state.more})}
                                    style={[Styles.addIconView]}
                                >
                                    <Icon name="add-outline" style={[Styles.addIcon]} />
                                    <MyText>Add more location</MyText>
                                </TouchableOpacity>
                                {this.state.hasData && <MyText style={[textH3Style, textBold]}>Locations</MyText>}
                                {
                                    this.state.hasData && this.state.restaurant.locations.map(restaurant => {
                                        return (
                                            <Item style={{paddingBottom: 10, paddingTop: 10}}>
                                                <Body style={{minWidth: 120}}>
                                                    <MyText>{restaurant.street} {restaurant.state} {restaurant.country}</MyText>
                                                </Body>
                                                <Right>
                                                    <Icon 
                                                        name="trash" 
                                                        style={{color: colors.orange}} 
                                                        onPress={() => this.initRemoveLocation(restaurant.street, restaurant.state, restaurant.country)}
                                                    />
                                                </Right>
                                            </Item>
                                        );
                                    })
                                }
                            </View>
                            {
                                this.state.more &&
                                <Modal visible={this.state.more} 
                                    onRequestClose={() => { }} 
                                    transparent 
                                    animationType="slide"
                                >
                                    <TouchableWithoutFeedback onPress={() => this.setState({more: false})}>
                                        <View style={[{
                                            backgroundColor: colors.white, 
                                            width: '100%', 
                                            height: '100%', 
                                            padding: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }]}>
                                            <Content>
                                                <MyText style={[textBold, textBlack, textH3Style]}>New Location</MyText>
                                                <MyText style={[textH4Style, colors.greyWhite, { marginBottom: 10}]}>Address</MyText>
                                                    <AutoCompleteComponent 
                                                        locationDetails={this.getSelectedLocation} type={true} 
                                                        autofocus={false} 
                                                        countrySymbol={countrySymbol} 
                                                        key={this.state.toggleAutoComplete} 
                                                        placeholder={this.state.street} 
                                                    />
                                                <View style={[Styles.row, {width: '100%', }]}>
                                                    <CountryPickerComponent
                                                        getCountry={this.getCountry} 
                                                        defaultCountry={this.state.defaultCountry} 
                                                    />
                                                    <LabelInput 
                                                        placeholder={"Enter State"} 
                                                        input 
                                                        onChangeText={(val) => {
                                                            consoleLog("state", val)
                                                            this.setState({state: val})
                                                        }} 
                                                        itemStyle={Styles.halfWidth}
                                                    />
                                                </View>
                                                <View style={[Styles.row, {width: '100%', }]}>
                                                    
                                                    <LabelInput 
                                                        placeholder={this.state.hasLocation ? this.state.city : "Enter City"} 
                                                        input 
                                                        onChangeText={(val) => this.setState({city: val})} 
                                                        itemStyle={Styles.halfWidth}
                                                    />
                                                    <LabelInput 
                                                        placeholder={"Enter Zipcode"} 
                                                        input 
                                                        onChangeText={(val) => this.setState({zipcode: val})} 
                                                        itemStyle={Styles.halfWidth}
                                                    />
                                                </View>
                                                <View style={[Styles.row, {width: '100%', }]}>
                                                    <TouchableOpacity 
                                                    style={[Styles.nextButton, {height: 40, borderRadius: 5}, Styles.halfWidth]}
                                                    onPress={() => this.onAddLocation()}
                                                    >
                                                        <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Submit</MyText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                    style={[Styles.nextButton, {height: 40, borderRadius: 5, marginLeft: 5, backgroundColor: colors.veryLightGrey}, Styles.halfWidth]}
                                                    onPress={() => this.setState({more: false})}
                                                    >
                                                        <MyText style={[textH3Style, textCenter, textBlack, textBold]}>Cancel</MyText>
                                                    </TouchableOpacity>
                                                </View>
                                                
                                            </Content>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal>
                            }
                            <AwesomeAlert
                                show={(this.state.showDelete)}
                                showProgress={false}
                                title={"Delete Address?"}
                                message={this.state.street}
                                closeOnTouchOutside={true}
                                closeOnHardwareBackPress={true}
                                showCancelButton={true}
                                showConfirmButton={true}
                                cancelText="No, cancel"
                                confirmText="Yes, delete it"
                                confirmButtonColor={colors.orange}
                                onCancelPressed={() => {
                                    this.setState({showDelete: false});
                                }}
                                onConfirmPressed={() => {
                                    this.onRemoveLocation();
                                }}
                            />
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}