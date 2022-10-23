import { memo, useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import CepApi from 'services/CepApi';

import {
  StyleH2,
  StyleCard,
  InputStyled,
  InputMaskStyled,
  InputStyledSmall,
} from './styles';

export type FormType = {
  cep: string;
  número: string;
  cpf: string;
  phone: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const AdressCard: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>();

  const cepValue = watch('cep');
  const [lastCep, setLastCep] = useState('');
  const fetchAddress = useCallback(
    async (cep: string) => {
      const { data } = await CepApi.get(`/${cep}/json/`);
      setValue('logradouro', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('estado', data.uf);
      setValue('cidade', data.localidade);
    },
    [setValue],
  );

  useEffect(() => {
    const sanitizedCEP = cepValue?.replaceAll(/\D/g, '');
    if (sanitizedCEP?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue);
      fetchAddress(sanitizedCEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue]);

  return (
    <StyleCard className="p-3">
      <StyleH2>Endereços </StyleH2>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="cep">CEP:</label>
      <div className="mb-2">
        <InputMaskStyled
          id="cep"
          mask="99999-999"
          {...register('cep', { required: 'Informe seu Cep' })}
          className="mb-2"
          required
        />
        {errors.cep && <p>{errors.cep.message}</p>}
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="logradouro">Logradouro:</label>
      <div className="mb-2">
        <InputStyled
          type="text"
          id="logradouro"
          {...register('logradouro', { required: 'Informe seu logradouro' })}
          required
        />
        {errors.logradouro && <p>{errors.logradouro.message}</p>}
      </div>
      <div className="d-flex">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="número" className="d-block">
            Número:
          </label>
          <div className="mb-2">
            <InputStyledSmall
              type="text"
              id="número"
              {...register('número', { required: 'Informe seu número' })}
              required
            />
            {errors.número && <p>{errors.número.message}</p>}
          </div>
        </div>
        <div className="px-3">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="complemento" className="d-block">
            Complemento:
          </label>
          <div className="mb-2">
            <InputStyledSmall
              type="text"
              id="complemento"
              {...register('complemento')}
            />
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="Bairro">Bairro:</label>
      <div className="mb-2">
        <InputStyled
          type="text"
          id="bairro"
          {...register('bairro', { required: 'Informe seu Bairro' })}
          required
        />
        {errors.bairro && <p>{errors.bairro.message}</p>}
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="cidade">Cidade:</label>
      <div className="mb-2">
        <InputStyled
          type="text"
          id="cidade"
          {...register('cidade', { required: 'Informe sua cidade' })}
          required
        />
        {errors.cidade && <p>{errors.cidade.message}</p>}
      </div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="estado">Estado:</label>
      <div className="mb-2">
        <InputStyled
          type="text"
          id="estado"
          {...register('estado', { required: 'Informe seu estado' })}
          required
        />
        {errors.estado && <p>{errors.estado.message}</p>}
      </div>
    </StyleCard>
  );
};

export default memo(AdressCard);
