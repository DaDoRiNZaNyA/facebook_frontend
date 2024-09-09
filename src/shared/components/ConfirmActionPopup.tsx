import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'

type Props = {
    isOpen: boolean
    onClose: () => void
    title: string
    yesText: string
    noText: string
    yesAction: () => void
}

export const ConfirmActionPopup = ({ isOpen, onClose, title, yesText, noText, yesAction }: Props) => {
    return (
        <Modal
            backdrop="blur"
            isOpen={isOpen}
            onClose={onClose}
            classNames={{ wrapper: 'flex items-center justify-center' }}
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-row justify-between">
                            <Button
                                color="danger"
                                size="lg"
                                onClick={() => {
                                    yesAction()
                                    onClose()
                                }}
                            >
                                {yesText}
                            </Button>
                            <Button size="lg" onClick={onClose}>
                                {noText}
                            </Button>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}
