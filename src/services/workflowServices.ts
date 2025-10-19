import { apiGetClient } from './apiClients'

export const getCommercialWorkflowData = (formula_id: string) => {
  return apiGetClient(`/commercial-workflow/formulas/${formula_id}/analyze`)
}
