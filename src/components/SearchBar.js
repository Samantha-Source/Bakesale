import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchTerm: PropTypes.string.isRequired,
    };

    state = {
        searchTerm: this.props.initialSearchTerm,
    };

    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm);
        this.inputElement.blur();
    }

    debouncedSearchDeals = debounce(this.searchDeals, 300);

    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, ()=> {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    };

  render() {
    return (
      <TextInput 
        ref={(inputElement) => {this.inputElement = inputElement}}
        value={this.state.searchTerm}
        style={styles.input}
        placeholder='Search All Deals'
        onChangeText={this.handleChange}
        cursorColor={'blue'}
        />
    )
  }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'rgba(253, 197, 0, 0.2)',
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        textAlign: 'center',
    }
})

export default SearchBar;
