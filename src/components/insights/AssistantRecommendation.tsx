export default function AssistantRecommendation({
  risk,
  opportunities,
}: {
  risk: string
  opportunities: string
}) {
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Assistant recommendation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Opportunities</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li className="list-none">{opportunities}</li>
          </ul>
          <p className="mt-4 text-black">Key ingredients:</p>
          <p className="mt-2 text-sm text-gray-500">
            Caragana, sea moss, coconut, ginger, sodium
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Risk</h4>
          <ul className="list-inside text-sm text-[#1A1A1A] list-none">
            <li className="mb-2">{risk}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
