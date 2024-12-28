import {
  OrganizationContextType,
  useOrganizationContext,
} from './organization.context'
import { OrganizationSelect } from './OrganizationSelect'

export namespace OrganizationClient {
  export type Context = OrganizationContextType

  export const useContext = useOrganizationContext

  export const Select = OrganizationSelect
}
