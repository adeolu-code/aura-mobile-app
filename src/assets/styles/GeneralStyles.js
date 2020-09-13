import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../colors';
import SmallScreenStyles from './SmallerScreenStyles';
const width = Dimensions.get('window').width;

const checkScreen = () => {
  if(width <= 360) {
    return SmallScreenStyles
  }
  return {}
}
const styles = StyleSheet.create({
  imgStyle: {
    width: '100%',
    height: '100%',
  },
  imageViewStyles: {
    height: 90,
    width: 120,
  },
  flexRow: {
    display: 'flex', flexDirection: 'row'
  },
  centerContentStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColor: {
    backgroundColor: 'rgb(250,100,0)',
  },
  bgColorFadedYellow: {
    backgroundColor: '#F2A423',
  },
  backgroundColorBlue: {
    backgroundColor: 'rgb(61,91,153)',
  },
  backgroundColorGoogle: {
    backgroundColor: 'rgb(234,67,53)',
  },
  upperCase: {
    textTransform: 'uppercase'
  },
  lowerCase: {
    textTransform: 'lowercase'
  },
  
  textSecondary: {
    color: colors.secondary
  },
  
  textDanger: {
    color: '#FF3100'
  },
  textSuccess: {
    // color: '#0AC876'
    color: colors.success
  },
  textOrange: {
    color: colors.orange
  },
  textInfo: {
    color: '#009ADA'
  },
  textWhiteBlue: {
    color: '#C1DDF7'
  },
  textBrandCloseColor: {
    color: '#9E008E',
  },
  textGrey: {
    color: colors.grey
  },
  textLightGrey: {
    color: colors.lightGrey,
  },
  textLightGreyOne: {
    color: colors.lightGreyOne
  },
  textDarkGrey: {
    color: colors.darkGrey
  },
  textDarkBlue: {
    color: colors.darkBlue
  },
  textFadedBlack: {
    color: colors.fadedBlack
  },
  textLightBlack: {
    color: '#353535'
  },
  textBlack: {
    color: 'rgba(0,0,0,1)',
  },
  lineHeightTextSmall: {
    lineHeight: 20,
  },
  lineHeightText: {
    lineHeight: 24,
  },
  textItalic: {
    fontStyle: 'italic',
  },
  textWhite: {
    color: 'rgba(255,255,255,1)',
  },
  textFadedWhite: {
    color: 'rgba(255,255,255,0.6)',
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  textNormal: {
    fontFamily: 'Nunito-Light',
    fontWeight: '300'
  },
  textBold: {
    // fontWeight: 'bold',
    fontFamily: 'Nunito-Bold',
  },
  textExtraBold: {
    // fontWeight: 'bold',
    fontFamily: 'Nunito-ExtraBold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textXlStyle: {
    fontSize: 40,
    // ...checkScreen().textXlStyle
  },
  textH1Style: {
    fontSize: 32,
    // ...checkScreen().textH1Style
  },
  textLgStyle: {
    fontSize: 28,
    // ...checkScreen().textLgStyle
  },
  textHStyle: {
    fontSize: 24,
    ...checkScreen().textHStyle
  },
  textH2Style: {
    fontSize: 22,
    ...checkScreen().textH2Style
  },
  textH3Style: {
    fontSize: 18,
  },
  textH4Style: {
    fontSize: 16,
    // ...checkScreen().textH4Style
  },
  textH5Style: {
    fontSize: 14,
    // ...checkScreen().textH5Style
  },
  textH6Style: {
    fontSize: 12,
    // ...checkScreen().textH6Style
  },
  textH7Style: {
    fontSize: 10,
    // ...checkScreen().textH7Style
  },
  textH8Style: {
    fontSize: 8,
    // ...checkScreen().textH8Style
  },
  marginVerticalSmall: {
    marginVertical: 10,
  },
  marginTopSmall: {
    marginTop: 10,
  },
  marginBottomSmall: {
    marginBottom: 10,
  },
  marginVerticalMedium: {
    marginVertical: 20,
  },
  marginTopMedium: {
    marginTop: 20,
  },
  marginBottomMedium: {
    marginBottom: 20,
  },
  marginVerticalLarge: {
    marginVertical: 30,
  },
  marginTopLarge: {
    marginTop: 30,
  },
  marginBottomLarge: {
    marginBottom: 30,
  },
  marginVerticalExtraLarge: {
    marginVertical: 40,
  },
  marginTopExtraLarge: {
    marginTop: 40,
  },
  marginBottomExtraLarge: {
    marginBottom: 40,
  },
  shadow: {
    elevation: 3,
    // shadowOffset: { width: 0, height: 2},
    // shadowOpacity: 0.1, shadowRadius: 2, shadowColor: '#000',
  },
});

export default styles;
