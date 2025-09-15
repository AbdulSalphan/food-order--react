import { useFormStatus } from "react-dom"

export default function Submit() {
    const {pending} = useFormStatus();
    return (
        <button className='button' disabled={pending}>
            {pending ? 'Submitting form...' : 'Submit Order'}
        </button>
    )
};
