import { FormType, NormalizedFormType } from 'types/FormType'
import { VehicleType } from 'types/VehicleType'

export const normalizeFormData = (data: FormType): NormalizedFormType => ({
  ...data,
  cpf: Number(data.cpf),
  phone: Number(data.phone),
  cep: Number(data.cep),
  número: Number(data.número),
  cardnumber: data.cardnumber.length ? Number(data.cardnumber) : undefined,
  valid: data.valid.length ? Number(data.valid) : undefined,
  safety: data.safety.length ? Number(data.safety) : undefined,
})

export const urlToId = (url: string): string => url.split('/')[5]

export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }))
