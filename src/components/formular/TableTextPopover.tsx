import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'

export const TableTextPopover = ({
  actionText,
  displayedText,
}: {
  actionText: string
  displayedText: string
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>{actionText}</Button>
      </PopoverTrigger>
      <PopoverContent className="py-2 px-4 bg-gray-400">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{displayedText}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
