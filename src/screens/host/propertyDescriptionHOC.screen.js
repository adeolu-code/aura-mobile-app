import React, { Component } from "react";
import { StatusBar } from "react-native";
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