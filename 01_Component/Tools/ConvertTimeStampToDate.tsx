import React from "react";
import {View} from "react-native";

export const convert = (timestamp: number) =>{



    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let day = date.getDay();
    let month = 1+ date.getMonth();
    let year = date.getFullYear();
    let dayNumber = date.getDate();

    const daysOfWeek = () =>{
    switch (day) {
        case 1: return 'понедельник';
        case 2: return 'вторник';
        case 3: return 'среда';
        case 4: return 'четверг';
        case 5: return 'пятница';
        case 6: return 'суббота';
        case 0: return 'воскресенье';
    }};
   const months = () => {
        switch (month) {
        case 1: return  'января';
        case 2: return  'февраля';
        case 3: return  'марта';
        case 4: return  'апреля';
        case 5: return  'мая';
        case 6: return  'июня';
        case 7: return  'июля';
        case 8: return  'августа';
        case 9: return  'сентября';
        case 10: return 'октября';
        case 11: return 'ноября';
        case 12: return 'декабря';
    }};

    return  [daysOfWeek(), dayNumber, months(), year]

    //let formattedTime = date+' '/*+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);*/
    // formattedTime.substr(0, 15)
};



export const ConvertTimeStampToDate = () =>{


    return(
        <View>


        </View>
    )
};
