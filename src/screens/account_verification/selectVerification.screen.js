import React, { Component } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, Button } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText, Loading } from "../../utils/Index";
import { getIdentityTypesApi } from "../../api/users.api";
import { AppContext } from "../../../AppProvider";
import { consoleLog } from "../../utils";

export default class SelectVerification extends Component {
    static contextType = AppContext;
    
    constructor() {
        super();

        this.state = {
            idTypes: [],
            selectedId: "",
            loading: false,
        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        consoleLog("identification", this.context.state.userData);
        if (this.context.state.idTypes != undefined) {
            this.setState({idTypes: this.context.state.idTypes, selectedId: result[0].id});
        }
        else {
            this.setState({loading: true});
            getIdentityTypesApi().then(result => {
                if (result != undefined) {
                    this.setState({idTypes: result, selectedId: result[0].id, loading: false});
                    this.context.set({idTypes: result})
                }
            });
        }
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    onNext = () => {
        const idExists = this.context.state.userData && this.context.state.userData.identificationDocument;
        this.props.navigation.navigate('UploadVerification', { selectedId: this.state.selectedId, force: idExists})
    }

    render() {
        const {
            textWhite,
            textBold,
            textH4Style,
          } = GStyles;
        return (
            <>
                <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Choose Your Means Of Identification" />
                    {this.renderLoading()}
                    <Container style={[Styles.selectVerificationContainer]}>
                        <Content>
                            <LabelInput
                                label={"Choose ID Type To Add"}
                                picker
                                pickerOptions={this.state.idTypes.map(type => {
                                    return {
                                        label: type.name,
                                        value: type.id,
                                    }
                                })}
                                selectedOption={this.state.selectedId || (this.state.idTypes.length > 0 ? this.state.idTypes[0] : "")}
                                onPickerChange={(e) => this.setState({selectedId: e})}
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <Button
                                transparent 
                                style={[Styles.nextButton,]}
                                onPress={() => this.onNext()}
                            >
                                <MyText style={[textWhite, textH4Style, textBold]}>Next</MyText>
                            </Button>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}