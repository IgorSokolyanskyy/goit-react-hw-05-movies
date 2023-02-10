import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0;
  margin-bottom: 16px;
`;

export const List = styled.ul`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  text-decoration: none;

  padding: 0;
  margin: 0;
`;
export const Item = styled.li`
  width: 250px;
  list-style: none;
  text-decoration: none;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
