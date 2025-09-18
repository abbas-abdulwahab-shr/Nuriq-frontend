interface Ingredient {
  id: number
  name: string
  weight: number
  unit: string
  supplier: string
  price: number
  allergies: string
  regulatory: string
  functionDesc: string
  notes: string
  costUnit: number
}

interface Props {
  data: Array<Ingredient>
}

export default function FormulaTable({ data }: Props) {
  const headers = [
    'S/N',
    'Ingredient',
    'Weight',
    'Unit',
    'Supplier',
    'Price',
    'Allergies',
    'Regulatory',
    'Function',
    'Notes',
    'Cost/unit',
  ]

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-md">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ backgroundColor: '#E1E1E1' }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-4 text-center border border-gray-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((ing) => (
            <tr key={ing.id}>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.id}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.name}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.weight}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.unit}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.supplier}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                ${ing.price}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.allergies}
              </td>
              <td className="bg-[#EBFCD5] px-4 py-4 border border-gray-300 text-center">
                {ing.regulatory}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.functionDesc}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                {ing.notes}
              </td>
              <td className="px-4 py-4 border border-gray-300 text-center">
                ${ing.costUnit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
