import { toast, ToastOptions } from 'react-toastify'
import { config } from '../config'

class Toast {
    success(message: string, options?: ToastOptions) {
        toast.success(message, options || config)
    }

    error(message: string, options?: ToastOptions) {
        toast.error(message, options || config)
    }
}

export const toastService = new Toast()
