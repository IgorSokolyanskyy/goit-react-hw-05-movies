import PropTypes from 'prop-types';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Search, Form, Button, Input, Icon } from './SearchBox.styled';

export default function SearchBox({ onSubmit }) {
  const [inputSearch, setInputSearch] = useState('');

  const handleInputChange = e => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!inputSearch.trim()) {
      return toast('Please, enter a name', { autoClose: 3000 });
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

      <ToastContainer rtl />
    </Search>
  );
}

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
