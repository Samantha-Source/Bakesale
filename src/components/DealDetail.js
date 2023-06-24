import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity, PanResponder, Animated, Dimensions, Linking, Pressable } from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {

    imageXPos = new Animated.Value(0);

    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            this.imageXPos.setValue(gestureState.dx);
        },
        onPanResponderRelease: (event, gestureState) => {
            this.width = Dimensions.get('window').width;
            if (Math.abs(gestureState.dx) > this.width * 0.4) {
                const direction = Math.sign(gestureState.dx);
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                    useNativeDriver: false,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        }
    })

    handleSwipe = (indexDirection) => {
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0,
                useNativeDriver: false,
            }).start()
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            // Animate next image
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
                useNativeDriver: false,
            }).start()
        })
    }

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
    };

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal,
        });
    }

    openDealUrl = () => {
        Linking.openURL(this.state.deal.url);
    }

  render() {
    const { deal } = this.state;

    return (
      <ScrollView style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
            <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image 
            {...this.imagePanResponder.panHandlers}
            source={{ uri: deal.media[this.state.imageIndex] }} 
            style={[{ left: this.imageXPos }, styles.image]}
        />
        <View style={styles.info}>
            <Text style={styles.title}>{deal.title}</Text>
            <View style={styles.footer}>
                <View style={styles.causeInfo}>
                  <Text style={styles.cause}>{deal.cause.name}</Text>
                  <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                </View>
                {deal.user && (
                    <View style={styles.user}>
                        <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                        <Text style={styles.userName}>{deal.user.name}</Text>
                    </View>
                )}
            </View>
        </View>
        
            <View style={styles.description}>
                <Text style={styles.descriptionText}>{deal.description}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.buyButton} onPress={this.openDealUrl}>
                    <Text style={styles.buttonText}>Buy this deal!</Text>
                </Pressable>
            </View>

      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
    // deal: {
    //     marginHorizontal: 12,
    //     marginTop: 20,
    //     borderColor: '#bbb',
    //     borderWidth: 1,
    //     borderRadius: 10,
    // },
    backLink: {
        marginBottom: 5,
        marginTop: 2,
        color: '#0645ad',
        marginLeft: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#ccc',
    },
    info: {
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        padding: 15,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
        color: 'black',
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: 5,
        marginVertical: 5
    },
    causeInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cause: {
        paddingTop: 15,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    price: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    user: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    userName: {
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
        padding: 5,
        borderRadius: 10
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    }, 
    buttonContainer: {
        paddingTop: 10,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buyButton: {
        backgroundColor: '#b5e48c',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        fontWeight: 'bold',
        borderWidth: .5
    }, 
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
    }
})

export default DealDetail;
