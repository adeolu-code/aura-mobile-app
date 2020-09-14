import React, {Component} from 'react';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./bottomTabSectionNoRecord.style";
import { View  } from 'native-base';
import { MyText } from './../../utils/Index';
import TopTab from '../top_tab/topTabComponent';
import GStyles from "./../../assets/styles/GeneralStyles";



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
      const { textH1Style, textExtraBold, textDarkBlue } = GStyles;
    return (
      <>
        <View style={[Styles.parentView]}>
            <MyText style={[textExtraBold, textH1Style, textDarkBlue, Styles.myTextTitle, this.props.myTextTitle ]}>
                {this.props.title}
            </MyText>
            <TopTab 
                tabs={this.props.tabs} 
                activeTab={this.props.activeTab ?? 0}
                onClick={(e) => this.props.onTopTabClick(e)} 
            />
            {
                this.props.render
            }
        </View>
      </>
    );
  }
}

export default BottomTabSectionNoRecord;
