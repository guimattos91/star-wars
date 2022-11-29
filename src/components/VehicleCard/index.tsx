import { memo } from 'react'

import { VehicleType } from 'types/VehicleType'

import {
  CardBody,
  LinkStyled,
  ListStyle,
  ManufacturerTitle,
  PriceCard,
  TitleCard,
} from './styles'

interface IVehiclesProps {
  vehicle: VehicleType
}

const VehicleCard: React.FC<IVehiclesProps> = ({ vehicle }) => (
  <CardBody className="p-4 w-100">
    <ManufacturerTitle className="pt-3">
      {vehicle.manufacturer}
    </ManufacturerTitle>
    {vehicle.cost_in_credits !== 'unknown' && (
      <LinkStyled to={`/checkout/${vehicle.id}`}>
        <TitleCard className="pb-2 fs-3 d-flex ">{vehicle.model}</TitleCard>
      </LinkStyled>
    )}
    {vehicle.cost_in_credits === 'unknown' && (
      <TitleCard className="pb-2 fs-3 d-flex ">{vehicle.model}</TitleCard>
    )}
    <ListStyle>
      <li className="d-flex justify-content-between">
        <p>Largura</p>
        <p>{vehicle.length}</p>
      </li>
      <li className="d-flex justify-content-between">
        <p>Velocidade</p>
        <p>{vehicle.max_atmosphering_speed}</p>
      </li>
      <li className="d-flex justify-content-between">
        <p>Equipe</p>
        <p>{vehicle.crew}</p>
      </li>
      <li className="d-flex justify-content-between">
        <p>Passageiros</p>
        <p>{vehicle.passengers}</p>
      </li>
      <li className="d-flex justify-content-between">
        <p>Capacidade de Carga</p>
        <p>{vehicle.cargo_capacity}</p>
      </li>
    </ListStyle>
    {vehicle.cost_in_credits !== 'unknown' && (
      <PriceCard className="pt-3">¢ {vehicle.cost_in_credits}</PriceCard>
    )}
    {vehicle.cost_in_credits === 'unknown' && (
      <PriceCard className="pt-3">Fora de Estoque</PriceCard>
    )}
  </CardBody>
)

export default memo(VehicleCard)
