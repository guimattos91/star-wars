export type FormType = {
  name: string
  email: string
  cpf: string
  phone: string
  cep: string
  número: string
  logradouro: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  namecard: string
  cardnumber: string
  valid: string
  safety: string
}
export type NormalizedFormType = {
  name: string
  email: string
  cpf: number
  phone: number
  cep: number
  número: number
  logradouro: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  namecard: string
  cardnumber: number | undefined
  valid: number | undefined
  safety: number | undefined
}
