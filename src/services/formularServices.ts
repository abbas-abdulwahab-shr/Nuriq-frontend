import { apiGetClient, apiPostClient } from './apiClients'

export const createFormularFromInsights = (data: any) => {
  return apiPostClient('/formulas/generate-from-concept', data)
}

export const getFormularUsingId = (formula_id: string) => {
  return apiGetClient(`/formulas/${formula_id}`)
}

export const exportFormularExcel = (formula_id: string) => {
  return apiGetClient(`/formulas/${formula_id}/export/excel`)
}

export const exportFormularPDF = (formula_id: string) => {
  return apiGetClient(`/formulas/${formula_id}/export/pdf`)
}

// marketting formular services section

export const generatetMarkettingCopyUsingId = (formula_id: string) => {
  return apiPostClient(`/formulas/${formula_id}/marketing-copy`, {})
}

export const regenerateMarkettingCopyUsingId = (formula_id: string) => {
  return apiPostClient(`/formulas/${formula_id}/regenerate-mockup`, {})
}
