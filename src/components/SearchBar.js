import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    };

    state = {
        searchTerm: '',
    };

    debouncedSearchDeals = debounce(this.props.searchDeals, 300);

    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, ()=> {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    };

  render() {
    return (
      <TextInput 
        style={styles.input}
        placeholder='Search All Deals'
        onChangeText={this.handleChange}
        />
    )
  }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: '#ddd',
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        textAlign: 'center',
    }
})

export default SearchBar;
