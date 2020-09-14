import React, {Component} from 'react';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./renderNoRecord.style";
import { View, Text  } from 'native-base';
import { MyText, CustomButton } from './../../utils/Index';
import TopTab from '../top_tab/topTabComponent';
import GStyles from "./../../assets/styles/GeneralStyles";
import { Image } from 'react-native';



class RenderNoRecord extends Component {
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
      const { textGrey, textH2Style, textH1Style, textExtraBold, textDarkBlue, textH4Style, imgContainer, imgStyle, textCenter } = GStyles;
      const descriptionOnly = (this.props.descriptionOnly == undefined) ? false : ((this.props.descriptionOnly) ? true : false);
    return (
      <>
            {
                (this.props.noRecordText != undefined && this.props.noRecordText != "" && !descriptionOnly) &&
                <MyText style={[textExtraBold, textH2Style, textDarkBlue, textCenter, Styles.myTextNoRecord ]}>
                    {this.props.noRecordText}
                </MyText>
            }
            {
                (!descriptionOnly && this.props.illustrationSource != undefined) &&
                <View style={[Styles.imgContainer]}>
                    <Image style={imgStyle} source={this.props.illustrationSource} resizeMode="contain" />
                </View>
            }
            <MyText style={[textH4Style, textGrey, textCenter, Styles.myTextDescription, {marginTop: (!descriptionOnly) ? 0 : "50%"} ]}>
                {this.props.description}
            </MyText>
            {
                (!descriptionOnly && this.props.buttonText != undefined) &&
                <CustomButton 
                    buttonText={this.props.buttonText} 
                    buttonStyle={[Styles.buttonStyle]} textStyle={[Styles.customTextStyle]} 
                    onPress={this.props.onButtonPress}
                />
            }
      </>
    );
  }
}

export default RenderNoRecord;
