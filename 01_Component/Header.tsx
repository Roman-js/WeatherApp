import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {IconButton, TextField} from "@material-ui/core";
import {getChoseCityWeather, responseResult} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";


export const Header = () => {

    const responseResultData = useSelector((state: AppStateType) => state.mainPage.responseResult);
    const cityTitle = useSelector((state: AppStateType) => state.mainPage.city);

    const dispatch = useDispatch();
    const [state, setState] = useState({
        onSearch: false,
        searchError: responseResultData,
        searchingCity: ''
    });

    let error = responseResultData ? 'This is required' : '';

    const valueOfTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let city = e.currentTarget.value;
        setState({...state, searchingCity: city, searchError: false});
        dispatch(responseResult(false));
    };

    const getRequiredCityWeather = () => {
       state.searchingCity
           ? dispatch(getChoseCityWeather(state.searchingCity))
           : dispatch(responseResult(true));

       /*!responseResultData && setState({...state, onSearch: responseResultData})*/
    };
    return (
        <View style={styles.headerBox}>

            <header>
                {state.onSearch
                    ? <View style={styles.searchBox}>
                        <TextField
                            placeholder={'Moscow'}
                            error={responseResultData}
                            helperText={error}
                            inputProps={{style: {fontFamily: 'Arial', color: 'white'}}}
                            autoFocus
                            onChange={valueOfTextField}
                            /*onBlur={()=>{setState({...state, onSearch: false})}}*/
                        />
                        <IconButton>
                            <SearchIcon style={{color: 'white'}}
                                        onClick={ getRequiredCityWeather}/>
                        </IconButton>
                        <LocationSearchingIcon/>

                    </View>
                    : <View style={styles.iconsBox}>
                        <Text style={styles.textStyle}>{cityTitle || state.searchingCity}</Text>
                        <SearchIcon onClick={() => {
                            setState({...state, onSearch: true})
                        }}/>
                        <LocationSearchingIcon/>

                    </View>
                }

            </header>
        </View>
    )
};

const styles = StyleSheet.create({
    headerBox: {
        width: '100%',
        height: '55px',
        backgroundColor: '#3d4a5d',
        zIndex: 100,
        color: 'white',
        alignItems: 'flex-end',

        position: 'absolute'
    },
    iconsBox: {
        height: '55px',
        width: '250px',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingRight: '10px'
    },
    searchBox: {
        width: '100%',
        height: '55px',
        flexDirection: 'row',
        paddingRight: '10px',
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        width: '150px',
        fontSize: '17px'}
});
