import React from "react";
import {ForecastPresentation} from "./ForecastPresentation";
import {useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
import {initialStateType} from "../03_reducer/MainReducer";


export const ForecastPresentationContainer = () => {

    const data: initialStateType = useSelector((state: AppStateType) => state.mainPage);


    let daysArray = data.days === 3? [...data.forecastItem].splice(0,3) : data.forecastItem;

    return (

            <ForecastPresentation forecastDays={daysArray} date={data.date}/>

    )
};


