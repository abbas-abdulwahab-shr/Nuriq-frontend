import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

interface DatePickerProps {
  selectedDate: Date | null
  onChange: (date: Date | null) => void
}

export default function DatePickerPopup({
  selectedDate,
  onChange,
}: DatePickerProps) {
  return (
    <div className="absolute z-50 right-6 bg-white p-4 shadow-lg rounded-xl border">
      <DatePicker selected={selectedDate} onChange={onChange} inline />
    </div>
  )
}
