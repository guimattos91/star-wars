import { memo } from 'react';

import { useForm } from 'react-hook-form';

import { StyleH2, StyleCard, InputStyled, InputMaskStyled } from './styles';

export type FormType = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

const PersonalInformation: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormType>();

  return (
    <StyleCard className="p-3">
      <StyleH2>Informações Pessoais </StyleH2>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="nome">Nome:</label>
      <div className="mb-2">
        <InputStyled
          type="text"
          id="nome"
          {...register('name', { required: 'Informe seu nome' })}
          required
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="email">E-mail:</label>
      <div className="mb-2">
        <InputStyled
          type="email"
          id="email"
          {...register('email', { required: 'Informe seu e-mail' })}
          className="mb-2"
          required
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="phone">Telefone:</label>
      <div className="mb-2">
        <InputMaskStyled
          id="phone"
          mask="(99)99999-9999"
          {...register('phone', { required: 'Informe seu Telefone' })}
          className="mb-2"
          required
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="cpf">CPF:</label>
      <div className="mb-2">
        <InputMaskStyled
          id="cpf"
          mask="999.999.999-99"
          {...register('cpf', { required: 'Informe seu CPF' })}
          className="mb-2"
          required
        />
        {errors.cpf && <p>{errors.cpf.message}</p>}
      </div>
    </StyleCard>
  );
};

export default memo(PersonalInformation);
