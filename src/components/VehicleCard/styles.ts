import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const CardBody = styled.div`
  background-color: #fff;
  border-style: none;
  background-color: #000000;
  color: white;
  border-radius: 5px;
  font-size: small;
  padding: 10px;
`
export const TitleCard = styled.h2`
  border-style: none;
  background-color: #000000;
  color: #f4e426;
`
export const LinkStyled = styled(Link)`
  text-decoration: none;
`
export const PriceCard = styled.p`
  border-style: none;
  background-color: #000000;
  color: #f4e426;
  font-size: 2em;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
`
export const ManufacturerTitle = styled.p`
  color: #707070;
  font-size: smaller;
  margin-bottom: 0;
`
export const TextCommon = styled.p`
  color: white;
  font-size: small;
`
export const ListStyle = styled.ul`
  list-style: none;
  background-color: #000000;
  padding: 0;

  li {
    p {
      margin-bottom: 0;
      margin-top: 0;
    }
  }
`
