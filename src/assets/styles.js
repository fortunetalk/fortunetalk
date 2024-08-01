import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export { SCREEN_HEIGHT, SCREEN_WIDTH }

export const Colors = {
  primaryDark: '#E15602',
  primaryLight: '#F27806',
  white: '#fff',
  whiteDark: '#F5F5F5',
  grayLight: '#ECEAEA',
  gray: '#A3A3A3',
  grayDark: '#9C9797',
  grayMedium: '#9B9696',
  grayA: '#7B7B7B',
  grayB: '#969696',
  grayC: '#8F8F8F',
  grayD: '#F4F4F4',
  grayE: '#BFBFBF',
  grayF: '#F8F8F8',
  grayG: '#F9F9F9',
  grayI: '#F1F1F1',
  grayJ: '#F3F3F3',
  grayK: '#B0B0B0',
  grayL: '#FAFAFA',
  grayM: '#747474',
  grayN: '#A4A4A4',
  grayO: '#B4B4B4',
  grayP: '#D6D6D6',
  grayQ: '#E2E1E1',
  blackLight: '#717171',
  black: '#000000',
  greenLight: '#2B8600',
  greenDark: '#34A853',
  green_a: '#5DC709',
  red: '#FF0000',
  red_a: '#FF0404',
  blueFacebook: '#1877F2',
  orange: '#F27806',
  orange_light: '#FFF2E5',
  bodyColor: '#fff',
};

