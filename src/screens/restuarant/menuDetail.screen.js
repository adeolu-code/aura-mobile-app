import { Container, Content, Footer, View } from "native-base";
import React,{ Component } from "react";
import { Pressable, RefreshControl, TouchableOpacity,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantCuisineApi, getRestaurantServicesApi, getRestaurantOperationApi,updateRestaurantPhotoMenuApi, uploadRestaurantPhotoMenuApi } from "../../api/restaurant.api";
import GStyles from "../../assets/styles/GeneralStyles";
import colors from "../../colors";
import Header from "../../components/Header";
import { Loading, MyText } from "../../utils/Index";
import { Styles } from "./restuarant.style";
import moment from "moment";
import NoContent from "../../components/no_content/noContent.component";
import { FlatList } from "react-native-gesture-handler";
import { consoleLog, uploadImageApi,errorMessage } from "../../utils";
import { MyStyle } from "../../myStyle";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { RoundButton } from "../../components/helper/components/round_button/roundButton.component";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";
import ImagePickerHelper from "../../components/helper/image_picker/imagePicker.helper";
import RNFetchBlob from "rn-fetch-blob";
import { FILE_NOT_UPLOADED } from "../../strings";
import { AppContext } from "../../../AppProvider";



const menuItem = {
    "category": "",
    "mealName": "",
    "cuisine": "",
    "price": 0,
    "isCoverPhoto": false,
    "profileId": "",
    "description": "",
    "assetPath": ""
  }

