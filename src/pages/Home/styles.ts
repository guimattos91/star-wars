import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import Banner from 'assets/Banner.png';

export const StyleMain = styled.main`
  background-color: #282a36;
`;
export const BgImg = styled.div`
  background-image: url(${Banner});
  height: 320px;
  background-size: cover;
  background-position: center;
`;

export const DivSearch = styled.div`
  border: none;
  background-color: black;
  border-radius: 5px;
  padding: 1em;
  margin-top: -50px;
  flex: flex;
  flex-grow: 1;
`;
export const InputStyle = styled.input`
  border: none;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin-right: 0.5em;
  flex: flex;
  flex-grow: 1;
`;
export const ButtonStyle = styled.button`
  background-color: #f4e426;
  border: none;
  border-radius: 5px;
  p {
    margin: 0;
  }
`;

export const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;

  li {
    list-style: none;
    color: #282a36;

    a {
      display: inline-block;
      border: none;
      padding: 10px 20px;
      border-radius: 3px;
      margin: 5px 5px;
      color: #282a36;
      text-decoration: none;
      background-color: #f4e426;
      &:hover {
        color: black;
      }
    }

    &.selected a {
      background-color: white;
      color: #282a36;
      border: none;
    }

    &:hover {
      color: black;
    }
  }
`;