export const Fonts = {
  _9InterRegular: {
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    fontSize: 9,
  },

  _11InterRegular: {
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    fontSize: 11,
  },
  _13InterRegular: {
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    fontSize: 13,
  },
  _15InterRegular: {
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    fontSize: 15,
  },
  _18InterRegular: {
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    fontSize: 18,
  },

  _9InterMedium: {
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    fontSize: 9,
  },
  _11InterMedium: {
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    fontSize: 11,
  },
  _13InterMedium: {
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    fontSize: 13,
  },
  _15InterMedium: {
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    fontSize: 15,
  },
  _18InterMedium: {
    fontFamily: 'Inter-Medium',
    color: Colors.black,
    fontSize: 18,
  },

  _9InterBold: {
    fontFamily: 'Inter-Bold',
    color: Colors.black,
    fontSize: 9,
  },
  _11InterBold: {
    fontFamily: 'Inter-Bold',
    color: Colors.black,
    fontSize: 11,
  },

  _13InterBold: {
    fontFamily: 'Inter-Bold',
    color: Colors.black,
    fontSize: 13,
  },

  _15InterBold: {
    fontFamily: 'Inter-Bold',
    color: Colors.black,
    fontSize: 15,
  },

  _18InterBold: {
    fontFamily: 'Inter-Bold',
    color: Colors.black,
    fontSize: 18,
  },

  _9InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
    fontSize: 9,
  },
  _11InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
    fontSize: 11,
  },
  _13InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
    fontSize: 13,
  },
  _15InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
    fontSize: 15,
  },
  _18InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.black,
    fontSize: 18,
  },

  _9RobotoRegular: {
    fontFamily: 'Roboto-Regular',
    color: Colors.black,
    fontSize: 9,
  },
  _11RobotoRegular: {
    fontFamily: 'Roboto-Regular',
    color: Colors.black,
    fontSize: 11,
  },

  _13RobotoRegular: {
    fontFamily: 'Roboto-Regular',
    color: Colors.black,
    fontSize: 13,
  },
  _13RobotoBold: {
    fontFamily: 'Roboto-Bold',
    color: Colors.black,
    fontSize: 13,
  },
  _15RobotoRegular: {
    fontFamily: 'Roboto-Regular',
    color: Colors.black,
    fontSize: 15,
  },
  _15RobotoBold: {
    fontFamily: 'Roboto-Bold',
    color: Colors.black,
    fontSize: 15,
  },
  _18RobotoRegular: {
    fontFamily: 'Roboto-Regular',
    color: Colors.black,
    fontSize: 18,
  },

  _9RobotoMedium: {
    fontFamily: 'Roboto-Medium',
    color: Colors.black,
    fontSize: 9,
  },
  _11RobotoMedium: {
    fontFamily: 'Roboto-Medium',
    color: Colors.black,
    fontSize: 11,
  },
  _13RobotoMedium: {
    fontFamily: 'Roboto-Medium',
    color: Colors.black,
    fontSize: 13,
  },
  _15RobotMedium: {
    fontFamily: 'Roboto-Medium',
    color: Colors.black,
    fontSize: 15,
  },
  _18RobotoMedium: {
    fontFamily: 'Roboto-Medium',
    color: Colors.black,
    fontSize: 18,
  },
  _18RobotoBold: {
    fontFamily: 'Roboto-Bold',
    color: Colors.black,
    fontSize: 18,
  },

  primaryDark11InterMedium: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: Colors.primaryDark,
  },
  primaryDark14RobotoMedium: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontFamily: 'Roboto-Medium',
  },
  primaryDark16RobotoMedium: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: 'Roboto-Medium',
  },

  primaryDark18RobotoMedium: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontFamily: 'Roboto-Medium',
  },

  primaryLight14RobotoRegular: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontFamily: 'Roboto-Regular',
  },

  primaryLight14RobotoMedium: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontFamily: 'Roboto-Medium',
  },

  primaryLight15RobotoLight: {
    fontSize: 15,
    color: Colors.primaryDark,
    fontFamily: 'Roboto-Light',
  },

  primaryLight15RobotoMedium: {
    fontSize: 15,
    color: Colors.primaryLight,
    fontFamily: 'Roboto-Medium',
  },

  primaryLight15RobotoRegular: {
    fontSize: 15,
    color: Colors.primaryLight,
    fontFamily: 'Roboto-Regular',
  },

  primaryLight18RobotoRegular: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontFamily: 'Roboto-Regular',
  },

  primaryLight18RobotoMedium: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontFamily: 'Roboto-Medium',
  },

  black12RobotoRegular: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },

  black14RobotoRegular: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },

  black16RobotoRegular: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },

  black16RobotoMedium: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },

  black18RobotoRegular: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },

  black18RobotoMedium: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },

  black22RobotoMedium: {
    color: Colors.black,
    fontSize: 22,
    fontFamily: 'Roboto-Medium',
  },

  blackLight14RobotoRegular: {
    color: Colors.blackLight,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },

  blackLight16RobotoMedium: {
    color: Colors.blackLight,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },

  gray18RobotoRegular: {
    fontSize: 18,
    color: Colors.gray,
    fontFamily: 'Roboto-Regular',
  },
  gray18RobotoMedium: {
    fontSize: 18,
    color: Colors.gray,
    fontFamily: 'Roboto-Medium',
  },

  grayLightRobotoRegular: {
    fontSize: 14,
    color: Colors.grayLight,
    fontFamily: 'Roboto-Regular',
  },

  gray9RobotoRegular: {
    fontSize: 9,
    color: Colors.gray,
    fontFamily: 'Roboto-Regular',
  },

  gray11RobotoRegular: {
    fontSize: 11,
    color: Colors.gray,
    fontFamily: 'Roboto-Regular',
  },

  gray14RobotoRegular: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: 'Roboto-Regular',
  },

  gray12RobotoMedium: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: 'Roboto-Medium',
  },

  gray12RobotoRegular: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: 'Roboto-Regular',
  },

  gray14RobotoMedium: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: 'Roboto-Medium',
  },

  grayA14RobotoMedium: {
    fontSize: 14,
    color: Colors.grayA,
    fontFamily: 'Roboto-Medium',
  },

  gray16RobotoMedium: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: 'Roboto-Medium',
  },

  gray16RobotoRegular: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: 'Roboto-Regular',
  },


  white11InterMedium: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
  },
  white12RobotoMedium: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  white12RobotoRegular: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Roboto-Regualr',
  },
  white14RobotoRegular: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Roboto-Regular',
  },
  white14RobotoMedium: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  white16RobotoMedium: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  white18RobotMedium: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  white18RobotBold: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
  },

  greenDark14InterMedium: {
    fontSize: 14,
    color: Colors.greenDark,
    fontFamily: 'Inter-Medium',
  },
  black11InterMedium: {
    fontSize: 11,
    color: Colors.black,
    fontFamily: 'Inter-Medium',
  },
  black14InterMedium: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Inter-Medium',
  },

  primaryLight18RighteousRegular: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontFamily: 'Righteous-Regular',
  },



}

export const Sizes = {
  fixPadding: 10,
};
