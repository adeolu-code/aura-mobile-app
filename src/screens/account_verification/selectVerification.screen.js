import React, { Component } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, Button } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";
import { getIdentityTypesApi } from "../../api/users.api";
import { AppContext } from "../../../AppProvider";

export default class SelectVerification extends Component {
    static contextType = AppContext;
    
    constructor() {
        super();

        this.state = {
            idTypes: [],
            selectedId: "",
        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        console.log("this.context.state.idTypes", this.context.state.idTypes)
        if (this.context.state.idTypes != undefined) {
            this.setState({idTypes: this.context.state.idTypes, selectedId: result[0].id});
        }
        else {
            getIdentityTypesApi().then(result => {
                if (result != undefined) {
                    this.setState({idTypes: result, selectedId: result[0].id});
                    this.context.set({idTypes: result})
                }
            });
        }
    }

    render() {
        const {
            textWhite,
            textBold,
            textH4Style,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Choose Your Means Of Identification" />
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
                                selectedOption={this.state.idTypes.length > 0 ? this.state.idTypes[0] : ""}
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <Button
                                transparent 
                                style={[Styles.nextButton,]}
                                onPress={() => this.props.navigation.navigate('UploadVerification', { selectedId: this.state.selectedId})}
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