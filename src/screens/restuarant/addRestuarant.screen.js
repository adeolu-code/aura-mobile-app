import { Body, Container, Content, Footer, Icon, Item as NBItem, Left, Right, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, Image,TouchableOpacity, TouchableWithoutFeedback, Modal,PermissionsAndroid, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantApi, updateRestaurantApi, getRestaurantOpenTimeApi, getRestaurantOpenDaysApi, getRestaurantServicesApi, getRestaurantOperationApi, saveRestaurantApi } from "../../api/restaurant.api";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { MyStyle } from "../../myStyle";
import { consoleLog, errorMessage, GetRequest, GOOGLE_API_KEY, RESTAURANT } from "../../utils";
import { Loading, MyText, CountryPickerComponent } from "../../utils/Index";
import { Styles } from "./restuarant.style";
import AwesomeAlert from 'react-native-awesome-alerts';
import { AppContext } from "../../../AppProvider";
import Geolocation from 'react-native-geolocation-service';
import AutoCompleteComponent from "../../components/explore/AutoCompleteComponent";
import RadioButton from "../../components/explore/tour_single/RadioButton";
import Item from "../../components/label_checkbox/labelCheckbox.component";
// import { PERMISSIONS } from "react-native-permissions";

const LabelCheckbox = Item;
const restaurantObject = {
    "name": "",
    "locations": [],
    "contactPhoneNumber": "",
    "averageDeliveryFee": 0,
    "openTime": "",
    "closeTime": "",
    "isAlcoholAllowed": true,
    "isSeatAvailable": true,
    "operations": [],
    "services": [],
    "openDays": []
  }

