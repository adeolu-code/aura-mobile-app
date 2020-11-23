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
import { getPropertyBookingsApi } from '../../api/booking.api';
import { setContext, consoleLog } from '../../utils';
import moment from "moment";

const illustration = require("./../../../assets/bookings-page-1-illustration.png");

class BookingsScreen extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
        toBeRendered: this.defaultRender,
        activeTab: 0,
        page: 1,
        pageSize: 10,
        propertyType: 'Apartment',
        properties: [],
    };
  }

  defaultRender = (
    <>
      <RenderNoRecord 
          illustrationSource={illustration} 
          noRecordText={BOOKINGS_NO_BOOKINGS}
          description={BOOKINGS_SCREEN_DESCRIPTION}
          buttonText={"Explore Aura"}
          onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}            
      />
    </>
    
  );

  componentDidMount() {
    setContext(this.context);
    this.init();
  }

  init = () => {
    this.getProperty();
  }

  getProperty = () => {
    getPropertyBookingsApi({
      page: this.state.page,
      pageSize: this.state.pageSize,
      isActive: true,
      hostId: this.context.state.userData.id,
      userid: this.context.state.userData.id,

    }).then(result => {
      if (result != undefined) {
        consoleLog("booked properties", result.data);
          this.setState({properties: result.data});
          this.getActiveRender();
      }
    })
  }

  set = (value) => {
      this.setState(value);
  }

  getActiveRender = (index=0) => {
      //handling rendering of screen based on user top bar selection
      if (index == 0) {
          this.set(
            {
                toBeRendered: (this.state.properties.length > 0) 
                  ? 
                    this.state.properties.map((property, index) => {
                      const checkInDate = moment(property.check_In_Date);
                      const dayLeft = moment.duration(checkInDate.diff(new Date())).asDays();
                      return (
                        <BookingPropertyComponent 
                            key={index}
                            title={property.propertyInfo.title} 
                            location={property.propertyInfo.location || ""} 
                            type={property.propertyInfo.type}
                            dayLeft={dayLeft > 0 ? dayLeft.toFixed(2) : 0}
                            image={{uri: property.propertyInfo.image}}
                            isExpired= {property.isBookingExpired}
                            amount= {property.total_Cost}
                            onClick={() => this.props.navigation.navigate("BookingDetail",{
                              title: property.propertyInfo.title,
                              title: property.propertyInfo.title,
                              propertyCategory: property.propertyInfo.type,
                              checkOut: moment(property.check_Out_Date).format("DD/MM/YYYY"),
                              propertyType: property.propertyInfo.type,
                              time: `${moment(property.arrival_Time_From, "hh:mm:ss").format("hh:mm")} - ${moment(property.arrival_Time_To, "hh:mm:ss").format("hh:mm")}`,
                              checkIn: checkInDate.format("DD/MM/YYYY"),
                              amount: property.total_Cost,
                              image: {uri: property.propertyInfo.image},
                              isExpired: property.isBookingExpired
                            })}
                            {...this.props}
                        />
                      );
                    }) 
                  : 
                    this.defaultRender
            });
      }
      else if (index == 1) {
        this.set(
            {
                toBeRendered: <RenderNoRecord 
                    illustrationSource={illustration} 
                    noRecordText={BOOKINGS_NO_BOOKINGS}
                    description={BOOKINGS_SCREEN_DESCRIPTION}
                    buttonText={"Explore Aura"}
                    onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}
                />
            });
      }
  }

  render() {
    return (
      <>
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
