/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback, ScrollView, Dimensions, Keyboard
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, CustomInputNumber, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';

import { Request, GetRequest, urls } from '../../utils'



class ThemeListModal extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, errors: [], lists: [], listValue: null, subLists: [], subListValue: null };
    }

    openModal = () => {
        this.setState({ showModal: true })
    }
    closeModal = () => {
        this.setState({ showModal: false })
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    renderError = () => {
        const { errors } = this.state;
        if (errors.length !== 0) {
            return (<Error errors={errors} />);
        }
    }

    getThemeList = async () => {
        this.setState({ loading: true, errors: [] });
        const res = await GetRequest(urls.experienceBase, `v1/experience/api/v1/themeCategory/list`);
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            const message = res.message;
            const error = [message];
            this.setState({ errors: error});
        } else {
            this.setState({ lists: res.data })
        }
    }
    getSubCatThemeList = async (id) => {
        this.setState({ loading: true, errors: [] });
        const res = await GetRequest(urls.experienceBase, `v1/experience/api/v1/theme/list?ThemeCategoryId=${id}`);
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            const message = res.message;
            const error = [message];
            this.setState({ errors: error});
        } else {
            this.setState({ subLists: res.data })
        }
    }
    selectList = (listValue) => {
        this.setState({ listValue })
        this.getSubCatThemeList(listValue.id)
    }
    selectSubList = (subListValue) => {
        const { listValue } = this.state
        this.setState({ subListValue })
        const obj = { listValue, subListValue }
        this.props.value(obj)
        this.props.onDecline()
    }

    

    componentDidMount = () => {
        this.getThemeList()
    }

    clear = () => {
        this.setState({ listValue: null })
    }

    renderThemes = () => {
        const { lists, listValue, subLists } = this.state
        const {itemContainer } = styles
        const { flexRow, textH4Style, textGrey, textBold } = GStyles
        if(listValue) {
            if(subLists.length > 0) {
                return subLists.map((item, index) => {
                    const key = `TH_${index}`
                    return (
                        <TouchableOpacity style={[flexRow, itemContainer]} key={key} onPress={this.selectSubList.bind(this, item)}>
                            <MyText style={[textH4Style, textGrey]}>{item.name}</MyText>
                            <Icon name="caret-forward" style={{ fontSize: 15, marginLeft: 5, color: colors.orange, marginBottom: -2 }} />
                        </TouchableOpacity>
                    )
                })
            }
            return <MyText Style={[textH4Style, textBold]}>No Data for this Category</MyText>
        } else {
            if(lists && lists.length > 0) {
                return lists.map((item, index) => {
                    const key = `TH_${index}`
                    return (
                        <TouchableOpacity style={[flexRow, itemContainer]} key={key} onPress={this.selectList.bind(this, item)}>
                            <MyText style={[textH4Style, textGrey]}>{item.name}</MyText>
                            <Icon name="caret-forward" style={{ fontSize: 15, marginLeft: 5, color: colors.orange, marginBottom: -2 }} />
                        </TouchableOpacity>
                    )
                })
            }
        }
        
    }

    renderTitle = () => {
        const { listValue } = this.state
        if(listValue) {
            return `What exactly in ${listValue.name}`
        } else {
            return 'All Themes'
        }
    }
    

    render() {
        const { visible, onDecline } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, itemContainer, itemsContainer,
            headerStyle, container, } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, textOrange } = GStyles;

        const { listValue } = this.state

        return (

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
                {this.renderLoading()}
            
                <View style={modalContainer}>
                    
                        
                    <View style={container} >
                        <ScrollView>
                            <View style={[flexRow, modalHeader]}>
                                {listValue ? <TouchableOpacity style={{flex: 1}} onPress={this.clear}>
                                    <Icon name="chevron-back" />
                                </TouchableOpacity> : <></>}
                                <View style={{ flex: 6, alignItems: 'center'}}>
                                    <View style={[lineStyle, listValue ? { marginLeft: 0} : '']}></View>
                                </View>
                                <TouchableOpacity style={closeStyle} onPress={onDecline}>
                                    <Icon type="Feather" name="x" />
                                </TouchableOpacity>
                            </View>
                            <View style={headerStyle}>
                                <MyText style={[textH3Style, textExtraBold, textOrange, textCenter]}>Select a Primary Theme</MyText>
                            </View>
                            
                            <View style={{ marginBottom: 20}}>
                                <MyText style={[textH3Style, textBold, textGrey]}>
                                    {this.renderTitle()}
                                </MyText>
                            </View>

                            <View style={[flexRow, itemsContainer]}>
                                {this.renderThemes()}
                                {/* <View style={[flexRow, itemContainer]}>
                                    <MyText style={[textH4Style, textGrey]}>Styles</MyText>
                                    <Icon name="caret-forward" style={{ fontSize: 15, marginLeft: 10 }} />
                                </View> */}
                            </View>
                            
                            <View style={{ borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 10, marginVertical: 20}}>
                                
                            </View>
                        </ScrollView>
                    </View>
                    
                    
                
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)', flex: 1, 
        // height: Dimensions.get('window').height - 20
        // paddingHorizontal: 20,
        justifyContent: 'flex-end',
        // alignItems: 'flex-end'
    },
    modalHeader: {
        marginTop: 30, marginBottom: 30, alignItems: 'center',
        // paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 40, paddingHorizontal: 20
    },
    lineStyle: {
        width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
    },
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end', 
    },
    container: {
        backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15,
        paddingHorizontal: 20,
        // paddingTop: 130,
        // flex: 1, 
        justifyContent: 'flex-end'
    },
    itemsContainer: {
        flexWrap: 'wrap', paddingHorizontal: 2, justifyContent: 'space-between'
    },
    itemContainer: {
        width: '49%', paddingHorizontal: 10, paddingVertical: 10, backgroundColor: colors.white, 
        borderRadius: 8, elevation: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 10
    }
});

export default ThemeListModal;
