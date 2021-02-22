/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./../edit_profile/editProfile.style";
import { Container, Content, Footer } from "native-base";
import { MyText, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import {LabelInput as EditInput} from "../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";
import { forgotPasswordApi } from "../../api/users.api";
import { VALUE_EMPTY } from "../../strings";
import { errorMessage, consoleLog, uploadMultipleFile, prepareMedia } from "../../utils";
import { makeComplaintApi } from "../../api/chat.api";
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerHelper from "../../components/helper/image_picker/imagePicker.helper";

// import DateTimePicker from '@react-native-community/datetimepicker';
// import  from "@react-native-community/picker";

export default class Complaint extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            loading: false,
            propertyId: props.route && props.route.params && props.route.params.propertyId || undefined,
            media: [],
        }
    }

    onSubmit = async () => {
        if (this.state.message == "") {
            errorMessage(VALUE_EMPTY("Complaint message"));
            return;
        }


        let data = {
            "information": this.state.message,
            "media": this.state.media,
        }

        if (this.state.propertyId != undefined) data['property_Id'] = this.state.propertyId;

          this.setState({loading: true});
          
          await makeComplaintApi(data).then(result => {
              consoleLog("update_res", "complaint", result);
              if (result != undefined && result.isError != true) {
                if (this.state.propertyId != undefined) this.props.navigation.navigate('Bookings');
              }
          });
          this.setState({loading: false});
          
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    selectFiles = async () => {
        const images = await ImagePickerHelper();
        consoleLog("update_res", "images", images);
        if (images['status']) {
            images['data'].map(image => {
                this.setState({
                    media: [...this.state.media, image],
                });
                setTimeout(() => {
                    consoleLog("update_res", "media", this.state.media);
                }, 1000);
            })
        }
    }

    uploadAttachments = async () => {
        consoleLog("update_res", "media", this.state.media);
        this.setState({loading: true});
        if (this.state.media.length > 0) {
            await uploadMultipleFile(this.state.media).then(result => {
                if (result && result.data) {
                    // save ids
                    this.setState({media: []});
                    
                    result.data.map(data => {
                        this.setState({media: [...this.state.media, data.fileName]});
                    });
                    
                }
            }).finally(() => this.setState({loading: true}));
        }

        consoleLog("update_res", "media", this.state.media);

        this.onSubmit();
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold} = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={(this.state.propertyId != undefined) ? "REPORT HOST" : "SUBMIT COMPLAINT OR GIVE SUGGESTION"} onPress={() => this.props.navigation.navigate('Profile')} />
                    {this.renderLoading()}
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <EditInput 
                                label={"Message"} 
                                placeholder={"Hi, I would like to ..."} 
                                onChangeText={(e) => this.setState({message: e})}
                                value={this.state.message}
                                textarea
                                rowSpan={5}
                            />
                            <TouchableOpacity 
                                style={[Styles.nextButton, {height: 40, borderRadius: 5}]}
                                onPress={() => this.selectFiles()}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Select Attachment</MyText>
                            </TouchableOpacity>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {height: 40, borderRadius: 5}]}
                                onPress={() => this.uploadAttachments()}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Submit</MyText>
                            </TouchableOpacity>
                            
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}