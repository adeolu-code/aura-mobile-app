import React, { Component } from "react"
import { View, Icon, Input } from "native-base";
import { MyText } from "../../utils/Index";
import { Styles } from "./incrementingInput.style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class IncrementingInput extends Component {
    constructor() {
        super();

        this.state = {
            value: 0,
        }
    }

    onValueChange = (text) => {
        if (text < 0) {
            text = 0;
        }
        this.setState({value: text});
        this.props.onValueChange && this.props.onValueChange(text);
    }

    render() {
        return (
            <View style={[Styles.parentView]}>
                <MyText style={[Styles.inputText]}>
                    {this.props.label}
                </MyText>
                <View style={[Styles.inputView]}>
                    <TouchableOpacity
                     onPress={() => this.onValueChange(this.state.value - 1)}
                    >
                      <Icon 
                       name={"md-remove-circle"} 
                       style={[Styles.removeIcon]} 
                      />
                    </TouchableOpacity>
                    <Input 
                      style={[Styles.input]} 
                      placeholder={this.state.value.toString()}
                      onChangeText={(text) => this.onValueChange(text)}
                      value={this.state.value.toString()}
                    />
                    <TouchableOpacity
                     onPress={() => this.onValueChange(this.state.value + 1)}
                    >
                      <Icon 
                       name={"add-circle-sharp"} 
                       style={[Styles.addIcon]} 
                       
                     />
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }
}