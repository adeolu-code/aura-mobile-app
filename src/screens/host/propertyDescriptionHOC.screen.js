import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image, Keyboard  } from "react-native";
import { Styles } from "./host.style";
import { Container, Content, View, Icon } from "native-base";
import colors from "../../colors";
import GStyles from "../../assets/styles/GeneralStyles";
import { MyText, CustomButton, Loading } from "../../utils/Index";

import { urls, Request, errorMessage } from '../../utils'
import { AppContext, AppConsumer } from '../../../AppProvider';
import { ManagePropertyContext, ManagePropertyConsumer } from '../../../ManagePropertyProvider';
import PropertyDescription from './propertyDescription.screen'

export default class PropertyDescriptionHOC extends Component {
    static contextType = AppContext
    constructor() {
        super();
        this.state = { };
    }
    
    render () {
        const {
            textBlack, textBold, textH4Style, textGrey,
            textH2Style,
            textWhite,
            textCenter
          } = GStyles;
          return (
            <AppConsumer>
              {(appContext) => (
                <ManagePropertyConsumer>
                  {(values) => (
                    <PropertyDescription appContext={appContext} propertyContext={values} {...this.props} />
                  )}
                </ManagePropertyConsumer>
              )}
            </AppConsumer>
          );
    }
}