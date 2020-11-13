import React from 'react';
import {StyleSheet} from 'react-native';
import {Weather} from "./01_Component/Whether";
import {Header} from "./01_Component/Header";
import {Provider} from "react-redux";
import store from "./03_reducer/store";
import {BrowserRouter} from "react-router-dom";
import {ForecastPresentationContainer} from "./01_Component/ForecastPresentationContainer";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import arrow from  './05_Common/images/HeaderArrow.png'
import {WeatherTomorrow} from "./01_Component/WhetherTomorrow";

const Stack = createStackNavigator();

export default function App() {
    return (
        // <NativeRouter>
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>

                        {/*<Header/>*/}
                        <NavigationContainer>
                            <Stack.Navigator
                                screenOptions={{
                                    headerStyle: {
                                        backgroundColor: '#3d4a5d',


                                    }
                                }}
                            >

                                <Stack.Screen
                                    name="Main"
                                    component={Weather}
                                    /*options={{ headerTitle: props =>  <Header/>}}*/
                                    options={{ headerTitle: props =>  <Header/>,  headerStyle: {
                                            height: 55,
                                            backgroundColor: '#3d4a5d',
                                            borderBottomColor: '#3d4a5d',
                                        },
                                    }}
                                            />
                                <Stack.Screen
                                    name="Tomorrow"
                                    component={WeatherTomorrow}
                                    /*options={{ headerTitle: props =>  <Header/>}}*/
                                    options={{ headerTitle: props =>  <Header/>,  headerStyle: {
                                            height: 55,
                                            backgroundColor: '#3d4a5d',
                                            borderBottomColor: '#3d4a5d',
                                        },
                                    }}
                                />
                                <Stack.Screen
                                    name="Forecasts"
                                    component={ForecastPresentationContainer}
                                    options={{ headerTitle: props =>  <Header/>,  headerStyle: {
                                            height: 55,
                                            backgroundColor: '#3d4a5d',
                                            borderBottomColor: '#3d4a5d',
                                        },



                                        //headerBackImage:  (props: { tintColor: string; }) => props.tintColor = '#F0F8FF'

                                        /*header: ({ goBack }) => ({
                                            left: ( <Icon name={'chevron-left'} onPress={ () => { goBack() } }  /> ),
                                        })*/
                                    }}

                                />

                            </Stack.Navigator>

                        </NavigationContainer>
                        {/*<WeatherForecast/>*/}
                    {/*</View>*/}
                </Provider>
            </React.StrictMode>
        </BrowserRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        /*backgroundColor: 'darkgrey',*/
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
