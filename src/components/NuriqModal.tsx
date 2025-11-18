import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

interface Props {
  HeaderTitle: string
  description?: string
  confirmText?: string
  cancelText?: string
  openModal: boolean
  isModalCentred?: boolean
  children?: React.ReactNode
  disabled?: boolean
  modifyOpenModal?: (isOpen: boolean) => void
  successFuncHandler: () => void
  openModalHandler: (callback: () => void) => void
}

export const NuriqModal = forwardRef<
  { closeModalFromWithin: () => void },
  Props
>(
  (
    {
      HeaderTitle,
      description,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      openModal,
      children,
      isModalCentred = true,
      disabled,
      modifyOpenModal,
      successFuncHandler,
      openModalHandler,
    },
    ref,
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null)

    // expose methods to parent
    useImperativeHandle(ref, () => ({
      closeModalFromWithin() {
        onClose()
        modifyOpenModal?.(false)
      },
    }))

    // handle external opening
    useEffect(() => {
      if (openModal) {
        openModalHandler(onOpen)
      }
    }, [openModal, openModalHandler, onOpen])

    // internal use function for button click
    const handleCloseFromButton = () => {
      onClose()
      modifyOpenModal?.(false)
    }

    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseFromButton}
        isCentered={isModalCentred}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {HeaderTitle}
            </AlertDialogHeader>

            <AlertDialogBody>{description || children}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseFromButton}>
                {cancelText}
              </Button>
              <Button
                colorScheme="red"
                onClick={successFuncHandler}
                ml={3}
                disabled={disabled}
              >
                {confirmText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
  },
)
