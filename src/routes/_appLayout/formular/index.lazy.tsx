import { useState } from 'react'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { Spinner } from '@chakra-ui/react'

import { ChevronDown } from 'lucide-react'
import FormulaTable from '@/components/formular/FormulaTable'
import aiStarIcon from '/chatIcons/AI-stars.png'
import AddIngredient from '/add-ingredient.png'
import { Loader } from '@/components/Loader'
import { useToastFunc } from '@/Hooks/useToastFunc'

import {
  exportFormularExcel,
  exportFormularPDF,
  generatetMarkettingCopyUsingId,
  getFormularUsingId,
} from '@/services/formularServices'
import { appStore, updateMarkettingInfo } from '@/appStore'

export const Route = createLazyFileRoute('/_appLayout/formular/')({
  component: FormularModulePage,
})

function FormularModulePage() {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastFunc()
  const router = useRouter()
  const lastCreatedFormularId = useStore(
    appStore,
    (state) => state.lastCreatedFormularId,
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['formular', lastCreatedFormularId],
    queryFn: async () => {
      const response: any = await getFormularUsingId(lastCreatedFormularId!)
      return response.data
    },
  })

  const formattedIngredients = data?.ingredients.map(
    (item: any, index: number) => {
      return {
        id: index + 1,
        name: item.ingredient.name,
        weight: item.ingredient.weight,
        unit: item.ingredient.unit,
        supplier: item.supplier.full_name,
        price: item.supplier.price_per_unit,
        allergies: item.ingredient.allergies,
        regulatory: item.ingredient.regulatory_notes,
        functionDesc: item.ingredient.function,
        notes: item.ingredient.claims,
        costUnit: (item.quantity / item.supplier.price_per_unit).toFixed(2),
      }
    },
  )

  // const handleCalculationSummary = () => {
  //   router.navigate({ to: '/formular/summary' })
  // }

  const handleCalculationSummary = async () => {
    if (!data || isLoading) return
    setLoading(true)

    try {
      const response: any = await generatetMarkettingCopyUsingId(
        lastCreatedFormularId!,
      )
      if (response && response.data.id) {
        // we need to save the generated markeeting information
        updateMarkettingInfo(response.data)
        showToast('Success', response.message, 'success')
        router.navigate({ to: '/formular/summary' })
      }
    } catch (reqError: any) {
      showToast(
        'Error',
        reqError.response.data.detail || 'Failed to create formular',
        'error',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Formula module</h1>
        {data && (
          <div className="flex items-center gap-3">
            <button
              className="bg-[#F4DD5F] px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2"
              onClick={handleCalculationSummary}
            >
              <span>Run calculation</span>
              <img
                src={aiStarIcon}
                alt="ai-stats"
                className="w-[18.33px] h-[18.33px]"
              />
              {loading && (
                <Spinner
                  size="sm"
                  thickness="4px"
                  speed="0.65s"
                  className="ml-3 inline-block align-middle"
                />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      {data && (
        <div className="border border-gray-300 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-4 py-2"
              style={{ width: '40%' }}
            />

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-full font-medium border border-black flex items-center gap-2">
                <span>Add ingredient</span>
                <img
                  src={AddIngredient}
                  alt="add-ingredient"
                  className="w-[18.33px] h-[18.33px]"
                />
              </button>
              <ExportDropdown formularId={lastCreatedFormularId} />
            </div>
          </div>

          {/* Product concept */}
          <div className="flex flex-col gap-3 mb-4">
            <p className="font-semibold">Product concept:</p>
            <div className="flex items-center gap-3">
              <span className="text-[18px]">{data.name}</span>
              <button className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2">
                <span>Change idea</span>
                <img
                  src={aiStarIcon}
                  alt="ai-stats"
                  className="w-[18.33px] h-[18.33px]"
                />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="text-sm space-x-4 mb-6">
            <span>
              Total ingredients:{'  '}
              <span className="font-semibold">{data.ingredients.length}</span>
            </span>
            <span>
              Total quantity:{' '}
              <span className="font-semibold">{data.total_quantity}g</span>
            </span>
            <span>
              Total cost:{' '}
              <span className="font-semibold">
                ${data.total_cost.toFixed(0)}
              </span>
            </span>
            <span>
              Cost/unit:{' '}
              <span className="font-semibold">
                ${data.cost_per_unit.toFixed(2)}
              </span>
            </span>
          </div>

          {/* Table Component */}
          <FormulaTable data={formattedIngredients} />
        </div>
      )}

      {isLoading && <Loader text="Loading formular..." />}
      {error && <div>Error loading formular.</div>}
    </div>
  )
}

function ExportDropdown({ formularId }: { formularId: any }) {
  const [open, setOpen] = useState(false)
  const [loadingExportExcel, setLoadingExportExcel] = useState(false)
  const [loadingExportPDF, setLoadingExportPDF] = useState(false)

  const { showToast } = useToastFunc()

  const handleFormularInPDFExport = async () => {
    // Implement the logic to export formular data as PDF
    setLoadingExportPDF(true)
    try {
      const response: any = await exportFormularPDF(formularId)
      if (response && response.data) {
        console.log('PDF export response', response)

        showToast('Export', 'Formular exported successfully!', 'success')
        // Assuming the response contains a URL to download the PDF
        const pdfUrl = response.data.url
        window.open(pdfUrl, '_blank')
        setOpen(false)
      }
    } catch (error) {
      showToast('Export', 'Error exporting formular data as PDF', 'error')
      console.error('Error exporting formular data as PDF:', error)
    } finally {
      setLoadingExportPDF(false)
      setOpen(false)
    }
  }

  const handleFormularInExcelExport = async () => {
    setLoadingExportExcel(true)
    try {
      const response: any = await exportFormularExcel(formularId)
      if (response && response.data) {
        showToast('Export', 'Formular exported successfully!', 'success')
        // Assuming the response contains a URL to download the Excel file
        const excelUrl = response.data.url
        window.open(excelUrl, '_blank')
        setOpen(false)
      }
    } catch (error) {
      showToast('Export', 'Error exporting formular data as Excel', 'error')
      console.error('Error exporting formular data as Excel:', error)
    } finally {
      setLoadingExportExcel(false)
      setOpen(false)
    }
  }
  return (
    <div className="relative">
      <button
        className="border px-4 py-2 rounded-full flex items-center gap-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        Export data <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <button
            className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100"
            onClick={handleFormularInExcelExport}
          >
            Excel
            {loadingExportExcel && (
              <Spinner
                size="sm"
                thickness="4px"
                speed="0.65s"
                className="ml-3 inline-block align-middle"
              />
            )}
          </button>
          <button
            className="block w-full text-left text-sm px-4 py-2 hover:bg-gray-100"
            onClick={handleFormularInPDFExport}
          >
            PDF
            {loadingExportPDF && (
              <Spinner
                size="sm"
                thickness="4px"
                speed="0.65s"
                className="ml-3 inline-block align-middle"
              />
            )}
          </button>
        </div>
      )}
    </div>
  )
}
