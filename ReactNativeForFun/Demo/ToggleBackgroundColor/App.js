import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    YellowBox,
} from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);



export default class App extends Component {

    state = {
        darkTheme: false
    };

    constructor(props) {
        super(props);
    }

    toggleTheme = () => {
        this.setState({ darkTheme: !this.state.darkTheme });
    }


    render() {

        const styles = getStyleSheet(this.state.darkTheme);
        const backgroundColor = StyleSheet.flatten(styles.container).backgroundColor;

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Button title={backgroundColor} onPress={this.toggleTheme} />
                </View>
            </View>
        );
    }


}

const Example = (props) => (
    <View style={[styles.example, props.style]}>
        {props.children}
    </View>
);

const Colors = {
    dark: 'black',
    light: 'white'
};

const baseContainerStyles = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
};

const baseBoxStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: 150,
    width: 150
};

const lightStyleSheet = StyleSheet.create({
    container: {
        ...baseContainerStyles,
        backgroundColor: Colors.light
    }, box: {
        ...baseBoxStyles,
        borderColor: Colors.dark
    }
});

const darkStyleSheet = StyleSheet.create({
    container: {
        ...baseContainerStyles,
        backgroundColor: Colors.dark
    },
    box: {
        ...baseBoxStyles,
        borderColor: Colors.light
    }
});

function getStyleSheet(useDarkTheme) {
    return useDarkTheme ? darkStyleSheet : lightStyleSheet;
}