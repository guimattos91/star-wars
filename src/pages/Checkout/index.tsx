import { memo, useCallback, useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Banner from 'assets/Banner.png'

import { useAdress } from 'context/AddressContext'
import { useVehicles } from 'context/VehiclesContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingComponent from 'components/LoadingComponent'

import { normalizeFormData } from 'helpers'

import useTitle from 'hooks/useTitle'

import { FormType } from 'types/FormType'

import {
  ButtonCreditCardStyled,
  ButtonStyle,
  ButtonTicketStyled,
  DivFlex,
  DivFlexColumn,
  InputLoadingDiv,
  InputLoadingDivSmall,
  InputMaskStyled,
  InputMaskStyledSmall,
  InputStyled,
  InputStyledSmall,
  ManufacturerTitle,
  StyleCard,
  StyleCardFinishPurchase,
  StyleH2,
  StyleH2White,
  StyleMain,
  TitleCard,
} from './styles'

const Checkout: React.FC = () => {
  const { vehicle, isLoading, fetchVehicle } = useVehicles()
  const { address, isLoadingCep, errorCep, fetchAddress } = useAdress()
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormType>()
  const [paymentType, setPaymentType] = useState('creditCard')
  const { id } = useParams()
  const setTitle = useTitle()
  const cepValue = watch('cep')
  const [lastCep, setLastCep] = useState('')
  const navigate = useNavigate()

  const handleFormSubmit = useCallback(
    (data: FormType) => {
      normalizeFormData(data)
      navigate(
        paymentType === 'creditCard'
          ? `/creditcardpayment/${id}`
          : `/ticketpayment/${id}`,
      )
    },
    [id, navigate, paymentType],
  )

  useEffect(() => setTitle('Checkout'))

  useEffect(() => {
    if (id) fetchVehicle(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputFocus = useCallback(() => {
    if (
      address &&
      address.logradouro &&
      address.logradouro.length > 0 &&
      address.bairro &&
      address.bairro.length > 0
    ) {
      setFocus('numero')
    }
  }, [setFocus, address])

  useEffect(() => {
    const sanitizedCEP = cepValue?.replaceAll(/\D/g, '')

    if (sanitizedCEP?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue)
      fetchAddress(sanitizedCEP)
    }
    if (sanitizedCEP?.length === 8) {
      handleInputFocus()
    }
  }, [cepValue, fetchAddress, setFocus, lastCep, handleInputFocus])

  setValue('logradouro', address?.logradouro ?? '')
  setValue('bairro', address?.bairro ?? '')
  setValue('estado', address?.uf ?? '')
  setValue('cidade', address?.localidade ?? '')

  return (
    <>
      <Header />
      <StyleMain>
        <img src={Banner} style={{ width: '100% ' }} alt="banner" />
        <Container>
          <StyleH2White className="pt-3">
            <Link to="/">
              <AiOutlineArrowLeft color="white" />
            </Link>
            Checkout
          </StyleH2White>
          <LoadingComponent />
          {!isLoading && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Row className="py-3">
                <Col xs={12} md={6} lg={4} className="pt-3">
                  <StyleCard>
                    <StyleH2>Informações Pessoais </StyleH2>
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
                    <label htmlFor="email">E-mail:</label>
                    <InputStyled
                      type="email"
                      id="email"
                      {...register('email', { required: 'Informe seu e-mail' })}
                      className="mb-2"
                      required
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <label htmlFor="phone">Telefone:</label>
                    <div className="mb-2">
                      <InputMaskStyled
                        id="phone"
                        mask="(99)99999-9999"
                        {...register('phone', {
                          required: 'Informe seu Telefone',
                        })}
                        className="mb-2"
                        required
                      />
                      {errors.phone && <p>{errors.phone.message}</p>}
                    </div>
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
                </Col>
                <Col xs={12} md={6} lg={4} className="pt-3">
                  <StyleCard>
                    <StyleH2>Endereços </StyleH2>
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
                    {isLoadingCep && (
                      <>
                        <label htmlFor="logradouro">Logradouro:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <div
                              className="spinner-border text-warning"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </InputLoadingDiv>
                        </div>
                        <div className="d-flex">
                          <div>
                            <label htmlFor="número" className="d-block">
                              Número:
                            </label>
                            <div className="mb-2">
                              <InputLoadingDivSmall>
                                <div
                                  className="spinner-border text-warning"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </InputLoadingDivSmall>
                            </div>
                          </div>
                          <div className="px-3">
                            <label htmlFor="complemento" className="d-block">
                              Complemento:
                            </label>
                            <div className="mb-2">
                              <InputLoadingDivSmall>
                                <div
                                  className="spinner-border text-warning"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </InputLoadingDivSmall>
                            </div>
                          </div>
                        </div>
                        <label htmlFor="Bairro">Bairro:</label>
                        <div className="mb-2">
                          <InputLoadingDiv />
                        </div>
                        <label htmlFor="cidade">Cidade:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <div
                              className="spinner-border text-warning"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </InputLoadingDiv>
                        </div>
                        <label htmlFor="estado">Estado:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <div
                              className="spinner-border text-warning"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </InputLoadingDiv>
                        </div>
                      </>
                    )}
                    {!isLoadingCep && errorCep && (
                      <>
                        <label htmlFor="logradouro">Logradouro:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <p>erro</p>
                          </InputLoadingDiv>
                        </div>
                        <div className="d-flex">
                          <div>
                            <label htmlFor="número" className="d-block">
                              Número:
                            </label>
                            <div className="mb-2">
                              <InputLoadingDivSmall>
                                <p>erro</p>
                              </InputLoadingDivSmall>
                            </div>
                          </div>
                          <div className="px-3">
                            <label htmlFor="complemento" className="d-block">
                              Complemento:
                            </label>
                            <div className="mb-2">
                              <InputLoadingDivSmall>
                                <p>erro</p>
                              </InputLoadingDivSmall>
                            </div>
                          </div>
                        </div>
                        <label htmlFor="Bairro">Bairro:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <p>erro</p>
                          </InputLoadingDiv>
                        </div>
                        <label htmlFor="cidade">Cidade:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <p>erro</p>
                          </InputLoadingDiv>
                        </div>
                        <label htmlFor="estado">Estado:</label>
                        <div className="mb-2">
                          <InputLoadingDiv>
                            <p>erro</p>
                          </InputLoadingDiv>
                        </div>
                      </>
                    )}
                    {!isLoadingCep && !errorCep && (
                      <>
                        <label htmlFor="logradouro">Logradouro:</label>
                        <div className="mb-2">
                          <InputStyled
                            type="text"
                            id="logradouro"
                            {...register('logradouro', {
                              required: 'Informe seu logradouro',
                            })}
                            required
                          />
                          {errors.logradouro && (
                            <p>{errors.logradouro.message}</p>
                          )}
                        </div>
                        <div className="d-flex">
                          <div>
                            <label
                              id="numero"
                              htmlFor="numero"
                              className="d-block"
                            >
                              Número:
                            </label>
                            <div className="mb-2">
                              <InputStyledSmall
                                type="text"
                                id="numero"
                                {...register('numero', {
                                  required: 'Informe seu número',
                                })}
                                required
                              />
                              {errors.numero && <p>{errors.numero.message}</p>}
                            </div>
                          </div>
                          <div className="px-3">
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
                        <label htmlFor="Bairro">Bairro:</label>
                        <div className="mb-2">
                          <InputStyled
                            type="text"
                            id="bairro"
                            {...register('bairro', {
                              required: 'Informe seu Bairro',
                            })}
                            required
                          />
                          {errors.bairro && <p>{errors.bairro.message}</p>}
                        </div>
                        <label htmlFor="cidade">Cidade:</label>
                        <div className="mb-2">
                          <InputStyled
                            type="text"
                            id="cidade"
                            {...register('cidade', {
                              required: 'Informe sua cidade',
                            })}
                            required
                          />
                          {errors.cidade && <p>{errors.cidade.message}</p>}
                        </div>
                        <label htmlFor="estado">Estado:</label>
                        <div className="mb-2">
                          <InputStyled
                            type="text"
                            id="estado"
                            {...register('estado', {
                              required: 'Informe seu estado',
                            })}
                            required
                          />
                          {errors.estado && <p>{errors.estado.message}</p>}
                        </div>
                      </>
                    )}
                  </StyleCard>
                </Col>
                <Col xs={12} lg={4} className="pt-3">
                  <DivFlexColumn>
                    <StyleCard>
                      <StyleH2>Formas de Pagamento </StyleH2>
                      <DivFlex>
                        <ButtonCreditCardStyled
                          type="button"
                          className="px-2 ms-0"
                          onClick={() => setPaymentType('creditCard')}
                          paymentType={paymentType}
                        >
                          Cartão de crédito
                        </ButtonCreditCardStyled>
                        <ButtonTicketStyled
                          type="button"
                          className="px-2"
                          onClick={() => setPaymentType('ticket')}
                          paymentType={paymentType}
                        >
                          Boleto Bancário
                        </ButtonTicketStyled>
                      </DivFlex>
                      {paymentType === 'creditCard' && (
                        <>
                          <label htmlFor="nomecartão">
                            Nome do titular do cartão:
                          </label>
                          <div className="mb-2">
                            <InputStyled
                              id="nomecartão"
                              type="text"
                              {...register('namecard', {
                                required: 'Informe seu nome',
                              })}
                              required
                            />
                            {errors.namecard && (
                              <p>{errors.namecard.message}</p>
                            )}
                          </div>
                          <label htmlFor="cardnumber">Número do cartão:</label>
                          <div className="mb-2">
                            <InputMaskStyled
                              mask="9999 9999 9999 9999"
                              type="cardnumber"
                              id="cardnumber"
                              {...register('cardnumber', {
                                required: 'Informe o número de seu cartão',
                              })}
                              className="mb-2"
                              required
                            />
                            {errors.cardnumber && (
                              <p>{errors.cardnumber.message}</p>
                            )}
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
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
                            <div className="ms-2">
                              <label htmlFor="safety">
                                Código de segurança:
                              </label>
                              <div className="mb-2">
                                <InputMaskStyled
                                  id="safety"
                                  {...register('safety', {
                                    required: 'Informe seu CPF',
                                  })}
                                  mask="999"
                                  className="mb-2"
                                  required
                                />
                                {errors.safety && (
                                  <p>{errors.safety.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </StyleCard>
                    {vehicle && (
                      <StyleCardFinishPurchase>
                        <ManufacturerTitle>
                          {vehicle.manufacturer}
                        </ManufacturerTitle>
                        <TitleCard className="pb-3">{vehicle.model}</TitleCard>
                        {vehicle.cost_in_credits !== 'unknown' && (
                          <TitleCard className="pt-3">
                            ¢ {vehicle.cost_in_credits}
                          </TitleCard>
                        )}
                        {vehicle.cost_in_credits === 'unknown' && (
                          <TitleCard className="pt-3">¢ 150000</TitleCard>
                        )}
                        <div className="d-flex justify-content-center">
                          {paymentType === 'ticket' && (
                            <ButtonStyle type="submit">
                              Finalizar compra
                            </ButtonStyle>
                          )}
                          {paymentType === 'creditCard' && (
                            <ButtonStyle type="submit">
                              Finalizar compra
                            </ButtonStyle>
                          )}
                        </div>
                      </StyleCardFinishPurchase>
                    )}
                  </DivFlexColumn>
                </Col>
              </Row>
            </form>
          )}
        </Container>
      </StyleMain>
      <Footer />
    </>
  )
}

export default memo(Checkout)
