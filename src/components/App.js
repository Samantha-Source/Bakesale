import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends React.Component {

    state = {
        deals: [],
        dealsFromSearch: [],
        currentDealId: null,
    };

    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        this.setState({ deals });
    }

    searchDeals = async (searchTerm) => {
        let dealsFromSearch = [];
        if (searchTerm) {
            dealsFromSearch = await ajax.fetchDealsSearchResult(searchTerm);
        }
        this.setState({ dealsFromSearch })
    }

    setCurrentDeal = (dealId) => {
        this.setState({ 
            currentDealId: dealId
        }); 
    }

    unsetCurrentDeal = () => {
        this.setState({ 
            currentDealId: null
        }); 
    }

    currentDeal = () => {
        return this.state.deals.find(
            (deal) => deal.key === this.state.currentDealId
        );
    };

  render() {
    if (this.state.currentDealId) {
        return <DealDetail initialDealData={this.currentDeal()} onBack={this.unsetCurrentDeal} />
    }
    const dealsToDisplay = 
        this.state.dealsFromSearch.length > 0 
        ? this.state.dealsFromSearch 
        : this.state.deals;

    if (dealsToDisplay.length > 0) {
        return (
        <View style={styles.main}>
            <SearchBar searchDeals={this.searchDeals} />
            <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
        )
    }
    return (
      <View style={styles.container}> 
        <Text style={styles.header}>BakeSale</Text>  
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    header: {
        fontSize: 40,
    }
});

export default App;
