import { memo, useCallback, useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'

import Banner from 'assets/Banner.png'
import Loading from 'assets/loading.gif'

import { useVehicles } from 'context/VehiclesContext'

import Footer from 'components/Footer'
import Header from 'components/Header'

import { normalizeFormData, urlToId } from 'helpers'

import useTitle from 'hooks/useTitle'

import CepApi from 'services/CepApi'

import { FormType } from 'types/FormType'

import {
  ButtonStyle,
  InputMaskStyled,
  InputMaskStyledSmall,
  InputStyled,
  InputStyledSmall,
  LinkStyled,
  ManufacturerTitle,
  StyleCard,
  StyleH2,
  StyleH2White,
  StyleMain,
  TitleCard,
} from './styles'

const Checkout: React.FC = () => {
  const { vehicle, isLoading, fetchVehicle } = useVehicles()
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>()
  const [creditCardOn, setCreditCardOn] = useState(true)
  const [ticketOn, setticketOn] = useState(false)
  const [creditButtonColor, setCreditButtonColor] = useState('#f4e426')
  const [ticketButtonColor, setTicketButtonColor] = useState('white')
  const { id } = useParams()
  const setTitle = useTitle()
  const cepValue = watch('cep')
  const [lastCep, setLastCep] = useState('')
  const fetchAddress = useCallback(
    async (cep: string) => {
      const { data } = await CepApi.get(`/${cep}/json/`)
      setValue('logradouro', data.logradouro)
      setValue('bairro', data.bairro)
      setValue('estado', data.uf)
      setValue('cidade', data.localidade)
    },
    [setValue],
  )
  const handleFormSubmit = useCallback((data: FormType) => {
    normalizeFormData(data)
  }, [])

  const choosePaymentTicket = useCallback(() => {
    setCreditButtonColor('white')
    setTicketButtonColor('#f4e426')
    setticketOn(true)
    setCreditCardOn(false)
  }, [setCreditCardOn, setticketOn, setCreditButtonColor])

  const choosePaymentCreditCard = useCallback(() => {
    setCreditButtonColor('#f4e426')
    setTicketButtonColor('white')
    setticketOn(false)
    setCreditCardOn(true)
  }, [setCreditCardOn, setticketOn])

  useEffect(() => setTitle('Checkout'))

  useEffect(() => {
    if (id) fetchVehicle(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const sanitizedCEP = cepValue?.replaceAll(/\D/g, '')
    if (sanitizedCEP?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue)
      fetchAddress(sanitizedCEP)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue])

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
          {isLoading && (
            <div className="d-flex justify-content-center">
              <img
                src={Loading}
                alt="Loading"
                width="auto"
                className="img-fluid"
              />
            </div>
          )}
          {!isLoading && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Row xs={1} md={3} className="py-3">
                <Col className="pt-3">
                  <StyleCard className="p-3">
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
                <Col className="pt-3">
                  <StyleCard className="p-3">
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
                      {errors.logradouro && <p>{errors.logradouro.message}</p>}
                    </div>
                    <div className="d-flex">
                      <div>
                        <label htmlFor="número" className="d-block">
                          Número:
                        </label>
                        <div className="mb-2">
                          <InputStyledSmall
                            type="text"
                            id="número"
                            {...register('número', {
                              required: 'Informe seu número',
                            })}
                            required
                          />
                          {errors.número && <p>{errors.número.message}</p>}
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
                  </StyleCard>
                </Col>
                <Col className="pt-3">
                  <StyleCard className="p-3">
                    <StyleH2>Formas de Pagamento </StyleH2>
                    <ButtonStyle
                      type="button"
                      className="px-2 ms-0"
                      style={{ backgroundColor: `${creditButtonColor}` }}
                      onClick={choosePaymentCreditCard}
                    >
                      Cartão de crédito
                    </ButtonStyle>
                    <ButtonStyle
                      type="button"
                      className="px-2"
                      style={{ backgroundColor: `${ticketButtonColor}` }}
                      onClick={choosePaymentTicket}
                    >
                      Boleto Bancário
                    </ButtonStyle>
                    {creditCardOn && !ticketOn && (
                      <>
                        <label htmlFor="nomecartão">
                          Nome do titular do cartão:
                        </label>
                        <div className="mb-2">
                          <InputStyled
                            type="text"
                            id="nomecartão"
                            {...register('namecard', {
                              required: 'Informe seu nome',
                            })}
                            required
                          />
                          {errors.namecard && <p>{errors.namecard.message}</p>}
                        </div>
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
                          {errors.cardnumber && (
                            <p>{errors.cardnumber.message}</p>
                          )}
                        </div>
                        <div className="d-flex">
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
                          <div className="px-2">
                            <label htmlFor="safety">Código de segurança:</label>
                            <div className="mb-2">
                              <InputStyledSmall
                                id="safety"
                                {...register('safety', {
                                  required: 'Informe seu CPF',
                                })}
                                className="mb-2"
                                required
                              />
                              {errors.safety && <p>{errors.safety.message}</p>}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </StyleCard>
                  <div className="pt-3">
                    <StyleCard className="p-3 ">
                      {vehicle && (
                        <>
                          <ManufacturerTitle>
                            {vehicle.manufacturer}
                          </ManufacturerTitle>
                          <TitleCard className="pb-3">
                            {vehicle.model}
                          </TitleCard>
                          {vehicle.cost_in_credits !== 'unknown' && (
                            <TitleCard className="pt-3">
                              ¢ {vehicle.cost_in_credits}
                            </TitleCard>
                          )}
                          {vehicle.cost_in_credits === 'unknown' && (
                            <TitleCard className="pt-3">¢ 150000</TitleCard>
                          )}
                          <div className="d-flex justify-content-center">
                            <ButtonStyle type="submit">
                              {ticketOn && (
                                <LinkStyled
                                  to={`/ticketpayment/${urlToId(vehicle.url)}`}
                                >
                                  Finalizar compra
                                </LinkStyled>
                              )}
                              {creditCardOn && (
                                <LinkStyled
                                  to={`/creditcardpayment/${urlToId(
                                    vehicle.url,
                                  )}`}
                                >
                                  Finalizar compra
                                </LinkStyled>
                              )}
                            </ButtonStyle>
                          </div>
                        </>
                      )}
                    </StyleCard>
                  </div>
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
