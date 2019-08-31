
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import AddCity from './components/AddCity';
import City from './components/City';
import Cities from './components/Cities';
import { colors } from './theme';

const key = 'state'

const initialState = [{
    city: 'Paris',
    country: 'France',
    id: 0,
    locations: []
},
{
    city: 'Tokyo',
    country: 'Japan',
    id: 1,
    locations: []
}];

const CitiesNav = createStackNavigator(
    {
        Cities: { screen: Cities },
        City: { screen: City }
    },

    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: '#fff'
        }
    }

);

const RootNav = createBottomTabNavigator({
    Cities: { screen: CitiesNav },
    AddCity: { screen: AddCity }
})


const AppContainer = createAppContainer(RootNav);

export default class App extends React.Component {

    state = {
        // cities: initialState
        cities: []
    }

    async componentDidMount() {
        try {
            let cities = await AsyncStorage.getItem(key);
            if (cities != null) {
                cities = JSON.parse(cities);
                this.setState({ cities });
            }
        } catch (e) {
            console.log('error from AsyncStorage: ', e)
        }
    }

    addCity = (city) => {
        const cities = this.state.cities
        cities.push(city)
        this.forceUpdate()
        // this.setState({ cities }, () => { console.log(this.state) });
        AsyncStorage.setItem(key, JSON.stringify(cities))
            .then(() => console.log('storage updated!'))
            .catch(e => console.log('e: ', e))
    }

    addLocation = (location, city) => {
        const index = this.state.cities.findIndex(item => {
            return item.id === city.id
        })
        const chosenCity = this.state.cities[index]
        chosenCity.locations.push(location)
        /* const cities = [
         *     ...this.state.cities.slice(0, index),
         *     chosenCity,
         *     ...this.state.cities.slice(index + 1)
         * ]*/
        //        this.setState({
        //          cities
        //    }, () => {
        AsyncStorage.setItem(key, JSON.stringify(this.state.cities))
            .then(() => console.log('storage updated!'))
            .catch(e => console.log('e: ', e));
        //  })
    }

    render() {
        return (
            <AppContainer
                screenProps={{
                    cities: this.state.cities,
                    addCity: this.addCity,
                    addLocation: this.addLocation,
                }}
            />
        );
    }
}