export default class RestaurantMenuDetail extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            cuisines: [],
            page: 1,
            size: 20,
            menu: props.route?.params?.menu || menuItem,
            services: [],
            operations: [],
            isEdit: props.route?.params?.menu != undefined,
            isCaptured: false,
            image: undefined,

        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.setState({loading: true});
        getRestaurantCuisineApi(this.state.page,this.state.size).then(result => {
            // consoleLog("res_menu","getRestaurantCuisineApi", result);
            if (result != undefined) {
                this.state.menu.cuisine = result[0].id;
                this.setState({cuisines: result});

            }
            this.setState({loading: false});
            
        });

        getRestaurantServicesApi().then(result => {
            if (result != undefined) {
                this.state.menu.category = result[0].name;
                this.setState({services: result});
            }
        });
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    onSave = async () => {
        this.setState({loading: true});
        let imageResult = undefined;
        
        if (this.state.isCaptured) {
            // upload image first to storage
            const {image} = this.state;
            const filename = image.uri.substr(image.uri.lastIndexOf("/")).replace("/","");
            imageResult = await uploadImageApi([
                { 
                    name : 'File', filename : filename, type: image.mime, data: RNFetchBlob.wrap(decodeURIComponent(Platform.OS == "ios" ? String(image.uri).replace("file://","") : String(image.uri)))
                },
                {
                    name: 'FileName', 
                    data: String(filename),
                 }
            ]).then(result => {
                result = JSON.parse(result.data);
                return result;
            });
        }

        
        if (this.state.isEdit) {
            if (this.state.isCaptured) {
                this.state.menu.assetPath = imageResult.data.fileName;
            }

            console.log("menu", this.state.menu);
            await updateRestaurantPhotoMenuApi(this.state.menu?.id, this.state.menu);
        }
        else {
            let data = {
                "category": this.state.menu.category,
                "mealName": this.state.menu.mealName,
                "cuisine": this.state.menu.cuisine,
                "price": this.state.menu.price,
                "isCoverPhoto": this.state.menu.isCoverPhoto,
                "profileId": this.props.route.params.profileId,
                "description": this.state.menu.description,
                "assetPath": this.state.menu.assetPath
            }

            if (imageResult.isError == false) {
                data.assetPath = imageResult.data.fileName;
                
                
                uploadRestaurantPhotoMenuApi(this.props.route.params.profileId, imageResult.data.fileName, {
                    "profileId": this.props.route.params.profileId,
                    "description": data.description,
                    "photos": [
                        imageResult.data.fileName
                    ]
                }).then(uploadResult => {
                    
                    if (uploadResult && !uploadResult.isError) {
                        // update photo menu with details
                        updateRestaurantPhotoMenuApi(uploadResult[uploadResult.length - 1].id, data).then(result => { 
                            if (result) {
                                this.state.menu = menuItem;
                                this.setState({});
                            } 
                        })
                    }
                })
            }
            else {
                errorMessage(imageResult.message || FILE_NOT_UPLOADED);
            }
        }

        this.setState({loading: false});
    }

    selectImage = async () => {
        const image = await ImagePickerHelper({multiple: false, cropping: true});
        
        if (image.status) {
            this.setState({isCaptured: true, image: image.image});
        }
        
    }


    render() {
        const {textCenter, textH3Style, textWhite, textBold, textUnderline, textOrange} = GStyles;
        let uri = require("./../../assets/images/food_bg/food_bg.png");
        consoleLog("res_menu", "uri", uri);
        if (this.state.isCaptured) {
            uri = this.state.image;
        }

        else if (this.state.menu && this.state.menu?.assetPath) {
            uri = {uri: this.state.menu?.assetPath};
        }
        consoleLog("res_menu", "uri", uri);


        

        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Menu Detail"} sub={""} />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 150}]}>
                        <Content scrollEnabled={true}>
                            <View style={[MyStyle.row]}>
                                <View style={[Styles.itemParentView,{height: null}, MyStyle.pd10]}>
                                    <View style={[MyStyle.fullWidth, {marginBottom: 5}]}>
                                        <Image source={uri} style={[MyStyle.customWidth("100%"), MyStyle.hPx(140), {marginLeft: 10}]} />
                                        <TouchableOpacity onPress={() => this.selectImage()}>
                                            <MyText style={[textUnderline, textOrange, {marginTop: 10, marginBottom: 10, height: 40}]}>Tap to Select Photo</MyText>
                                        </TouchableOpacity>
                                        <View style={[Styles.textSection]}>
                                            <View style={[Styles.textView]}>
                                                <LabelInput 
                                                    label={"Service"} 
                                                    picker
                                                    itemStyle={{marginLeft: 5}}
                                                    onPickerChange={(val) => {
                                                        this.state.menu.category = val;
                                                        this.setState({});
                                                    }}
                                                    selectedOption={this.state.menu?.category}
                                                    pickerOptions={this.state.services.map(service => {
                                                        return {label: service.name, value: service.name}
                                                    })}
                                                />
                                                <LabelInput 
                                                    label="Meal"
                                                    value={this.state.menu?.mealName}
                                                    onChangeText={(val) => {
                                                        this.state.menu.mealName=val;
                                                        this.setState({});
                                                    }}
                                                />
                                                <LabelInput 
                                                    label={"Cuisine"} 
                                                    picker
                                                    itemStyle={{marginLeft: 5}}
                                                    onPickerChange={(val) => {
                                                        this.state.menu.cuisine = val;
                                                        this.setState({});
                                                    }}
                                                    pickerOptions={this.state.cuisines.map(cuisine => {
                                                        return {label: cuisine.name, value: cuisine.id}
                                                    })}
                                                    selectedOption={this.state.menu?.cuisine}
                                                />
                                                <LabelInput 
                                                    label="Price"
                                                    value={this.state.menu?.price}
                                                    onChangeText={(val) => {
                                                        this.state.menu.price=val;
                                                        this.setState({});
                                                    }}
                                                />
                                                <LabelInput 
                                                    label="Description"
                                                    value={this.state.menu?.description}
                                                    textarea
                                                    onChangeText={(val) => {
                                                        
                                                        this.state.menu.description=val;
                                                        this.setState({});
                                                    }}
                                                />
                                                <LabelCheckbox label={"Cover Photo?"} checked={this.state.menu?.isCoverPhoto} onPress={(val) => {
                                                    
                                                    this.state.menu.isCoverPhoto = !this.state.menu.isCoverPhoto;
                                                    this.setState({});
                                                }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Content>
                        <Footer style={[MyStyle.transparent]}>
                            <RoundButton label="Save" onClick={() => this.onSave()} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}
