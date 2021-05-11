import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar';
import CancelComponent from '../../components/experience/CancelComponent';




class Audience extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, audience: [], audienceId: '', name: '', description: ''  };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    createAudience = async () => {
        const { name, description, audience } = this.state
        try {
            this.setState({ loading: true })
            const obj = { name, description: description ? description : name, code: name.slice(0,2)}
            const res = await Request(urls.experienceBase, `${urls.v}experience/audience`, obj );
            console.log('Create audience ', res)
            if (res.isError || res.IsError) {
                errorMessage(res.message || res.Message);
                this.setState({ loading: false })
            } else {
                const getRes = await GetRequest(urls.experienceBase, `${urls.v}experience/audience/list`);
                if(getRes.data && getRes.data.length !== 0) {
                    const a = getRes.data.find(item => item.name === name )
                    this.setState(() => ({ audienceId: a.id, audience: getRes.data }), () => {
                        this.updateExperience()
                    })
                } else {
                    this.updateExperience()
                }
                
            } 
        } catch (error) {
            
        }
    }
    getAudienceList = async () => {
        try {
            this.setState({ loading: true, errors: [] });
            const res = await GetRequest(urls.experienceBase, `${urls.v}experience/audience/list`);
            this.setState({ loading: false });
            if (res.isError || res.IsError) {
                errorMessage(res.message);
            } else {
                const { tourOnboard, editTour } = this.context.state;
                if(editTour) {
                    this.setState({ audienceId: tourOnboard.audienceId })
                }
                this.setState({ audience: res.data })
            } 
        } catch (error) {
            
        }
    }

    updateExperience = async () => {
        Keyboard.dismiss()
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
        try {
            const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
            console.log('update experience ', res)
            this.setState({ loading: false });
            if (res.isError || res.IsError) {
                errorMessage(res.message || res.Message)
            } else {
                this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
                this.props.navigation.navigate('TourStack', { screen: 'TourDescribeActivity' })
            }  
        } catch (error) {
            this.setState({ loading: false });
        }
    }

    submit = () => {
        const { name } = this.state
        if(name) {
            this.createAudience()
        } else {
            this.updateExperience()
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
      const { audience, audienceId, name } = this.state
      if(audience && audience.length > 0 && name === '') {
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
    const { container, button, addContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Audience" wrapperStyles={{ position: 'relative'}} />
            <KeyboardAvoidingView style={container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View>
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
                            <View style={{paddingHorizontal: 2 }}>
                                <View style={addContainer}>
                                    <CustomInput label="Enter Specific Audience" placeholder="Eg. Females only" onChangeText={this.onChangeValue} 
                                    value={this.state.name} attrName="name" />
                                    <CustomInput placeholder="Description" onChangeText={this.onChangeValue} 
                                    value={this.state.description} attrName="description" />
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.sahdow }} onPress={this.submit} 
                        disabled={!this.state.audienceId && !this.state.name} />
                    </View>
                    <View style={[flexRow, styles.skipStyle]}>
                        {this.context.state.editTour ? <CancelComponent {...this.props} wrapper={{ paddingRight: 0 }} /> : <></>}
                    </View>
                </ScrollView>
                
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, 
        // marginTop: Platform.OS === 'ios' ? 80 : 100,
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
        marginRight: 10, marginTop: 3
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10, 
    },
    selectRow: {
        alignItems: 'flex-start', paddingBottom: 10
    },
    touchContainer: {
        borderRadius: 8, elevation: 2, backgroundColor: colors.white, padding: 15, marginTop: 10, width: '100%',
        ...GStyles.shadow
    },
    addContainer: {
        elevation: 2, ...GStyles.shadow, marginTop: 20, backgroundColor: colors.white, paddingVertical: 15,
        paddingHorizontal: 15, borderRadius: 8
    }
});

export default Audience;
