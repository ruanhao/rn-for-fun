import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

export default class App extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage}
                            source={require('./user.png')} />
                    </View>

                    <View>
                        <Text style={styles.cardName}>
                            江户川柯南
                        </Text>
                    </View>

                    <View style={styles.cardOccupationContainer}>
                        <Text style={styles.cardOccupation}>
                            侦探
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.cardDescription}>
                            外表看似小孩，其真实身份是高中生侦探--工藤新一。
                            为了隐藏真实身份，化名江户川柯南，在青梅竹马的毛利兰家寄住的同时，日复一日解决了许多案件。
                            一切都是为了恢复自己的身体。
                        </Text>
                    </View>
                </View>
            </View >
        );
    }
}

const profileCardColor = 'dodgerblue';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: profileCardColor,
        width: 300,
        height: 400
    },
    cardImageContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        width: 125,
        height: 125,
        borderRadius: 60,
        marginTop: 30,
        paddingTop: 16,
    },
    cardImage: {
        width: 85,
        height: 85,
    },
    cardName: {
        color: 'white',
        marginTop: 30,
    },
    cardOccupationContainer: {
        borderColor: 'black',
        borderBottomWidth: 3
    },
    cardOccupation: {
        marginTop: 10,
        marginBottom: 10,
    },
    cardDescription: {
        marginTop: 10,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 10
    },
});
