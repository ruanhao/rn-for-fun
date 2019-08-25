import React, { Component } from 'react';
import PropTypes from 'prop-types'; // specify what properties a component can accept
/* immutability helper function update lets you update a specific piece of the component's state.
 * npm install immutability-helper --save
*/
import update from 'immutability-helper';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const userImage = require('./user.png');
const userImage2 = require('./user2.png');

const data = [
    {
        image: userImage,
        name: '江户川柯南',
        occupation: '侦探',
        description: `外表看似小孩，其真实身份是高中生侦探--工藤新一。
为了隐藏真实身份，化名江户川柯南，在青梅竹马的毛利兰家寄住的同时，日复一日解决了许多案件。
一切都是为了恢复自己的身体。`,
        showThumbnail: true
    },
    {
        image: userImage2,
        name: '毛利兰',
        occupation: 'React Native Developer',
        description: 'Lan is a really great Javascript developer. She loves using JS to build React Native applications for iOS and Android',
        showThumbnail: true
    },
];

const ProfileCard = (props) => {

    const { image, name, occupation, description, onPress, showThumbnail } = props;
    let containerStyles = [styles.cardContainer];

    if (showThumbnail) {
        containerStyles.push(styles.cardThumbnail);
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[containerStyles]}>
                <View style={styles.cardImageContainer}>
                    <Image style={styles.cardImage} source={image} />
                </View>
                <View>
                    <Text style={styles.cardName}>
                        {name}
                    </Text>
                </View>
                <View style={styles.cardOccupationContainer}>
                    <Text style={styles.cardOccupation}>
                        {occupation}
                    </Text>
                </View>
                <View>
                    <Text style={styles.cardDescription}>
                        {description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    )
};

ProfileCard.propTypes = {
    image: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showThumbnail: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
};

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: data
        }
    }

    handleProfileCardPress = (index) => {

        const showThumbnail = !this.state.data[index].showThumbnail;

        this.setState({
            data: update(this.state.data, { [index]: { showThumbnail: { $set: showThumbnail } } })
        });
    };

    render() {
        const list = this.state.data.map(function(item, index) {
            const { image, name, occupation, description, showThumbnail } = item;
            return (
                <ProfileCard key={'card-' + index}
                    image={image}
                    name={name}
                    occupation={occupation}
                    description={description}
                    onPress={this.handleProfileCardPress.bind(this, index)}
                    showThumbnail={showThumbnail} />
            )
        }, this);

        return (
            <View style={styles.container}>
                {list}
            </View>
        );
    }
}

const profileCardColor = 'dodgerblue';

const styles = StyleSheet.create({
    cardThumbnail: {
        transform: [{ scale: 0.3 }]
    },
    container: {
        backgroundColor: 'white',
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
        height: 400,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    height: 10
                },
                shadowOpacity: 1
            },
            android: {
                elevation: 15
            }
        })
    },
    cardImageContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 30,
        paddingTop: 15,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    height: 10,
                },
                shadowOpacity: 1
            },
            android: {
                borderWidth: 3,
                borderColor: 'black',
                elevation: 15
            }
        })
    },
    cardImage: {
        width: 80,
        height: 80
    },
    cardName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 30,
        textShadowColor: 'black',
        textShadowOffset: {
            height: 2,
            width: 2
        },
        textShadowRadius: 3
    },
    cardOccupationContainer: {
        borderColor: 'black',
        borderBottomWidth: 3
    },
    cardOccupation: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    cardDescription: {
        fontStyle: 'italic',
        marginTop: 10,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 10
    }
});