import React, {Component} from 'react';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./bottomTabSectionNoRecord.style";
import { View  } from 'native-base';
import { MyText } from './../../utils/Index';
import TopTab from '../top_tab/topTabComponent';
import GStyles from "./../../assets/styles/GeneralStyles";
import { ScrollView } from 'react-native-gesture-handler';



class BottomTabSectionNoRecord extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);
    
    this.state = {
        activeTab: this.props.activeTab ? this.props.activeTab : 0
    };
  }

  set = (value) => {
      this.setState(value);
  }

  render() {
      const { textH1Style, textExtraBold, textDarkBlue, textH5Style } = GStyles;
    return (
      <>
        <View style={[Styles.parentView, ]}>
            <MyText style={[textExtraBold, textH1Style, textDarkBlue, {marginTop: 10}, this.props.myTextTitle ]}>
                {this.props.title}
            </MyText>
            { 
              this.props.subTitle &&
                <MyText style={[textH5Style, textDarkBlue, {marginTop: 10, marginBottom: 10}, this.props.myTextTitle ]}>
                    {this.props.subTitle}
                </MyText>
            }
            <TopTab 
                tabs={this.props.tabs} 
                activeTab={this.props.activeTab ?? 0}
                onClick={(e) => this.props.onTopTabClick(e)} 
            />
            {/* <ScrollView> */}
              {
                  this.props.render
              }
            {/* </ScrollView> */}
            
        </View>
      </>
    );
  }
}

export default BottomTabSectionNoRecord;
