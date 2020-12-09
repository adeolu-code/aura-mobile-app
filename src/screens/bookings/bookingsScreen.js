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
import { setContext, consoleLog, GetRequest, urls } from '../../utils';
import moment from "moment";
import FilterModal from './FilterModal';
import { Loading } from '../../utils/Index';

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
        showFilterModal: false,
        property: {},
        loading: false,
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
                let toBeRendered = []
                if (this.state.properties.length > 0) 
                  { 
                    this.state.properties.map((property, index) => {
                      const checkInDate = moment(property.check_In_Date);
                      const dayLeft = moment.duration(checkInDate.diff(new Date())).asDays();
                      consoleLog("checkInDate", dayLeft, property.check_In_Date);
                      if (dayLeft > 1) {
                        // if days left to checkin is in the future display
                        toBeRendered.push(
                          <BookingPropertyComponent 
                              key={index}
                              title={property.propertyInfo.title} 
                              location={property.propertyInfo.location || ""} 
                              type={property.propertyInfo.type}
                              dayLeft={dayLeft > 0 ? dayLeft.toFixed(2) : 0}
                              image={{uri: property.propertyInfo.image}}
                              isExpired= {property.isBookingExpired}
                              amount= {property.total_Cost}
                              onEllipsePress={() => this.selectProperty(index)}
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
                      }
                    });
                  }
                  
                  if (toBeRendered.length == 0) {
                    toBeRendered = <RenderNoRecord 
                        illustrationSource={illustration} 
                        noRecordText={BOOKINGS_NO_BOOKINGS}
                        description={BOOKINGS_SCREEN_DESCRIPTION}
                        buttonText={"Explore Aura"}
                        onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}
                    />
                  }
                  
                  consoleLog("toberend",toBeRendered);
                  this.set({toBeRendered: toBeRendered});
      }
      else if (index == 1) {
              let toBeRendered =  [];
              if (this.state.properties.length > 0) 
              {
                this.state.properties.map((property, index) => {
                  const checkInDate = moment(property.check_In_Date);
                  const checkOutDate = moment(property.check_Out_Date);
                  // const dayLeft = moment.duration(checkInDate.diff(new Date())).asDays();
                  const checkoutDayLeft = moment.duration(checkOutDate.diff(new Date())).asDays();
                  consoleLog("checkOutDate", checkoutDayLeft, property.check_Out_Date);
                  if (checkoutDayLeft < 1) {
                    // booking has expired
                    toBeRendered.push(
                      <BookingPropertyComponent 
                          key={index}
                          title={property.propertyInfo.title} 
                          location={property.propertyInfo.location || ""} 
                          type={property.propertyInfo.type}
                          dayLeft={0}
                          image={{uri: property.propertyInfo.image}}
                          isExpired= {property.isBookingExpired}
                          amount= {property.total_Cost}
                          onEllipsePress={() => this.selectProperty(index)}
                          onClick={() => this.props.navigation.navigate("BookingDetail",{
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
                  }
                }) 
              }

              if (toBeRendered.length == 0) {
                toBeRendered =  <RenderNoRecord 
                      illustrationSource={illustration} 
                      noRecordText={BOOKINGS_NO_BOOKINGS}
                      description={BOOKINGS_SCREEN_DESCRIPTION}
                      buttonText={"Explore Aura"}
                      onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}
                  />
              }
              consoleLog("toberend",toBeRendered);
              // if (Array.isArray(toBeRendered)) 
              this.set({toBeRendered: toBeRendered});
              
      }
  }

  selectProperty = (index) => {
    this.setState({property: this.state.properties[index], showFilterModal: true});
  }
 
  closeFilterModal = () => {
    this.setState({ showFilterModal: false });
  }

  renderLoading = () => {
    const {loading } = this.state;
    if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
  }

  linkToSingleHouse = async () => {
    this.setState({loading: true});
    const house = await GetRequest(urls.listingBase + urls.v, urls.propertyById + this.state.property.propertyInfo.id);
    this.setState({loading: false});
    this.props.navigation.navigate('Other', {screen: 'HouseSingle',params: {house: house.data, force:true}});
  }

  render() {
    return (
      <> 
        <SafeAreaView style={[{flex: 1, backgroundColor: colors.white }]}>
        {this.renderLoading()}
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
          {
            this.state.showFilterModal &&
          
            <FilterModal 
              visible={this.state.showFilterModal} 
              type={this.state.property.propertyInfo.type}
              property={this.state.property}
              onDecline={() => this.closeFilterModal()}
              linkToSingleHouse= {() => this.linkToSingleHouse()}
              {...this.props}
            />
          } 
        </SafeAreaView>
      </>
    );
  }
}

export default BookingsScreen;
