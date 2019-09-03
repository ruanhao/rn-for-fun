import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                {/*Navigating to a new screen*/}
                <Button
                    title='Go to Details'
                    /* the `navigation` prop is passed in to every screen component in stack navigator */
                    /*If we call this.props.navigation.navigate with a route name that we haven't defined on a stack navigator, nothing will happen.*/
                    onPress={() => this.props.navigation.navigate('Details', { /* 1. Navigate to the Details route with params */
                        itemId: 86,
                        otherParam: 'Coca Cola',
                    })}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {

        /* 2. Get the param, provide a fallback value if not available */

        /* You can also directly access the params object with `this.props.navigation.state.params`.
           This may be `null` if no params were supplied, and so it's usually easier to just use getParam so you don't have to deal with that case.
         */

        /* If you want to access the params directly through props (eg. `this.props.itemId`) rather than `this.props.navigation.getParam`,
           you may use a community-developed react-navigation-props-mapper package (https://github.com/vonovak/react-navigation-props-mapper).
         */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'Sprite');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button
                    title="Go to Details... (nothing will happen)"
                    /*If you are already on that screen then it makes sense that it would do nothing*/
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Go to Details... (push)"
                    /*This allows us to express the intent to add another route REGARDLESS OF THE EXISTING NAVIGATION HISTORY.*/
                    onPress={() => this.props.navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <NavigationEvents
                    onWillFocus={payload => console.log('will focus', payload)}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => console.log('will blur', payload)}
                    onDidBlur={payload => console.log('did blur', payload)}
                />
            </View>
        );
    }
}

/* createStackNavigator is a function that returns a React component. It takes a route configuration object and, optionally, an options object.*/
const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

export default createAppContainer(AppNavigator);