import { memo, useCallback, useEffect } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Banner from 'assets/Banner.png';

import AdressCard from 'components/AdressCard';
import FinishCheckoutCard from 'components/FinishCheckoutCard';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PaymentsCard from 'components/PaymentsCard';
import PersonalInformationCard from 'components/PersonalInformationCard';

import useTitle from 'hooks/useTitle';

import { StyleH2, StyleMain } from './styles';

export type FormType = {
  name: string;
};

const Checkout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { handleSubmit } = useForm();

  const setTitle = useTitle();
  useEffect(() => setTitle('Checkout | Star Wars'));

  useEffect(() => {
    setTitle(t('Checkout | Star Wars'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  const handleFormSubmit = useCallback((data: FormType) => {
    console.log(data);
  }, []);

  return (
    <>
      <Header />
      <StyleMain>
        <img src={Banner} style={{ width: '100% ' }} alt="banner" />
        <Container>
          <StyleH2 className="pt-3">
            <Link to="/">
              <AiOutlineArrowLeft color="white" />
            </Link>
            Checkout
          </StyleH2>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="row-cols-1 row-cols-md-3 py-3">
              <Col className="pt-3">
                <PersonalInformationCard />
              </Col>
              <Col className="pt-3">
                <AdressCard />
              </Col>
              <Col className="pt-3">
                <PaymentsCard />
                <div className="pt-3">
                  <FinishCheckoutCard />
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </StyleMain>
      <Footer />
    </>
  );
};

export default memo(Checkout);
