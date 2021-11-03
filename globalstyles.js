import { StyleSheet, Platform } from 'react-native';
import {COLORS} from './constants'
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        paddingTop: Platform.OS === 'android' ? 38 : 0
    },
});