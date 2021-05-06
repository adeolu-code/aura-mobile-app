import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
} from 'react-native';
import colors from '../../colors';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./inbox.style";
import BottomTabSectionNoRecord from '../../components/bottom_tab_section_no_record/bottomTabSectionNoRecord';
import RenderNoRecord from '../../components/render_no_record/renderNoRecord';
import { INBOX_NO_UNREAD_MESSAGES } from '../../strings';
import InboxContent from "./inboxContent";
import NotificationScreen from '../notifications/notificationScreen';
import { useNavigation } from '@react-navigation/native';


class InboxScreenClass extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
      toBeRendered: this.defaultRender,
    };
  }

  /**
   * <RenderNoRecord
          descriptionOnly={true}
          description={INBOX_NO_UNREAD_MESSAGES}
      />
   * **/

  defaultRender = (
    <InboxContent {...this.props} />
      
  )

  onTopTabClick = (index) => {
    if (index == 0) {
      this.setState({toBeRendered: <InboxContent {...this.props} />});
    }
    else {
      this.setState({toBeRendered: <NotificationScreen {...this.props} />});
    }
  }

  render() {
    return (
      <>
          <ScrollView style={{paddingTop: 20}}>
            {
              this.context.state.isLoggedIn ?
                <BottomTabSectionNoRecord
                    title={"Inbox"}
                    tabs={["Messages", "Notifications"]} 
                    onTopTabClick={(index) => this.onTopTabClick(index)}
                    render={this.state.toBeRendered} noInbox={true}
                />
                
              :
              undefined
            }
          </ScrollView>
      </>
    );
  }
}

const InboxScreen = () => {
  return (
      <InboxScreenClass navigation={ useNavigation()} />
  );
};
export default InboxScreen;
