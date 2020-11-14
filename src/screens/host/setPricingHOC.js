import React, { Component } from "react";
import { AppContext, AppConsumer } from '../../../AppProvider';
import { ManagePropertyContext, ManagePropertyConsumer } from '../../../ManagePropertyProvider';


import SetPricing from './setPricing.screen'

export default class SetPricingHOC extends Component {
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
                            <SetPricing appContext={appContext} propertyContext={values} {...this.props} />
                        )}
                    </ManagePropertyConsumer>
                )}
            </AppConsumer>
        );
    }
}
