import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../../colors';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./inbox.style";
import BottomTabSectionNoRecord from '../../components/bottom_tab_section_no_record/bottomTabSectionNoRecord';
import RenderNoRecord from '../../components/render_no_record/renderNoRecord';
import { INBOX_NO_UNREAD_MESSAGES } from '../../strings';


class InboxScreen extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            {
              this.context.state.isLoggedIn ?
                <BottomTabSectionNoRecord
                    title={"Inbox"}
                    tabs={["Messages", "Notifications"]} 
                    onTopTabClick={(e) => console.log(e)}
                    render={<RenderNoRecord
                        descriptionOnly={true}
                        description={INBOX_NO_UNREAD_MESSAGES}
                    />}
                />
              :
              undefined
            }
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default InboxScreen;
