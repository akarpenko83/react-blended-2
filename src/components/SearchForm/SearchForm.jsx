import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import {
    FormBtn,
    InputSearch,
    SearchFormStyled,
} from './SearchForm.styled';

export class SearchForm extends Component {
    state = {
        value: '',
    };
    onInputChange = e => {
        this.setState({ value: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({ value: '' });
    };
    render() {
        return (
            <SearchFormStyled onSubmit={this.onSubmit}>
                <FormBtn type="submit">
                    <FiSearch size="16px" />
                </FormBtn>
                <InputSearch
                    value={this.state.value}
                    placeholder="What do you want to write?"
                    name="search"
                    required
                    autoFocus
                    onChange={this.onInputChange}
                />
            </SearchFormStyled>
        );
    }
}
