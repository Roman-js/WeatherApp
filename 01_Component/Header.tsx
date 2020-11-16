import SearchIcon from "@material-ui/icons/Search";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {IconButton, TextField} from "@material-ui/core";
import {getChoseCityWeather, getGeoLocation, responseResult} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";


export const Header = () => {

    const responseResultData = useSelector((state: AppStateType) => state.mainPage.responseResult);
    const cityTitle = useSelector((state: AppStateType) => state.mainPage.city);
    const dispatch = useDispatch();
    /*const route = useRoute();*/
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
        setTimeout(()=> !responseResultData && setState({...state, onSearch: false}), 25000);
        state.searchingCity
            ? dispatch(getChoseCityWeather(state.searchingCity))
            : dispatch(responseResult(true));
    };
    const onCityField = () => {
        setTimeout(()=> !responseResultData && setState({...state, onSearch: false}), 35000);
        setState({...state, onSearch: true})
    };
    const getLocation = () =>{
        dispatch(getGeoLocation())
        setState({...state, onSearch: false})
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
                                        onClick={getRequiredCityWeather}/>
                        </IconButton>
                        <IconButton>
                        <LocationSearchingIcon onClick={getLocation} style={{color: 'white'}}/>
                        </IconButton>
                        {/*<FindGeoLocation/>*/}
                    </View>
                    : <View style={styles.iconsBox}>

                        <Text style={styles.textStyle}>{cityTitle || state.searchingCity}</Text>
                        <SearchIcon onClick={onCityField}/>
                        <IconButton>
                        <LocationSearchingIcon onClick={getLocation} style={{color: 'white'}}/>
                        </IconButton>
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 100,
        color: 'white',
        alignItems: 'center',
        /*position: 'absolute',*/

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
        fontSize: '17px'
    }
});
