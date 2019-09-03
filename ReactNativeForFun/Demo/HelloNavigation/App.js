import React from 'react';
import { Image, Button, View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('./spiro.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

class HomeScreen extends React.Component {
    /* A screen component can have a static property called `navigationOptions`
       which is EITHER an object OR a function that returns an object that contains various configuration options.*/
    static navigationOptions = ({ navigation }) => {
        return {
            // headerTitle: 'Home',
            headerTitle: <LogoTitle />, // customize title with Image
            headerRight: (
                <Button
                    /* The most commonly used pattern for giving a header button access to a function on the component instance is to use `params` */
                    /* Note: React Navigation doesn't guarantee that your screen component will be mounted before the header. */
                    onPress={navigation.getParam('increaseCount')}
                    title="+1"
                    color="#fff"
                />
            ),
            /* There are three key properties to use when customizing the style of your header: `headerStyle`, `headerTintColor`, and `headerTitleStyle` */
            headerStyle: {
                backgroundColor: 'orange',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    state = {
        count: 0,
    };

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen ({this.state.count} hits)</Text>
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
    /* React Navigation will call it with an object containing `{ navigation, navigationOptions, screenProps }` */
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };

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

        const d = new Date();
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
                <Button
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({ otherParam: `Updated@${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` })}
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
        /* Sharing common navigationOptions across screens */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'yellow',
            },
            headerTintColor: 'blue',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
        /* The property navigationOptions can be used to configure the navigator itself */
        navigationOptions: {
            tabBarLabel: 'Home!',
        },
    }
);

const AppContainer = createAppContainer(createBottomTabNavigator({ AppNavigator }));

export default class App extends React.Component {
    render() {
        return (
            <AppContainer
                onNavigationStateChange={(prevState, newState, action) => {
                    console.log("Navigation state change: ", prevState, newState, action);
                }}
            />
        );
    }

}
