import { memo, useCallback, useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import Banner from 'assets/Banner.png'
import Loading from 'assets/loading.gif'

import { useVehicles } from 'context/VehiclesContext'

import Footer from 'components/Footer'
import Header from 'components/Header'
import VehicleCard from 'components/VehicleCard'

import useTitle from 'hooks/useTitle'

import {
  ButtonStyle,
  InputStyle,
  StyleMain,
  Pagination,
  DivSearch,
} from './styles'

const Home: React.FC = () => {
  const { vehicles, isLoading, currentPage, totalPages, error, fetchVehicles } =
    useVehicles()
  const [search, setSearch] = useState('')
  const [hasSearch, setHasSearch] = useState(false)

  const handlePageChange = useCallback(
    (page: number) => fetchVehicles(page),
    [fetchVehicles],
  )

  const handleSearch = useCallback(() => {
    fetchVehicles(1, search)
    setHasSearch(true)
  }, [fetchVehicles, search, setHasSearch])

  const clearSearch = useCallback(() => {
    setSearch('')
    fetchVehicles(1)
    setHasSearch(false)
  }, [fetchVehicles, setHasSearch])

  const setTitle = useTitle()
  useEffect(() => setTitle('Home'))

  useEffect(() => {
    fetchVehicles(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <StyleMain>
        <img src={Banner} style={{ width: '100% ' }} alt="banner" />
        {/* <BgImg className="img-fluid" /> */}
        <Container>
          <Row className="py-4 d-flex justify-content-center">
            <Col>
              <DivSearch className="d-flex justify-content-center">
                <InputStyle
                  className="p-3"
                  type="text"
                  placeholder="Digite o nome ou modelo do veículo"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search.length > 0 && (
                  <ButtonStyle
                    type="button"
                    onClick={handleSearch}
                    className="p-3 mt-3 mt-md-0"
                  >
                    <p className="px-5">Buscar</p>
                  </ButtonStyle>
                )}
                {hasSearch === true && (
                  <ButtonStyle
                    type="button"
                    onClick={clearSearch}
                    className="ms-2 p-3 mt-3 mt-md-0"
                  >
                    <p className="px-5">Limpar</p>
                  </ButtonStyle>
                )}
              </DivSearch>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 pb-4">
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
            {!isLoading &&
              !error &&
              vehicles.map(
                (vehicle: {
                  name: string
                  model: string
                  manufacturer: string
                  cost_in_credits: string
                  length: string
                  max_atmosphering_speed: string
                  crew: string
                  passengers: string
                  cargo_capacity: string
                  consumables: string
                  vehicle_class: string
                  url: string
                  id: string
                }) => (
                  <Col
                    key={vehicle.id}
                    className="d-flex justify-content-center"
                  >
                    <VehicleCard vehicle={vehicle} />
                  </Col>
                ),
              )}
            {!isLoading && !error && vehicles.length === 0 && (
              <h2 style={{ color: 'white' }} className="text-center">
                Nenhum resultado encontrado
              </h2>
            )}
          </Row>
          {totalPages > 1 && (
            <Row>
              <Col className="d-flex justify-content-center">
                <Pagination
                  nextLabel="Next"
                  nextClassName={
                    currentPage === Math.ceil(totalPages) ? 'd-none' : undefined
                  }
                  forcePage={currentPage - 1}
                  onPageChange={(p) => handlePageChange(p.selected + 1)}
                  pageCount={totalPages}
                  previousLabel="Previous"
                  previousClassName={currentPage === 1 ? 'd-none' : undefined}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                />
              </Col>
            </Row>
          )}
        </Container>
      </StyleMain>
      <Footer />
    </>
  )
}

export default memo(Home)
