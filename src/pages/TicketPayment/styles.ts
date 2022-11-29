import styled from 'styled-components'

export const StyleMain = styled.main`
  background-color: #282a36;
  @media (max-width: 768px) {
    height: 80vh;
  }
`

export const DivCard = styled.div`
  border: none;
  background-color: black;
  border-radius: 5px;
  flex: flex;
  flex-direction: column;
  width: 35rem;
`
export const DivInformation = styled.div`
  flex: flex;
  flex-direction: column;
  justify-content: center;
`
export const TitleCard = styled.h1`
  color: #f4e426;
`
export const TextStyle = styled.p`
  color: #f4e426;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`

export const ManufacturerTitle = styled.p`
  color: #707070;
  font-size: smaller;
  margin-bottom: 0;
`
export const ButtonStyle = styled.button`
  background-color: #f4e426;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  padding: 5px;
  text-align: center;
  align-self: center;
  p {
    margin: 0;
  }
`
