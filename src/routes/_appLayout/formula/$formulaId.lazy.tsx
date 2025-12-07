import { useState } from 'react'
import {
  createLazyFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
// import { useStore } from '@tanstack/react-store'
import { Spinner } from '@chakra-ui/react'
import { ChevronDown, ChevronLeft } from 'lucide-react'
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
import { updateFormularId, updateMarkettingInfo } from '@/appStore'

export const Route = createLazyFileRoute('/_appLayout/formula/$formulaId')({
  component: FormularModulePage,
})

function FormularModulePage() {
  const [loading, setLoading] = useState(false)
  const params = useParams({ strict: false })
  const { showToast } = useToastFunc()
  const router = useRouter()
  const [changeIdea, setChangeIdea] = useState(0)
  // const lastCreatedFormularId = useStore(
  //   appStore,
  //   (state) => state.lastCreatedFormularId,
  // )

  const { data, isLoading, error } = useQuery({
    queryKey: ['formula', params.formulaId, changeIdea],
    queryFn: async () => {
      const response: any = await getFormularUsingId(params.formulaId!)
      console.log(response.data)

      return response.data
    },
    enabled: !!params.formulaId || !!changeIdea,
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
        params.formulaId!,
      )
      if (response && response.data.id) {
        // we need to save the generated markeeting information
        updateMarkettingInfo(response.data)
        updateFormularId(params.formulaId!)
        showToast('Success', response.message, 'success')
        console.log(response.data)

        router.navigate({
          to: `/formula/summary/${params.formulaId}/${data.conversation_id}`,
        })
      }
    } catch (reqError: any) {
      showToast(
        'Error',
        reqError.response.data.detail || 'Failed to create formula',
        'error',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleAddMoreIngredients = () => {
    router.navigate({ to: '/marketplace' })
  }
  const handleChangeIdeaRouting = (conversationId: number) => {
    router.navigate({
      to: `/assistant/${conversationId}`,
      search: { suggestionText: undefined },
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.navigate({ to: `/formula` })}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">Formula module</h1>
        </div>
        {data && (
          <div className="flex items-center gap-3">
            <button
              className="bg-[#F4DD5F] px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2"
              onClick={handleCalculationSummary}
              disabled={loading}
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
              <button
                onClick={handleAddMoreIngredients}
                className="px-4 py-2 rounded-full font-medium border border-black flex items-center gap-2"
              >
                <span>Add ingredient</span>
                <img
                  src={AddIngredient}
                  alt="add-ingredient"
                  className="w-[18.33px] h-[18.33px]"
                />
              </button>
              <ExportDropdown formularId={params.formulaId!} />
            </div>
          </div>

          {/* Product concept */}
          <div className="flex flex-col gap-3 mb-4">
            <p className="font-semibold">Product concept:</p>
            <div className="flex items-center gap-3">
              <span className="text-[18px]">{data.name}</span>
              <button
                onClick={() => handleChangeIdeaRouting(data.conversation_id)}
                className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2 cursor-pointer"
              >
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

      {isLoading && <Loader text="Loading formula..." />}
      {error && (
        <div className="text-red-500 text-xl mt-10 font-semibold">
          Error retrieving formula. kindly create new formula from the assistant
          insight panel
        </div>
      )}
    </div>
  )
}

function ExportDropdown({ formularId }: { formularId: any }) {
  const [open, setOpen] = useState(false)
  const [loadingExportExcel, setLoadingExportExcel] = useState(false)
  const [loadingExportPDF, setLoadingExportPDF] = useState(false)

  const { showToast } = useToastFunc()

  const handleFormularInPDFExport = async () => {
    // Implement the logic to export formula data as PDF
    setLoadingExportPDF(true)
    try {
      const response: any = await exportFormularPDF(formularId)
      if (response) {
        // Create temporary URL
        const url = window.URL.createObjectURL(response)

        const a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()

        a.remove()
        window.URL.revokeObjectURL(url)

        showToast('Export', 'Formula exported successfully!', 'success')
      }
    } catch (error) {
      showToast('Export', 'Error exporting formula data as PDF', 'error')
      console.error('Error exporting formula data as PDF:', error)
    } finally {
      setLoadingExportPDF(false)
      setOpen(false)
    }
  }

  const handleFormularInExcelExport = async () => {
    setLoadingExportExcel(true)

    try {
      // IMPORTANT: Your export function must use `responseType: 'blob'`
      const response: any = await exportFormularExcel(formularId)

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(response)
      // Create a link & trigger download
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()

      // Clean up
      link.remove()
      window.URL.revokeObjectURL(url)

      showToast('Export', 'Formula exported successfully!', 'success')
      setOpen(false)
    } catch (error) {
      showToast('Export', 'Error exporting formula data as Excel', 'error')
      console.error('Error exporting formula data as Excel:', error)
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
