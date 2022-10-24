import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { normalizeVehicleData } from 'helpers'

import Api from 'services/Api'

import { VehicleType } from 'types/VehicleType'

interface IContextProps {
  vehicles: VehicleType[]
  vehicle: VehicleType | undefined
  error: string | null
  isLoading: boolean
  totalPages: number
  currentPage: number
  fetchVehicles: (page: number, search?: string) => Promise<void>
  fetchVehicle: (id: number | string) => Promise<void>
}

interface IvehiclesProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const VehiclesProvider: React.FC<IvehiclesProviderProps> = ({
  children,
}) => {
  const [vehicles, setvehicles] = useState<VehicleType[]>([])
  const [vehicle, setvehicle] = useState<VehicleType>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchVehicles = useCallback(async (page: number, search?: string) => {
    setCurrentPage(page)
    setIsLoading(true)
    setError(null)

    const params = {
      page,
      search: search?.length ? search : undefined,
    }

    try {
      const {
        data: { results, count },
      } = await Api.get('/', { params })
      setvehicles(normalizeVehicleData(results))
      setTotalPages(count / 10)
    } catch {
      setError('Erro: Veículo não encontrado')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchVehicle = useCallback(async (id: number | string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await Api.get(`/${id}`)
      setvehicle(response.data)
    } catch {
      setError('Erro: Veículo não encontrado')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          vehicles,
          vehicle,
          isLoading,
          totalPages,
          currentPage,
          error,
          fetchVehicles,
          fetchVehicle,
        }),
        [
          vehicles,
          vehicle,
          isLoading,
          totalPages,
          currentPage,
          error,
          fetchVehicles,
          fetchVehicle,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useVehicles = (): IContextProps => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('usevehicles must be within CharatersProvider')
  }

  return context
}
