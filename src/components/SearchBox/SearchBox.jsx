import { useState } from 'react';
import { Search, Form, Button, Input, Icon } from './SearchBox.styled';

import PropTypes from 'prop-types';

export default function SearchBox({ onSubmit }) {
  const [inputSearch, setInputSearch] = useState('');

  const handleInputChange = e => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputSearch.trim()) {
      return alert('Please, enter a name');
    }

    onSubmit(inputSearch);
    reset();
  };

  const reset = () => {
    setInputSearch('');
  };

  return (
    <Search>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search movies"
          value={inputSearch}
          onChange={handleInputChange}
        />
        <Button type="submit">
          <Icon />
        </Button>
      </Form>
    </Search>
  );
}

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
