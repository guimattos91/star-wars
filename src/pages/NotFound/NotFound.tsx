import { memo, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import Banner from 'assets/Banner.png'

import Footer from 'components/Footer'
import Header from 'components/Header'

import useTitle from 'hooks/useTitle'

import { StyleMain } from './styles'

const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation()
  const setTitle = useTitle()

  useEffect(() => {
    setTitle(t('not-found.title'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage])

  return (
    <>
      <Header />
      <StyleMain>
        <img src={Banner} style={{ width: '100% ' }} alt="banner" />
        <h1>{t('not-found.title')}</h1>
      </StyleMain>
      <Footer />
    </>
  )
}

export default memo(NotFound)
