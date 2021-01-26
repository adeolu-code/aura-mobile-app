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
import { setContext, consoleLog, GetRequest, urls, successMessage, toTitleCase } from '../../utils';
import moment from "moment";
import FilterModal, {ExperienceFilterModal} from './FilterModal';
import { Loading } from '../../utils/Index';
import MenuItemComponent from '../../components/menu_item/menuItem.component';
import { View } from 'native-base';
import { MyStyle } from '../../myStyle';
import { PHOTOGRAPH, EXPERIENCE, RESTAURANT, HOST } from '../../utils'
import { getRestaurantOrdersApi } from '../../api/restaurant.api';
import { getExperienceApi } from "./../../api/booking.api";
import FlatlistComponent from '../../components/flat_list/flatList.component';

const illustration = require("./../../../assets/bookings-page-1-illustration.png");

class BookingsScreen extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
        toBeRendered: this.defaultRender,
        activeTab: 0,
        page: 1,
        pageSize: 25,
        propertyType: 'Apartment',
        properties: [],
        showFilterModal: false,
        property: {},
        loading: false,
        refreshing: false,
        roles: [],
        type: "host",
        activeIndex: 0,
    };

    this.onEndReachedCalledDuringMomentum = false;
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
    this.getProperty("Apartment");
  }

  getMore = () => {
    if(!this.onEndReachedCalledDuringMomentum){
        this.state.page =  this.state.page + 1;
        this.state.size = this.state.size + 20;
        this.setState({});

        this.getOrders();
        
        this.onEndReachedCalledDuringMomentum = true;
    }
    
}

  getProperty = (property=this.state.propertyType, url=urls.property) => {
    this.setState({loading: true});
    
    getPropertyBookingsApi({
      page: this.state.page,
      pageSize: this.state.pageSize,
      userid: this.context.state.userData.id,
      propertyType: property,

    }, url).then(result => {
      if (result != undefined) {
          this.setState({properties: result.data});
          this.getActiveRender();
      }
      this.setState({loading: false});
    })
  }

  set = (value) => {
      this.setState(value);
  }

  getActiveRender = (index=0) => {
    // console.log("index sel", index);
      //handling rendering of screen based on user top bar selection
      const now = moment(new Date());
      if (index == 0) {
                let toBeRendered = []
                
                if (this.state.properties.length > 0) 
                  { 
                    this.state.properties.map((property, index) => {
                      const checkInDate = moment(property.check_In_Date);
                      // console.log("checkInDate", checkInDate);
                      const dayLeft = moment.duration(checkInDate.diff(now)).asHours();
                      if (dayLeft > 1) {
                        // if days left to checkin is in the future display
                        property['dayLeft'] = dayLeft > 0 ? dayLeft.toFixed(2) : 0;
                        property['checkInDate'] = checkInDate;
                        property['index'] = index;
                        toBeRendered.push(property);
                      }
                    });
                  }
                  
                  if (toBeRendered.length == 0) {
                    toBeRendered = [<RenderNoRecord 
                        illustrationSource={illustration} 
                        noRecordText={BOOKINGS_NO_BOOKINGS}
                        description={BOOKINGS_SCREEN_DESCRIPTION}
                        buttonText={"Explore Aura"}
                        onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}
                    />]
                  }
                  else {
                    toBeRendered = (
                    <FlatlistComponent
                      data={toBeRendered}
                      // onEndReached={() => {
                      //   this.state.page = this.state.page + 1;
                      //   this.state.pageSize = this.state.pageSize + this.state.pageSize;
                      //   this.getProperty(this.state.propertyType)
                      // }}
                      onRefresh={() => {
                        this.setState({page: 1, pageSize: 10});
                        this.getProperty(this.state.propertyType);
                      }}
                      renderItem={({item}, index) => {
                        const property = item;
                        console.log(property)
                        return (
                        <BookingPropertyComponent 
                          key={index}
                          title={property.propertyInfo.title} 
                          location={property.propertyInfo.location || ""} 
                          type={property.propertyInfo.type}
                          dayLeft={property.dayLeft}
                          image={{uri: property.propertyInfo.image}}
                          isExpired= {property.isBookingExpired}
                          amount= {property.total_Cost}
                          onEllipsePress={() => this.selectProperty(property.index)}
                          date={property.checkInDate}
                          onClick={() => this.props.navigation.navigate("BookingDetail",{
                            title: property.propertyInfo.title,
                            propertyCategory: property.propertyInfo.type,
                            checkOut: moment(property.check_Out_Date).format("DD/MM/YYYY"),
                            propertyType: property.propertyInfo.type,
                            time: `${moment(property.arrival_Time_From, "hh:mm:ss").format("hh:mm")} - ${moment(property.arrival_Time_To, "hh:mm:ss").format("hh:mm")}`,
                            checkIn: property.checkInDate.format("DD/MM/YYYY"),
                            amount: property.total_Cost,
                            image: {uri: property.propertyInfo.image},
                            isExpired: property.isBookingExpired,
                            id: property.id,
                          })}
                          {...this.props}
                        />
                      )
                      }} 
                      />
                    )
                  }
                  this.state.toBeRendered = toBeRendered;
                  this.state.activeIndex = index;
                  this.setState({});
      }
      else if (index == 1) {
              let toBeRendered =  [];
              if (this.state.properties.length > 0) 
              {
                this.state.properties.map((property, index) => {
                  const checkInDate = moment(property.check_In_Date);
                  const checkOutDate = moment(property.check_Out_Date);
                  // const dayLeft = moment.duration(checkInDate.diff(new Date())).asDays();
                  
                  const checkoutDayLeft = moment.duration(checkOutDate.diff(now)).asHours();
                  property['checkInDate'] = checkInDate;
                  property['checkOutDate'] = checkOutDate;
                  property['index'] = index;
                  if (checkoutDayLeft < 1) {
                    // booking has expired
                    toBeRendered.push(property);
                  }
                }) 
              }

              if (toBeRendered.length == 0) {
                toBeRendered =  [<RenderNoRecord 
                      illustrationSource={illustration} 
                      noRecordText={BOOKINGS_NO_BOOKINGS}
                      description={BOOKINGS_SCREEN_DESCRIPTION}
                      buttonText={"Explore Aura"}
                      onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}
                  />]
              }
              else {
                toBeRendered = (
                  <FlatlistComponent
                    data={toBeRendered}
                      // onEndReached={() => {
                      //   this.setState({page: this.state.page + 1, pageSize: this.state.pageSize + this.state.pageSize});
                      //   this.getProperty(this.state.propertyType)
                      // }}
                      onRefresh={() => {
                        this.setState({page: 1, pageSize: 10});
                        this.getProperty(this.state.propertyType);
                      }}
                    renderItem={({item}, index) => {
                      const property = item;
                      return <BookingPropertyComponent 
                            key={index}
                            title={property.propertyInfo.title} 
                            location={property.propertyInfo.location || ""} 
                            type={property.propertyInfo.type}
                            dayLeft={0}
                            image={{uri: property.propertyInfo.image}}
                            isExpired= {property.isBookingExpired}
                            amount= {property.total_Cost}
                            date={property.checkOutDate}
                            onEllipsePress={() => this.selectProperty(property.index)}
                            onClick={() => this.props.navigation.navigate("BookingDetail",{
                              title: property.propertyInfo.title,
                              propertyCategory: property.propertyInfo.type,
                              checkOut: moment(property.check_Out_Date).format("DD/MM/YYYY"),
                              propertyType: property.propertyInfo.type,
                              time: `${moment(property.arrival_Time_From, "hh:mm:ss").format("hh:mm")} - ${moment(property.arrival_Time_To, "hh:mm:ss").format("hh:mm")}`,
                              checkIn: property.checkInDate.format("DD/MM/YYYY"),
                              amount: property.total_Cost,
                              image: {uri: property.propertyInfo.image},
                              isExpired: property.isBookingExpired,
                              id: property.id,
                            })}
                            {...this.props}
                        />;
                    }}
                  />
                );
              }
              // if (Array.isArray(toBeRendered)) 
              this.state.activeIndex = index;
              this.setState({toBeRendered: toBeRendered});
              
      }
  }

  getRestaurantActiveRender = (currentIndex) => {
    let toBeRendered = [];
    const dayLeft = undefined;
    const now = moment(new Date());
    
      for(let index = 0; index < this.state.properties.length; index++) {
        let order =this.state.properties[index];
        const orderDate = moment(order.createdOn);
        if (this.state.type == "experience") orderDate = moment(order.end_Date);
        
        const dayLefts = moment.duration(orderDate.diff(now)).asDays();
        if (currentIndex == 0 && dayLefts > 24) {
          // if recent/upcoming and createdon is older than a day
          continue
        }
        
        if (currentIndex == 0 && dayLefts < 0) {
          continue
        }

        if (currentIndex == 1 && dayLefts > 0) {
          // if recent/upcoming and createdon is younger than a day
          continue
        }

        if (this.state.type == "experience" && currentIndex == 0 && dayLefts < 0) {
          continue;
        }

        if (this.state.type == "experience" && currentIndex == 1 && dayLefts > 0) {
          // if recent/upcoming and createdon is younger than a day
          continue
        }

        order['dayLeft'] = dayLeft;
        order['orderDate'] = orderDate;
        order['currentIndex'] = currentIndex;

        if (this.state.type == "experience") {
          toBeRendered.push(order);
        }else 
        {
          // order['dayLeft'] = dayLeft;
          // order['orderDate'] = orderDate;
          toBeRendered.push(order);
        }
 
      }

    if (toBeRendered.length <1 ) {
      toBeRendered.push(<RenderNoRecord 
        illustrationSource={illustration} 
        noRecordText={BOOKINGS_NO_BOOKINGS}
        description={BOOKINGS_SCREEN_DESCRIPTION}
        buttonText={"Explore Aura"}
        onButtonPress={() => this.props.navigation.navigate('Tabs', {screen: 'Explore'})}            
    />);
    }
    else {
      if (this.state.type == "experience") {
        toBeRendered = (
          <FlatlistComponent 
            data={toBeRendered}
            renderItem={({item}, index) => {
              const order = item;
              return <BookingPropertyComponent 
                  key={index}
                  title={order.guest_Name} 
                  location={"NGN " + order.total_Cost} 
                  type={!order.is_Paid ? "Not Paid": "Paid"}
                  dayLeft={(order.dayLeft && order.dayLeft > 0) ? order.dayLeft.toFixed(2) : 0}
                  image={require('./../../assets/images/gallery-restuarant.jpeg')}
                  isExpired= {!order.isActive}
                  amount= {""}
                  onEllipsePress={() => this.selectExperience(order.currentIndex)}
                  date={order.orderDate}
                  
                  onClick={() => {this.setState({showExperience: true, experience: order})}}
                  {...this.props}
              />;
            }}
          />
        );
      }
      else {
        toBeRendered = (<FlatlistComponent 
          data={toBeRendered}
          renderItem={({item}, index) => {
            const order = item;
            return <BookingPropertyComponent 
                key={index}
                title={order.restaurant} 
                location={order.name} 
                type={order.paymentConfirmed ? "Not Paid": "Paid"}
                dayLeft={(order.dayLeft && order.dayLeft > 0) ? order.dayLeft.toFixed(2) : 0}
                image={require('./../../assets/images/gallery-restuarant.jpeg')}
                isExpired= {!order.isActive}
                amount= {order.total_Cost}
                ellipsis={false}
                date={order.orderDate}
                
                onClick={() => {}}
                {...this.props}
            />;
          }}
        />);
      }
    }

    this.state.toBeRendered = toBeRendered;
    this.state.activeIndex = currentIndex;
    this.setState({loading:false});
  }

  selectProperty = (index) => {
    log("proper", this.state.properties[index]);
    this.state.property = this.state.properties[index];
    this.setState({showFilterModal: true});
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

  linkToSingleTour = () => {
    this.props.navigation.navigate('Other', { screen: 'TourSingle', params: { tourId: this.state.experience.experience_Id } })
  }

  getRoles = () => {
    const elem = [];
    const roleExpreince = this.context.state.userData.roles.indexOf(EXPERIENCE);
    if (roleExpreince != -1) {
      elem.push("Experience");
    }

    const roleRestaurant = this.context.state.userData.roles.indexOf(RESTAURANT);
    if (roleRestaurant != -1) {
      elem.push("Restaurant");
    }

    const roleHost = this.context.state.userData.roles.indexOf(HOST);
    if (roleHost != -1) {
      elem.push("Hotels");
      elem.push("Apartments");
    }

    this.state.roles = elem;
    return elem;
  }

  selectExperience = (index) => {
    this.setState({showExperience: true, experience: this.state.properties[index]});
  }

  itemChange = (index) => {
    this.setState({loading: true});
    
    if (this.state.roles[index] == "Hotels") {
      this.getProperty("Hotel");
      this.setState({loading: false, type: "host"});
    }
    else if (this.state.roles[index] == "Apartments") {
      this.getProperty("Apartment");
      this.setState({loading: false, type: "host"});
    }
    else if (this.state.roles[index] == "Experience") {
      this.getExperience();
    }
    else if (this.state.roles[index] == "Restaurant") {
      this.getRestaurant();
    }
  }

  getExperience = () => {
    this.setState({loading: true});
      getExperienceApi(this.context.state.userData.id, this.state.page, this.state.pageSize).then(result => {
        if (result != undefined && Array.isArray(result.data)) {
          this.setState({properties: result.data});
          
          setTimeout(() => {
            this.getRestaurantActiveRender(this.state.activeIndex)
          }, 100);
        }
        this.setState({loading: false});
      });
      this.setState({type: "experience"});
  }

  getRestaurant = () => {
    getRestaurantOrdersApi(this.state.page, this.state.pageSize, "user/").then(result => {
      if (result != undefined && Array.isArray(result.items)) {
          this.setState({properties: result.items});
          setTimeout(() => {
            this.getRestaurantActiveRender(this.state.activeIndex)
          }, 100);
        }

        this.setState({loading: false, type: "restaurant"});
    });
  }

  render() {
    return (
      <> 
        <SafeAreaView style={[{flex: 1, backgroundColor: colors.white }]}>
        {this.renderLoading()}
          <View>
            {
              this.context.state.isLoggedIn ?
              <View style={MyStyle.row}>
                  <BottomTabSectionNoRecord
                      title={toTitleCase(this.state.type) + " Bookings"}
                      tabs={["Upcoming", "Past"]} 
                      onTopTabClick={(index) => {
                        if (this.state.type == "host") {
                          this.getActiveRender(index);
                        }
                        else if (this.state.type == "restaurant") {
                          this.getRestaurantActiveRender(index);
                        }
                        else if (this.state.type == "experience") {
                          this.getRestaurantActiveRender(index);
                        }
                      }}
                      render={this.state.toBeRendered}
                  />
                  <View>
                  </View>
                  
                </View>
              :
              undefined
            }
          </View>
          {
            this.state.showFilterModal &&
          
            <FilterModal 
              visible={this.state.showFilterModal} 
              type={this.state.property.propertyInfo.type}
              property={this.state.property}
              onDecline={() => this.closeFilterModal()}
              onPress= {() => this.linkToSingleHouse()}
              {...this.props}
            />

          } 
          {
            this.state.showExperience &&
            <ExperienceFilterModal 
              visible={this.state.showExperience} 
              type={this.state.showExperience}
              experience={Object.assign(this.state.experience, {itemInfo: {type: "Experience"}})}
              onDecline={() => this.setState({ showExperience: false })}
              onPress= {() => this.linkToSingleTour()}
              {...this.props}
            />
          }
           <MenuItemComponent 
              style={{marginLeft: 10, position: 'absolute', alignSelf: 'flex-end', top: 30, width: 150, marginRight: 5, zIndex: 3}} 
              items={this.getRoles()}
              onPress={(index) => this.itemChange(index)}
            />
        </SafeAreaView>
      </>
    );
  }
}

export default BookingsScreen;
