import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Article = styled.article`
  display: flex;
  justify-content: start;
  margin-bottom: 22px;
`;

export const MovieInfo = styled.div`
  margin-left: 15px;
`;
export const Title = styled.h1`
  margin: 0;
  margin-bottom: 12px;
  font-size: 48px;
`;

export const Img = styled.img`
  width: 350px;
`;

export const Subtitle = styled.h2`
  display: flex;
  justify-content: center;
`;
export const Link = styled(NavLink)`
  font-size: 20px;
  color: blue;
  text-decoration: none;
`;
export const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