export default class AddRestaurant extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            restaurantLocation: false,
            restaurantOpening: false,
            restaurantContact: false,
            hasData: false,
            restaurant: restaurantObject,
            street: "",
            state: "",
            country: "",
            zipcode: "",
            defaultCountry: "",
            country: null,
            hasLocation: false,
            host: (props.route.params != undefined && props.route.params.host != undefined),
            showModal: false,
        };
        
    }

    componentDidMount() {
        this.init();
        this.state.restaurant.contactPhoneNumber = this.context.state.userData.phoneNumber;
        
        if (!this.state.host) {
            this.getRestaurant();
        }

        this.requestLocationPermission();
        
    }

    init = () => {
        this.setState({loading: true});
        getRestaurantOpenDaysApi().then(result => {
            if (result != undefined) {
                this.setState({openDays: result});
            }
        });
        getRestaurantOpenTimeApi().then(result => {
            if (result != undefined) {
                this.setState({openTime: result});
            }
        });
        getRestaurantServicesApi().then(result => {
            if (result != undefined) {
                this.setState({services: result});
            }
        });
        getRestaurantOperationApi().then(result => {
            if (result != undefined) {
                this.setState({operations: result});
            }
        });
        this.setState({loading: false});
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
                // this.getCurrentPos();
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
        this.setState({loading: true});
        getRestaurantApi().then(result => {
            if (result != undefined) {
                consoleLog("update_res", "result", result);
                this.setState({restaurant: result, hasData: true, loading: false});
                this.state.restaurant.operations.map(operation => this.setState({["OP_" + operation.id]: true}));
                this.state.restaurant.services.map(service => this.setState({["OS_" + service.id]: true}));
                this.state.restaurant.openDays.map(openDay => this.setState({["OD_" + openDay.id]: true}));
            }
        }).finally(err => {
            this.setState({loading: false});
        });
    }

    onAddLocation = () => {
        this.setState({restaurantLocation: false, });
        
        if (this.state.state == '' || this.state.country == '' || this.state.street == '' || this.state.city == '' || this.state.zipcode == '') {
            errorMessage('All fields are required.');
            return;
        }
        if (!this.state.host) this.setState({loading: true});

        this.state.restaurant.locations.push({
            country: this.state.country,
            street: this.state.street,
            state: this.state.state,
            city: this.state.city,
            zipCode: this.state.zipcode,
        });
        if (this.state.host) {
            this.setState({
                restaurantLocation: false,
            });
        }
        else {
            // update
            updateRestaurantApi(this.state.restaurant.id, this.state.restaurant).then(result => this.setState({loading: false}));
        }
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

    saveRestaurant = async () => {
        
        // get opening times
        let keys = Object.keys(this.state);
        consoleLog("update_res", "keys", keys);
        if (!this.state.host) 
        {
            this.state.restaurant.openDays = [];
            this.state.restaurant.services = [];
            this.state.restaurant.operations = [];
        }

        keys.map(key => {
            if (key.startsWith("OD_")) {
                // let openDays = this.state.openDays.filter(x => {
                //     if (x.id == key.split('_')[1] && this.state[key]) {
                //         return JSON.stringify(x);
                //     }
                // })[0];
                if (this.state[key]) {
                    let openDays = key.split("_")[1];
                    this.state.restaurant.openDays.push(openDays);
                }
                
            }
            else if (key.startsWith("OP_")) {
                // let operation = this.state.operations.filter(x => {
                //     if (x.id == key.split('_')[1] && this.state[key]) {
                //         return JSON.stringify(x);
                //     }
                // })[0]
                if (this.state[key]) {
                    let operation = key.split("_")[1];
                    this.state.restaurant.operations.push(operation);
                }
                
            }
            
            else if (key.startsWith("OS_")) {
                // let service = this.state.services.filter(x => {
                //     if (x.id == key.split('_')[1] && this.state[key]) {
                //         return JSON.stringify(x);
                //     }
                // })[0]
                if (this.state[key]) {
                    let service = key.split("_")[1];
                    this.state.restaurant.services.push(service);
                }
                
            }
        });
        consoleLog(JSON.stringify(this.state.restaurant));
        
        const {restaurant} = this.state;
        consoleLog("update_res", "restaurant", restaurant);
        if (restaurant.name == "" || restaurant.openDays.length == 0 || restaurant.services.length == 0) {
            
            if (restaurant.openDays.length == 0) {
                errorMessage("Please fill Open Days");
            }
            else if (restaurant.name === "") {
                errorMessage("Please fill Restaurant Name");
            }
            else if (restaurant.services.length == 0) {
                errorMessage("Please fill Services offerred");
            }
            else {
                errorMessage("Please fill all field");
            }
            
            this.setState({loading: false});
            return;
        }

        if (!this.state.host) {
            updateRestaurantApi(this.state.restaurant.id, this.state.restaurant).then(result => this.setState({loading: false}));
        }
        else {
            // hosting
            await saveRestaurantApi(this.state.restaurant).then(result => {
                this.getRestaurant();
                this.setState({loading: false});
                // add restuarant to context
                if (this.context.state.userData && this.context.state.userData.roles) {
                    this.context.state.userData.roles.push(RESTAURANT);
                    this.context.set({});
                }
                
            });

        }
        
    }

    onSelectionChanged = (index) => {
        if (index == 0) {
            this.setState({newNumber: 0,});
            this.setState({contactPhoneNumber: this.context.state.userData.phoneNumber});
        }
        else {
            this.setState({newNumber: 1});
        }
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold, textBlack, textUnderline, textH4Style} = GStyles;
        const { country } = this.state;
        const host = this.state.host;
        let countrySymbol = null;
        try {
            countrySymbol = country ? country.cca2.toLowerCase() : null
        }
        catch {}
        
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={host ? "Host Restaurant" : "Restaurant"} sub={"Name, address and location"} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 140}]}>
                        <Content scrollEnabled={true} style={{marginBottom: 20}}>
                            <Image 
                                source={require("./../../assets/images/pizza.jpg")} 
                                style={[Styles.center, Styles.pizzaImage]}
                            />
                            <View>
                                <LabelInput 
                                    placeholder="Restaurant Name" 
                                    input 
                                    value={this.state.restaurant.name}
                                    onChangeText={(text) => this.setState({restaurant: {...this.state.restaurant, ...{name: text}}})}
                                />
                                <TouchableOpacity 
                                    onPress={() => this.setState({restaurantLocation: true, showModal: true})}
                                    style={[Styles.addIconView]}
                                >
                                    <Icon name="add-outline" style={[Styles.addIcon]} />
                                    <MyText>Add {!host && 'more '}location</MyText>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => this.setState({restaurantContact: true, showModal: true})}
                                    style={[Styles.addIconView]}
                                >
                                    <Icon name="pencil" style={[Styles.addIcon,]} />
                                    <MyText>Edit Restaurant</MyText>
                                </TouchableOpacity>
                                {this.state.hasData && <MyText style={[textH3Style, textBold]}>Locations</MyText>}
                                {
                                    this.state.hasData && this.state.restaurant.locations.map(restaurant => {
                                        return (
                                            <NBItem style={{paddingBottom: 10, paddingTop: 10}}>
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
                                            </NBItem>
                                        );
                                    })
                                }
                            </View>
                            {
                                this.state.showModal &&
                                <Modal visible={this.state.showModal} 
                                    onRequestClose={() => this.setState({showModal: false})} 
                                    transparent 
                                    animationType="slide"
                                >
                                    <TouchableWithoutFeedback onPress={() => {
                                        !this.state.host && this.setState({showModal: false});
                                        if (!this.state.host) {
                                            this.setState({restaurantContact: false, restaurantLocation: false, restaurantOpening: false})
                                        }
                                }}>
                                        <View style={[{
                                            backgroundColor: colors.white, 
                                            width: '100%', 
                                            height: '100%', 
                                            padding: 30,
                                            justifyContent: 'center',
                                            alignNBItems: 'center',
                                        }]}>
                                            <Content>
                                                { this.state.restaurantLocation && <>
                                                    <MyText style={[textBold, textBlack, textH3Style, {padding: 10}]}>Add Location</MyText>
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
                                                        onPress={() => {
                                                            this.onAddLocation();
                                                            this.setState({restaurantContact: true})
                                                        }}
                                                        >
                                                            <MyText style={[textH3Style, textCenter, textWhite, textBold]}>
                                                                {this.state.edit ? 'Submit' : 'Next'}
                                                            </MyText>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                        style={[Styles.nextButton, {height: 40, borderRadius: 5, marginLeft: 5, backgroundColor: colors.veryLightGrey}, Styles.halfWidth]}
                                                        onPress={() => {
                                                            this.setState({restaurantLocation: false});
                                                            if (!this.state.host) {
                                                                this.setState({restaurantContact: false, restaurantLocation: false, restaurantOpening: false, showModal: false})
                                                            }
                                                        }}
                                                        >
                                                            <MyText style={[textH3Style, textCenter, textBlack, textBold]}>Cancel</MyText>
                                                        </TouchableOpacity>
                                                    </View>
                                                </>
                                                }

                                                { this.state.restaurantContact && <>
                                                    <MyText style={[textBold, textBlack, textH3Style, {padding: 10}]}>
                                                        Contact Number at Restaurant
                                                    </MyText>
                                                    <MyText style={[textBold, textUnderline]}>{this.state.restaurant.contactPhoneNumber || this.context.state.userData.phoneNumber}
                                                    </MyText>
                                                    <RadioButton 
                                                        style={[{marginTop: 30}]}
                                                        options={[
                                                            {key: "yes", text: "Yes, my customers can contact me on this number"},
                                                            {key: "no", text: "No, add another number"},
                                                            
                                                        ]} 
                                                        selectedOption={"yes"}
                                                        onPress={(e) => this.onSelectionChanged(e)}
                                                    />
                                                    {
                                                        this.state.newNumber == 1 &&
                                                        <LabelInput
                                                            label={"Phone Number"}
                                                            phone
                                                            onChangeText={(phone) => {
                                                                this.state.restaurant.contactPhoneNumber = phone;
                                                                this.setState({});
                                                            }}
                                                        />
                                                    }
                                                    {
                                                        this.state.operations && this.state.operations.map((operation, index) => 
                                                            {
                                                                let key = "OP_"+operation.id;
                                                            return (<LabelCheckbox
                                                                key={index}
                                                                label={operation.name}
                                                                checked={this.state[key]}
                                                                onPress={() => {
                                                                    const currentState = !this.state[key];

                                                                    this.setState({[key]: currentState})
                                                                }}
                                                            />
                                                            )}
                                                        )
                                                    }
                                                    {
                                                        this.state["OP_3040d51f505849fd9f05a684a72eea09"] != undefined &&
                                                        <LabelInput 
                                                            input
                                                            placeholder={"Average Delivery fee"}
                                                            onChangeText={(text) => this.state.restaurant.averageDeliveryFee = text}
                                                            keyboardType={"numeric"}
                                                            value={this.state.restaurant.averageDeliveryFee}
                                                        />
                                                    }
                                                    <View style={[Styles.row, {width: '100%', }]}>
                                                        <TouchableOpacity 
                                                        style={[Styles.nextButton, {height: 40, borderRadius: 5}, Styles.halfWidth]}
                                                        onPress={() => this.setState({
                                                            restaurantOpening: true, restaurantContact: false
                                                        })}
                                                        >
                                                            <MyText style={[textH3Style, textCenter, textWhite, textBold]}>
                                                                {this.state.edit ? 'Submit' : 'Next'}
                                                            </MyText>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                        style={[Styles.nextButton, {height: 40, borderRadius: 5, marginLeft: 5, backgroundColor: colors.veryLightGrey}, Styles.halfWidth]}
                                                        onPress={() => {
                                                            this.setState({restaurantContact: false});
                                                            if (!this.state.host) {
                                                                this.setState({restaurantContact: false, restaurantLocation: false, restaurantOpening: false, showModal: false})
                                                            }
                                                        }}
                                                        >
                                                            <MyText style={[textH3Style, textCenter, textBlack, textBold]}>Cancel</MyText>
                                                        </TouchableOpacity>
                                                    </View>
                                                </>}
                                                
                                                { this.state.restaurantOpening && <>
                                                    <MyText style={[textBold, textBlack, textH3Style, {padding: 10}]}>
                                                        Opening Hours
                                                    </MyText>
                                                    {
                                                        this.state.openDays && this.state.openDays.map((operation, index) => 
                                                            {
                                                                let key = "OD_" + operation.id;
                                                            return (<LabelCheckbox
                                                                key={index}
                                                                label={operation.name}
                                                                checked={this.state[key]}
                                                                onPress={() => this.setState({[key]: !this.state[key]})}
                                                            />
                                                            )}
                                                        )
                                                    }
                                                    {
                                                        this.state.openTime && 
                                                        <LabelInput 
                                                            picker 
                                                            label={"From"}
                                                            pickerOptions={this.state.openTime.map((time, index) => {
                                                                let key = time.id;
                                                                return {value: time.name, label: time.name};
                                                                })
                                                            }
                                                            onPickerChange={(sel) => {
                                                                this.state.restaurant.openTime = sel;
                                                                this.setState({});
                                                            }}
                                                            selectedOption={
                                                                this.state.restaurant.openTime
                                                            }

                                                        />
                                                    }
                                                    {
                                                        this.state.openTime && 
                                                        <LabelInput 
                                                            picker 
                                                            label={"To"}
                                                            pickerOptions={this.state.openTime.map((time, index) => {
                                                                let key = time.id;
                                                                return {value: time.name, label: time.name};
                                                                })
                                                            }
                                                            onPickerChange={(sel) => {
                                                                this.state.restaurant.closeTime = sel;
                                                                this.setState({});
                                                            }}
                                                            selectedOption={
                                                                this.state.restaurant.closeTime
                                                            }
                                                            itemStyle={{marginBottom: 10}}
                                                        />
                                                    }
                                                    {
                                                        this.state.services && this.state.services.length > 0 && <MyText style={[textBlack, textH3Style]}>Services</MyText>
                                                    }
                                                    {
                                                        this.state.services && this.state.services.map((service, index) => 
                                                            {
                                                                let key = "OS_" + service.id;
                                                            return (<LabelCheckbox
                                                                key={index}
                                                                label={service.name}
                                                                checked={this.state[key]}
                                                                onPress={() => this.setState({[key]: !this.state[key]})}
                                                            />
                                                            )}
                                                        )
                                                    }
                                                    <View style={[Styles.row, {width: '100%', }]}>
                                                        <TouchableOpacity 
                                                        style={[Styles.nextButton, {height: 40, borderRadius: 5},]}
                                                        onPress={() => this.setState({
                                                            restaurantContact: false, restaurantLocation: false, restaurantOpening: false,
                                                            showModal: false,
                                                        })}
                                                        >
                                                            <MyText style={[textH3Style, textCenter, textWhite, textBold]}>
                                                                {this.state.edit ? 'Submit' : 'Next'}
                                                            </MyText>
                                                        </TouchableOpacity>
                                                        {/* <TouchableOpacity 
                                                        style={[Styles.nextButton, {height: 40, borderRadius: 5, marginLeft: 5, backgroundColor: colors.veryLightGrey}, Styles.halfWidth]}
                                                        onPress={() => this.setState({restaurantLocation: false})}
                                                        >
                                                            <MyText style={[textH3Style, textCenter, textBlack, textBold]}>Cancel</MyText>
                                                        </TouchableOpacity> */}
                                                    </View>
                                                </>}
                                                
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
                        <Footer style={[MyStyle.transparent,]}>
                            <TouchableOpacity 
                            style={[Styles.nextButton, {height: 40, borderRadius: 5}]}
                            onPress={() => {this.setState({loading: true}); this.saveRestaurant()}}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>{'Submit'}</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}