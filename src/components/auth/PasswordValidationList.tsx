import { CheckCircle, Circle } from 'lucide-react'

interface PasswordValidationListProps {
  password: string
}

export const PasswordValidationList = ({
  password,
}: PasswordValidationListProps) => {
  const isMinLength = password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    <ul className="mt-2 text-sm space-y-1">
      <li className="flex items-center gap-2">
        {isMinLength ? (
          <CheckCircle size={16} className="text-green-500" />
        ) : (
          <Circle size={16} className="text-gray-400" />
        )}
        Must be at least 8 characters
      </li>
      <li className="flex items-center gap-2">
        {hasSpecialChar ? (
          <CheckCircle size={16} className="text-green-500" />
        ) : (
          <Circle size={16} className="text-gray-400" />
        )}
        Must contain one special character
      </li>
    </ul>
  )
}
