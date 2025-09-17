import React from 'react'
import { Grid, List } from 'lucide-react' // or any icon set you like

interface Props {
  layout: 'grid' | 'list'
  onChange: (layout: 'grid' | 'list') => void
}

export const LayoutToggle: React.FC<Props> = ({ layout, onChange }) => (
  <div className="flex gap-2 mb-4">
    <button
      onClick={() => onChange('grid')}
      className={`p-2 rounded ${layout === 'grid' ? 'bg-gray-200' : 'bg-transparent'}`}
    >
      <Grid size={20} />
    </button>
    <button
      onClick={() => onChange('list')}
      className={`p-2 rounded ${layout === 'list' ? 'bg-gray-200' : 'bg-transparent'}`}
    >
      <List size={20} />
    </button>
  </div>
)
