import React, { Component } from "react";
import { View, Text, Item, Input, Icon } from "native-base";
import { Styles } from "./inbox.style";
import { AppContext } from "../../../AppProvider";
import InboxMessage from "../../components/inbox_message/inboxMessage";
import { ScrollView } from "react-native";
import { getChatListApi } from "../../api/chat.api";
import { consoleLog } from "../../utils";
import { INBOX_NO_UNREAD_MESSAGES } from "../../strings";
import RenderNoRecord from "../../components/render_no_record/renderNoRecord";
import moment from "moment";
import FlatlistComponent from "../../components/flat_list/flatList.component";

export default class InboxContent extends Component {
    static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
      chatList: [],
      page: 1,
      pageSize: 10,
      loading: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.getChatList();
  }

  getChatList = () => {
    if (!this.context.state.userData) {
      return;
    }
    this.setState({loading: true});
    const roleHost = this.context.state.userData.roles.find(item => item === 'Host');
    this.setState({roleHost: roleHost});
    getChatListApi(roleHost, {
      page: this.state.page,
      pageSize: this.state.pageSize,
    }).then(result => {
      result !=undefined && this.setState({chatList: result.data});
    })
  }


  render() {
    return (
      <>
        <View style={[Styles.parentView]}>
            <Item style={[Styles.item]}>
                <Input placeholder={"Search"} style={[Styles.input]}   />
                <Icon name={"search"} style={[Styles.icon]} />
            </Item>
            <FlatlistComponent 
              data={this.state.chatList}
              emptyContent={INBOX_NO_UNREAD_MESSAGES}
              onRefresh={() => {
                this.setState({page: 1, pageSize: 10});
                this.getChatList();
              }}
              renderItem={({item}, index) => {
                console.log("item", item);
                const chat = item;
                const uri = ( !this.state.roleHost ? chat.host_Picture : chat.guest_Photo);
                const userNname = !this.state.roleHost ? chat.host_Name : chat.guest_Name;
                
                return (
                  <InboxMessage 
                      {...this.props}
                      key={index}
                      imageSource={uri ? {uri: uri} : undefined}
                      messageContent={chat.message_Body}
                      messageSender={userNname}
                      time={moment(chat.dateSent).fromNow()}
                      newMessageCount={!chat.is_Read ? 1 : 0}
                      onPress={() => this.props.navigation.navigate("InboxChat", {
                        name: chat.host_Name || chat.guest_Name,
                        status: "Online",
                        userImage: uri ? {uri: uri} : undefined,
                        chatId: chat.id,
                        propertyId: chat.property_Id,
                        userId: chat.user_Id,
                        roleHost: this.state.roleHost,
                      })}
                  />
                );
              }}
            />
            {/* <ScrollView contentContainerStyle={[Styles.scrollView]}>
                {
                  this.state.chatList.length > 0 
                  ?
                    this.state.chatList.map((chat, index) => {
                      const uri = ( !this.state.roleHost ? chat.host_Picture : chat.guest_Photo);
                      const userNname = !this.state.roleHost ? chat.host_Name : chat.guest_Name;
                      consoleLog("uri", uri);
                      return (
                        <InboxMessage 
                            {...this.props}
                            key={index}
                            imageSource={uri ? {uri: uri} : undefined}
                            messageContent={chat.message_Body}
                            messageSender={userNname}
                            time={moment(chat.dateSent).fromNow()}
                            newMessageCount={!chat.is_Read ? 1 : 0}
                            onPress={() => this.props.navigation.navigate("InboxChat", {
                              name: chat.host_Name || chat.guest_Name,
                              status: "Online",
                              userImage: uri ? {uri: uri} : undefined,
                              chatId: chat.id,
                              propertyId: chat.property_Id,
                              userId: chat.user_Id,
                              roleHost: this.state.roleHost,
                            })}
                        />
                      );
                    })
                  :
                    <RenderNoRecord
                        descriptionOnly={true}
                        description={INBOX_NO_UNREAD_MESSAGES}
                    />
                }
            </ScrollView> */}
            
        </View>
      </>
      );
    }
}