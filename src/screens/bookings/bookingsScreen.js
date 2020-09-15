import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../../colors';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./bookingsScreen.style";
import BottomTabSectionNoRecord from '../../components/bottom_tab_section_no_record/bottomTabSectionNoRecord';
import RenderNoRecord from '../../components/render_no_record/renderNoRecord';
import { BOOKINGS_NO_BOOKINGS, BOOKINGS_SCREEN_DESCRIPTION } from '../../strings';
import BookingPropertyComponent from '../../components/booking_property/bookingPropertyComponent';

const illustration = require("./../../../assets/bookings-page-1-illustration.png");

class BookingsScreen extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
        toBeRendered: this.defaultRender,
        activeTab: 0
    };
  }

  defaultRender = (
//   <RenderNoRecord 
//     illustrationSource={illustration} 
//     noRecordText={BOOKINGS_NO_BOOKINGS}
//     description={BOOKINGS_SCREEN_DESCRIPTION}
//     buttonText={"Explore Aura"}
//     onButtonPress={() => alert("")}            
//     />
    <>
    <BookingPropertyComponent 
        title={"Umbaka Homes"} 
        location={"Tanscorp Hotels Abuja"} 
        type={"Platinum Room"}
        dayLeft={10}
    />
    <BookingPropertyComponent 
        title={"Umbaka Homes"} 
        location={"Tanscorp Hotels Abuja"} 
        type={"Platinum Room"}
        dayLeft={15}
    />
    </>
    
    );



  set = (value) => {
      this.setState(value);
  }

  getActiveRender = (index=0) => {
      //handling rendering of screen based on user top bar selection
      if (index == 0) {
          this.set(
            {
                toBeRendered: <RenderNoRecord 
                    illustrationSource={illustration} 
                    noRecordText={BOOKINGS_NO_BOOKINGS}
                    description={BOOKINGS_SCREEN_DESCRIPTION}
                    buttonText={"Explore Aura"}
                    onButtonPress={() => alert("")}            
                />
            });
      }
      else if (index == 1) {
        this.set(
            {
                toBeRendered: <RenderNoRecord 
                    illustrationSource={illustration} 
                    noRecordText={BOOKINGS_NO_BOOKINGS}
                    description={BOOKINGS_SCREEN_DESCRIPTION}
                    buttonText={"Explore Tours"}
                    onButtonPress={() => alert("")}            
                />
            });
      }
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
                    title={"Bookings"}
                    tabs={["Upcoming", "Past"]} 
                    onTopTabClick={(index) => this.getActiveRender(index)}
                    render={this.state.toBeRendered}
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

export default BookingsScreen;
