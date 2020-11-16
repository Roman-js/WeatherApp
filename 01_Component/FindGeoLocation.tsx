import React, {useEffect} from "react";
import {View} from "react-native";
import Geolocation from 'react-native-geolocation-service';


export const FindGeoLocation = () =>{





    useEffect(()=> {
        debugger
        Geolocation.getCurrentPosition((position) => {
            console.log(position);
        }, (error) => {
            // См. таблицы кодов ошибок выше.
            debugger
            console.log(error.code, error.message);
        }, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 100000
        });
    }, []);

    return(
    <View>

    </View>
    )
};
