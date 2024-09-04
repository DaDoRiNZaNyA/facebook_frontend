import { Input as NInput, InputProps } from '@nextui-org/input'
import { useField } from 'formik'

export default function Input({ name, ...props }: InputProps & { name: string }) {
    const [field, meta] = useField({ name })

    return (
        <NInput
            {...field}
            errorMessage={meta.error && meta.touched ? meta.error : null}
            isInvalid={Boolean(meta.error && meta.touched)}
            {...props}
        />
    )
}
