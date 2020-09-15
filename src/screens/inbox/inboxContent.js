import React, { Component } from "react";
import { View, Text, Item, Input, Icon } from "native-base";
import { Styles } from "./inbox.style";
import { AppContext } from "../../../AppProvider";
import InboxMessage from "../../components/inbox_message/inboxMessage";
import { ScrollView } from "react-native";

export default class InboxContent extends Component {
    static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
        
    };
  }


  render() {
    return (
      <>
        <View style={[Styles.parentView]}>
            <Item style={[Styles.item]}>
                <Input placeholder={"Search"} style={[Styles.input]}   />
                <Icon name={"search"} style={[Styles.icon]} />
            </Item>
            <ScrollView contentContainerStyle={[Styles.scrollView]}>
                <InboxMessage 
                    {...this.props}
                    imageSource={require("./../../assets/images/photo/photo.png")} 
                    messageContent={"It’s kind of common on the Internet where – if we fail"}
                    messageSender={"Joseph Slane"}
                    time={"13:39"}
                    newMessageCount={1}
                    onPress={() => this.props.navigation.navigate("InboxChat")}
                />
                <InboxMessage 
                    {...this.props}
                    imageSource={require("./../../assets/images/photo/photo.png")} 
                    messageContent={"It’s kind of common on the Internet where – if we fail"}
                    messageSender={"Joseph Slane"}
                    time={"13:39"}
                    newMessageCount={0}
                />
            </ScrollView>
            
        </View>
      </>
      );
    }
}