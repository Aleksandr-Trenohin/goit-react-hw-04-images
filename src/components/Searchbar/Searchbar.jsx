import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

import { Notify } from 'notiflix';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    title: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = evt => {
    this.setState({ title: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    const { title } = this.state;
    evt.preventDefault();

    if (title.trim() === '') {
      Notify.warning('Please enter a title');
    }

    this.props.onSubmit(title);

    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BsSearch size="22px" />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}

export default Searchbar;
