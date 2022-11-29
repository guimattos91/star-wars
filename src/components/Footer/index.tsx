import { memo } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logo from 'assets/space-motors-logo.png'

import { PGray, PWhite, StyleFooter } from './styles'

const Footer: React.FC = () => {
  return (
    <StyleFooter>
      <Container>
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Link to="/">
              <img
                className="d-flex justify-content-center pt-5 pb-3 img-fluid"
                src={Logo}
                alt="logo"
                width="auto"
              />
            </Link>

            <div className="d-flex pb-3">
              <PGray className="me-2"> Site por: </PGray>
              <PWhite
                href="https://www.linkedin.com/in/guimattos91/"
                target="_blank"
                rel="noreferrer"
              >
                Guilherme Mattos da Silva
              </PWhite>
            </div>
          </Col>
        </Row>
      </Container>
    </StyleFooter>
  )
}

export default memo(Footer)
