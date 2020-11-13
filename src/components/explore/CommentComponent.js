/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, Loading } from '../../utils/Index';

import CommentRow from '../CommentRow';
import { Icon } from 'native-base';

import colors from '../../colors';




class CommentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderLoading = () => {
        const { loading } = this.props;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%' }} />); }
    }

    renderComments = () => {
        const { comments, loading } = this.props;
        const { divider } = styles
        const length = comments.length
        if(comments.length !== 0 && !loading) {
            return comments.map((item, index) => {
                const key = `CM_${index}`;
                const imgUrl = item.profilePicture ? {uri: item.profilePicture} : require('../../assets/images/photo/profile.png')
                return (
                    <Fragment key={key}>
                        <CommentRow name={item.name} imgUrl={imgUrl} comment={item.comment} date={item.date} />
                        {length !== (index + 1) ?<View style={divider}></View> : <></>}
                    </Fragment>
                )
            })
        }
    }

    renderEmpty = () => {
        const { comments, loading } = this.props;
        const { emptyContainerStyle } = styles;
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        if(!loading && comments.length === 0) {
            return (
                <View>
                    <View style={emptyContainerStyle}>
                        <Image source={require('../../assets/images/photo/comment.png')} style={imgStyle} resizeMode="contain" />
                    </View>
                    <MyText style={[textBold, textCenter, textOrange, textH4Style]}>No comments</MyText>
                </View>
            )
        }
    }

  render() {
    const {  contentContainer, divider, container, buttonStyle, buttonContainer, headerStyle, iconStyle,
        reportContainer } = styles;
    const { flexRow, textUnderline, textExtraBold, textBold, textGrey, textH4Style, textSuccess,
            imgStyle, textWhite, textH3Style, textDarkGrey, } = GStyles
    return (
        <View style={container}>
            {this.renderLoading()}
            <View style={contentContainer}>
                {this.renderComments()}
                {this.renderEmpty()}
                {/* <CommentRow name="Banabas Kaviar" />
                <View style={divider}></View>
                <CommentRow name="Joshua Nwabogor" />
                <View style={divider}></View>
                <CommentRow name="Ashley Cole" />
                <View style={buttonContainer}>
                    <CustomButton buttonText="Show All Reviews" buttonStyle={buttonStyle} textStyle={{color: colors.black}} />
                </View> */}
                {/* <View style={divider}></View> */}

                
                {/* <TouchableOpacity style={[flexRow, reportContainer]}>
                    <Icon type="MaterialIcons" name="flag" style={iconStyle} />
                    <MyText style={[textH4Style, textSuccess, textUnderline]}>Report This Listing</MyText>
                </TouchableOpacity> */}
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20
    },
    contentContainer: {
        paddingBottom: 40
    },
    buttonStyle: {
        borderColor: colors.black, borderWidth: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
    },
    iconStyle: {
        fontSize: 25, marginRight: 10, color: colors.success
    },
    reportContainer: {
        marginTop:30
    },
    emptyContainerStyle: {
        height: 200, width: '100%', marginBottom: 20
    }
});

export default CommentComponent;
