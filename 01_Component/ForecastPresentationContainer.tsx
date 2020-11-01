import React, {useState} from "react";
import {ForecastPresentation} from "./ForecastPresentation";
import {useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
import {initialStateType} from "../03_reducer/MainReducer";
import {StyleSheet, Text, View} from "react-native";
import {
    dataArrayOfDailyForecastsType, dataDailyForecastType,
    feelsLikeForecastType,
    tempForecastType,
    weatherForecastType
} from "../04_Types/types";


export const ForecastPresentationContainer = () => {

    const data: initialStateType = useSelector((state: AppStateType) => state.mainPage);

    type stateType = {
        date: string,
        days: number,
        forecastArray: dataArrayOfDailyForecastsType
    }
    const [state, setState] = useState<stateType>({
        date: '',
        days: 0,
        forecastArray: []
    });

    let daysArray = data.days === 3? [...data.forecastItem].splice(0,3) : data.forecastItem;

    return (

        <View style={styles.forecastBox}>

            <ForecastPresentation forecastDays={daysArray} date={data.date}/>

        </View>

    )
};

const styles = StyleSheet.create({
   forecastBox: {
       marginTop: '55px'
   }
});
