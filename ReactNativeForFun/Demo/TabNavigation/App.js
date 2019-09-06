import React from 'react';
import { Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />

            </View>
        );
    }
}

var homeHitCount = 0;

class IconWithBadge extends React.Component {
    render() {
        const { name, badgeCount, color, size } = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={name} size={size} color={color} />
                {badgeCount > 0 && (
                    <View
                        style={{
                            // If you're using react-native < 0.57 overflow outside of parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}


class HomeIconWithBadge extends React.Component {
    render() {
        console.log("rendering HomeIconWithBadge: ", this.props.name);
        // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
        return <IconWithBadge {...this.props} badgeCount={homeHitCount} />;
    }

};



/* See all icons: https://oblador.github.io/react-native-vector-icons/ */
const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    /* This function will be called twice when rendering one icon, very weird
       See: https://github.com/react-navigation/react-navigation/issues/546
     */
    console.log(`routerName: ${routeName}, focused: ${focused}`);
    if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Settings') {
        iconName = `${focused ? 'ios' : 'md'}-options`;
    }

    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};


const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Settings: SettingsScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                console.log("Tab pressed: ", navigation);
                const { routeName } = navigation.state;
                if (!navigation.isFocused() && routeName === 'Home') {
                    homeHitCount++;
                }
                defaultHandler();
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }

);

export default createAppContainer(TabNavigator);