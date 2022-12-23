import { memo } from 'react'

import Loading from 'assets/loading.gif'

import { useVehicles } from 'context/VehiclesContext'

export type FormType = {
  namecard: string
  cardnumber: string
  valid: string
  safety: string
}

const LoadingComponent: React.FC = () => {
  const { isLoading } = useVehicles()

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <img src={Loading} alt="Loading" width="auto" className="img-fluid" />
        </div>
      )}
    </>
  )
}

export default memo(LoadingComponent)
