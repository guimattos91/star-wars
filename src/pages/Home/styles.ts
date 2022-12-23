import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

import Banner from 'assets/Banner.png'

export const StyleMain = styled.main`
  background-color: #282a36;
`
export const BgImg = styled.div`
  background-image: url(${Banner});
  height: 320px;
  background-size: cover;
  background-position: center;
`

export const DivSearch = styled.div`
  border: none;
  background-color: black;
  border-radius: 5px;
  padding: 1em;
  margin-top: -50px;
  flex: flex;
  width: 100%;
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`
export const InputStyle = styled.input`
  border: none;
  background-color: white;
  color: black;
  border-radius: 5px;
  flex: flex;
  width: 100%;
  padding: 1rem 1rem;

  :focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }
  @media (max-width: 576px) {
    margin: 0;
  }
`
export const ButtonStyle = styled.button`
  background-color: #f4e426;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 2rem 0.75rem 2rem;
  margin: 0 0 0 0.5rem;
  display: block;

  @media (max-width: 576px) {
    margin: 1rem 0.5rem 0 0.5rem;
  }
`
export const DivError = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
`
