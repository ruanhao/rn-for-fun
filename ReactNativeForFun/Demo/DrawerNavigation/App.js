import React from 'react';
import { ScrollView, StyleSheet, Image, Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { DrawerNavigatorItems, createDrawerNavigator } from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';

class MyHomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./home-icon.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
        drawerLockMode: 'locked-closed'
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />

                <Button
                    onPress={() => this.props.navigation.openDrawer()}
                    title="Open Drawer"
                />

                <Button
                    onPress={() => this.props.navigation.closeDrawer()}
                    title="Close Drawer"
                />

                <Button
                    onPress={() => this.props.navigation.toggleDrawer()}
                    title="Toggle Drawer"
                />

            </View>
        );
    }
}

const CustomDrawerContentComponent = props => {
    console.log(props);
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView>
                <DrawerNavigatorItems {...props} />
            </ScrollView>

            <View
                style={{
                    borderBottomColor: 'lightgrey',
                    borderBottomWidth: 1,
                    marginBottom: 5,
                }}
            />

            <Text style={{ alignSelf: 'flex-start', marginLeft: 10, }}>
                author: Hao Ruan
                {'\n'}
                version: 1.0.0
            </Text>

        </SafeAreaView>
    );
}


class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Notifications',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./notif-icon.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),

    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    container: {
        flex: 1,
    }
});

const MyDrawerNavigator = createDrawerNavigator(
    {
        Home: MyHomeScreen,
        Notifications: MyNotificationsScreen,
    },
    {
        // drawerBackgroundColor: 'lightyellow',
        hideStatusBar: 'true',
        contentComponent: props => <CustomDrawerContentComponent {...props} />
    }
);

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
    render() {
        return (
            <AppContainer />
        );
    }

}
