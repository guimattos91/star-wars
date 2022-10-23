import axios from 'axios'

import Config from 'Config'

const CepApi = axios.create({
  baseURL: Config.cepApi.baseUrl,
})

export default CepApi
