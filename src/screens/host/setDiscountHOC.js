import React, { Component } from "react";
import { AppContext, AppConsumer } from '../../../AppProvider';
import { ManagePropertyContext, ManagePropertyConsumer } from '../../../ManagePropertyProvider';


import SetDiscount from "./setDiscount";

export default class SetDiscountHOC extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render () {
        return (
            <AppConsumer>
                {(appContext) => (
                    <ManagePropertyConsumer>
                        {(values) => (
                            <SetDiscount appContext={appContext} propertyContext={values} {...this.props} />
                        )}
                    </ManagePropertyConsumer>
                )}
            </AppConsumer>
        );
    }
}
