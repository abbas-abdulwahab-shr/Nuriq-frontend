import { apiGetClient, apiPutClient } from './apiClients'

export const getCommercialWorkflowData = (formula_id: string) => {
  return apiGetClient(`/commercial-workflow/formulas/${formula_id}/analyze`)
}
export const getWorkflowTimeline = (formula_id: string) => {
  return apiGetClient(`/commercial-workflow/formulas/${formula_id}/timeline`)
}
export const getWorkflowUpdateTimeline = (formula_id: string, data: any) => {
  return apiPutClient(
    `/commercial-workflow/formulas/${formula_id}/timeline`,
    data,
  )
}
