import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image_results/ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apikey: '5476484-96adea4372ec057bdf7b6a9be',
    images: []
  };

  onTextChange = e => {
    const searchText = e.target.value;
    if (searchText === '') {
      this.setState({ searchText: '', images: [] });
    } else
      this.setState({ [e.target.name]: e.target.value }, () => {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apikey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safeSearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      });
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>

        {this.state.images.length > 0 && (
          <ImageResults images={this.state.images} />
        )}
      </div>
    );
  }
}

export default Search;
