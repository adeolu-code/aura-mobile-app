import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar'



class Audience extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, audience: [], audienceId: ''  };
  }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    getAudienceList = async () => {
        this.setState({ loading: true, errors: [] });
        const res = await GetRequest(urls.experienceBase, `${urls.v}experience/audience/list`);
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message);
        } else {
            this.setState({ audience: res.data })
        }
    }

    updateExperience = async () => {
        const { tourOnboard } = this.context.state
        const { audience, audienceId } = this.state
        this.setState({ loading: true, errors: [] });
        const a = audience.find(item => item.id === audienceId)
        const obj = {
            languageId: [tourOnboard.languageOne, tourOnboard.languageTwo],
            audienceId: this.state.audienceId,
            audienceName: a.name,
            id: tourOnboard.id
        }
        console.log(obj)
        const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.navigation.navigate('TourStack', { screen: 'TourDescribeActivity' })
        }  
    }

  check = (audienceId) => {
    this.setState({ audienceId })
  }

  componentDidMount = () => {
    this.getAudienceList()
  }

  renderAudienceItem = () => {
      const { touchContainer, selectRow, radioContainer, activeRadio } = styles
      const { textH4Style, flexRow, textGrey, textBold} = GStyles
      const { audience, audienceId } = this.state
      if(audience && audience.length > 0) {
        return audience.map(item => {
            return (
                <View style={touchContainer} key={item.id}>
                    <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.check.bind(this, item.id)}>
                        <View style={radioContainer}>
                            <View style={[item.id === audienceId ? activeRadio : '']}></View>
                        </View>
                        <MyText style={[textH4Style, textGrey, textBold, { flex: 1}]}>{item.name}</MyText>
                    </TouchableOpacity>
                    <MyText style={[textH4Style, textGrey]}>{item.description}</MyText>
                </View>
            )
        })
      }
  }
  

  

  render() {
    const { container, button, picker, icon, selectRow, radioContainer, activeRadio, touchContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Audience" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 3 / 6</MyText>
                    <ProgressBar width={16.7 * 3} />
                    <ProgressBar width={100} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 20 }}>
                        <View>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                            Who is the target for your experience?
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>
                                Experiences should be for everyone, but if you have a focus on a specific audience, 
                                indicate them here so that we can highlight your experience for those guests.
                            </MyText>

                            <View style={{paddingHorizontal: 2, marginTop: 30}}>
                                {this.renderAudienceItem()}
                            </View>
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} disabled={!this.state.audienceId} />
                    </View>
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 50, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    
    radioContainer: {
        borderRadius: 18, width: 18, height: 18, borderWidth: 2, borderColor: colors.orange, justifyContent: 'center', alignItems: 'center', 
        marginRight: 10, marginTop: 5
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10, 
    },
    selectRow: {
        alignItems: 'flex-start', paddingBottom: 10
    },
    touchContainer: {
        borderRadius: 8, elevation: 2, backgroundColor: colors.white, padding: 15, marginTop: 10, width: '100%'
    }
});

export default Audience;
