import styled from 'styled-components';
import { HiSearch } from 'react-icons/hi';

export const Search = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 300px;
  border: 1px solid #bfbbba;
  border-radius: 3px;

  background-color: #fff;

  overflow: hidden;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 100%;
  font: inherit;
  font-size: 1rem;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Button = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 0;
  outline: none;
  cursor: pointer;
`;

export const Icon = styled(HiSearch)`
  width: 25px;
  height: 25px;
`;
