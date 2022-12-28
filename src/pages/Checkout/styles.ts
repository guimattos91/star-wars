import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Banner from 'assets/Banner.png'

export const StyleMain = styled.main`
  background-color: #282a36;
`
export const BgImg = styled.div`
  background-image: url(${Banner});
  height: 320px;
  background-size: cover;
  background-position: center center;
`
export const StyleH2White = styled.h2`
  color: white;
`

export const StyleCard = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 1rem;

  @media (max-width: 991px) {
    height: 100%;
  }
`
export const StyleCardFinishPurchase = styled.div`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 1rem;

  @media (max-width: 991px) {
    margin-top: 0;
    margin-left: 1.5rem;
    min-width: 336px;
  }
  @media (max-width: 767px) {
    padding: 1rem;
    margin-top: 1rem;
    margin-left: 0;
    min-width: 100%;
  }
`
export const DivFlex = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`
export const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    flex-direction: row;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`
export const StyleH2 = styled.h2`
  color: #f4e426;
  font-size: larger;
  font-weight: 700;
`
export const InputStyled = styled.input`
  color: white;
  background-color: #333333;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border-style: none;
  width: 100%;
  padding: 5px 10px;
`
export const InputStyledSmall = styled.input`
  color: white;
  background-color: #333333;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border-style: none;
  max-width: 80px;
  padding: 5px 10px;
`

export const InputMaskStyled = styled(InputMask)`
  color: white;
  background-color: #333333;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border-style: none;
  width: 100%;
  padding: 5px 10px;
`
export const InputMaskStyledSmall = styled(InputMask)`
  color: white;
  background-color: #333333;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border-style: none;
  width: 100%;
  padding: 5px 10px;
  max-width: 150px;
`
export const ManufacturerTitle = styled.p`
  color: #707070;
  font-size: smaller;
  margin-bottom: 0;
`
export const LinkStyled = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    color: black;
  }
`

export const TitleCard = styled.h2`
  border-style: none;
  background-color: #000000;
  color: #f4e426;
`

export const ButtonStyle = styled.button`
  background-color: #f4e426;
  border: none;
  border-radius: 5px;
  margin: 0.5em;
  padding: 0.5em 2em 0.5em 2em;
  font-weight: 700;

  p {
    margin: 0;
  }

  @media (max-width: 1023px) {
    margin-left: 0;
  }
`
