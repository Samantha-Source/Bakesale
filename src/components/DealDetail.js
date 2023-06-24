import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        deal: this.props.initialDealData,
    };

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
        this.setState({
            deal: fullDeal,
        });
    }

  render() {
    const { deal } = this.state;

    return (
      <ScrollView style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
            <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Image 
            source={{ uri: deal.media[0] }} 
            style={styles.image}
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
        // borderWidth: 1,
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
        // marginTop: 15,
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
    }
})

export default DealDetail;
