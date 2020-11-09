import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Weather} from "./01_Component/Whether";
import {Header} from "./01_Component/Header";
import {Provider} from "react-redux";
import store from "./03_reducer/store";
import {BrowserRouter} from "react-router-dom";
import {WeatherForecast} from "./01_Component/WeatherForecast";
import {ForecastPresentationContainer} from "./01_Component/ForecastPresentationContainer";

export default function App() {
    return (
        // <NativeRouter>
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>

                        <View style={styles.container}>
                            <Header/>
                            <Weather/>
                            {/*<ForecastPresentationContainer/>*/}
                            <WeatherForecast/>
                        </View>
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
