import { memo, useEffect } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'

import Banner from 'assets/Banner.png'

import { useVehicles } from 'context/VehiclesContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingComponent from 'components/LoadingComponent'

import { urlToId } from 'helpers'

import useTitle from 'hooks/useTitle'

import { StyleH2White } from 'pages/Checkout/styles'

import {
  StyleMain,
  DivCard,
  ManufacturerTitle,
  TitleCard,
  TextStyle,
  TextStyleWhite,
} from './styles'

const CreditCardPayment: React.FC = () => {
  const { vehicle, isLoading, error, fetchVehicle } = useVehicles()
  const { id } = useParams()
  const setTitle = useTitle()

  useEffect(() => setTitle('Confimação de Compra'))

  useEffect(() => {
    if (id) fetchVehicle(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Header />
      <StyleMain>
        <img src={Banner} style={{ width: '100% ' }} alt="banner" />
        {/* <BgImg className="img-fluid" /> */}
        <Container>
          {vehicle && (
            <StyleH2White className="pt-3">
              <Link to={`/checkout/${urlToId(vehicle.url)}`}>
                <AiOutlineArrowLeft color="white" />
              </Link>
              Confirmação
            </StyleH2White>
          )}
          <LoadingComponent />
          {!isLoading && (
            <Row className="py-4 d-flex justify-content-center">
              <Col className="d-flex justify-content-center">
                <>
                  {!error && vehicle && (
                    <DivCard className="card">
                      <div className="ps-3">
                        <ManufacturerTitle className="pt-3">
                          {vehicle.manufacturer}
                        </ManufacturerTitle>
                        <TitleCard className="pb-2 fs-3 d-flex ">
                          {vehicle.model}
                        </TitleCard>
                      </div>
                      <TextStyle className="pt-3">
                        Compra realizada com sucesso!
                      </TextStyle>
                      <TextStyleWhite className="mb-4 px-2">
                        Confirmamos o seu pedido. Em breve você receberá um
                        e-mail com o status do processo de entrega
                      </TextStyleWhite>
                    </DivCard>
                  )}
                  {!isLoading && !error && !vehicle && (
                    <h2 style={{ color: 'white' }} className="text-center">
                      Nenhum resultado encontrado
                    </h2>
                  )}
                </>
              </Col>
            </Row>
          )}
        </Container>
      </StyleMain>
      <Footer />
    </>
  )
}

export default memo(CreditCardPayment)
