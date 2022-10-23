import styled from 'styled-components';

import Banner from 'assets/Banner.png';

export const StyleMain = styled.main`
  background-color: #282a36;
`;
export const BgImg = styled.div`
  background-image: url(${Banner});
  height: 320px;
  background-size: cover;
  background-position: center center;
`;

export const StyleCard = styled.div`
  background-color: black;
  color: white;
`;
export const StyleH2 = styled.h2`
  color: white;
`;
