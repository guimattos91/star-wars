import { memo } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from 'assets/space-motors-logo.png';

import { StyleHeader } from './styles';

const Header: React.FC = () => {
  return (
    <StyleHeader>
      <Container>
        <Row className="py-3">
          <Col>
            <Link to="/">
              <h1>
                <img src={Logo} alt="logo" width="auto" className="img-fluid" />
              </h1>
            </Link>
          </Col>
        </Row>
      </Container>
    </StyleHeader>
  );
};

export default memo(Header);
