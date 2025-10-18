import React from 'react'
import { Spinner } from '@chakra-ui/react'

export const Loader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center w-full h-[60vh]">
    <div className="flex flex-col items-center gap-6">
      <Spinner size="xl" thickness="6px" color="teal.500" speed="0.65s" />
      {text && <span className="ml-4 text-lg">{text}</span>}
    </div>
  </div>
)
