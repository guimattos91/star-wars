import { memo } from 'react';

import { useForm } from 'react-hook-form';

import {
  StyleH2,
  StyleCard,
  InputStyled,
  InputStyledSmall,
  InputMaskStyledSmall,
} from './styles';

export type FormType = {
  namecard: string;
  cardnumber: string;
  valid: string;
  safety: string;
};

const PaymentsCard: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormType>();

  return (
    <StyleCard className="p-3">
      <StyleH2>Formas de Pagamento </StyleH2>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="nomecartão">Nome do titular do cartão:</label>
      <div className="mb-2">
        <InputStyled
          type="text"
          id="nomecartão"
          {...register('namecard', { required: 'Informe seu nome' })}
          required
        />
        {errors.namecard && <p>{errors.namecard.message}</p>}
      </div>{' '}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="cardnumber">Número do cartão:</label>
      <div className="mb-2">
        <InputStyled
          type="cardnumber"
          id="cardnumber"
          {...register('cardnumber', {
            required: 'Informe o número de seu cartão',
          })}
          className="mb-2"
          required
        />
        {errors.cardnumber && <p>{errors.cardnumber.message}</p>}
      </div>
      <div className="d-flex">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="valid">Validade:</label>
          <div className="mb-2">
            <InputMaskStyledSmall
              mask="99/99"
              id="valid"
              {...register('valid', {
                required: 'Informe a data do seu cartão',
              })}
              className="mb-2"
              required
            />
            {errors.valid && <p>{errors.valid.message}</p>}
          </div>
        </div>
        <div className="px-2">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="safety">Código de segurança:</label>
          <div className="mb-2">
            <InputStyledSmall
              id="safety"
              {...register('safety', { required: 'Informe seu CPF' })}
              className="mb-2"
              required
            />
            {errors.safety && <p>{errors.safety.message}</p>}
          </div>
        </div>
      </div>
    </StyleCard>
  );
};

export default memo(PaymentsCard);
