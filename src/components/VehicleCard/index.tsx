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
    <LinkStyled to="/checkout">
      <TitleCard className="pb-2 fs-3">{vehicle.model}</TitleCard>
    </LinkStyled>
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
    <PriceCard className="pt-3">¢ {vehicle.cost_in_credits}</PriceCard>
  </CardBody>
)

export default memo(VehicleCard)
