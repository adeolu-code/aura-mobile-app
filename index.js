/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => <View style={{backgroundColor: "red", flex: 1}}></View>);
