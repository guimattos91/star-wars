import { memo } from 'react';

import { StyleCard, ManufacturerTitle, TitleCard, ButtonStyle } from './styles';

export type FormType = {
  namecard: string;
  cardnumber: string;
  valid: string;
  safety: string;
};

const FinishCheckoutCard: React.FC = () => {
  return (
    <StyleCard className="p-3 ">
      <ManufacturerTitle>Corellia Mining Corporation </ManufacturerTitle>
      <TitleCard className="pb-3">Digger Crawler</TitleCard>
      <TitleCard>¢ 150000</TitleCard>
      <div className="d-flex justify-content-center">
        <ButtonStyle type="submit"> Finalizar compra</ButtonStyle>
      </div>
    </StyleCard>
  );
};

export default memo(FinishCheckoutCard);
