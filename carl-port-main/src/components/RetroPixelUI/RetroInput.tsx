
interface baseProps {
    id: string
    name: string
    placeholder?: string
    required?: boolean
    className?: string
}

interface inputProps extends baseProps {
    tagsType: 'input'
    type?: React.HTMLInputTypeAttribute
}

interface textAreaProps extends baseProps {
    tagsType: 'textarea'
    rows: number
    cols?: number
}

type RetroInputPops = inputProps | textAreaProps

const RetroInput = (props: RetroInputPops) => {
    if (props.tagsType === 'input') {
        return (
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                className='text-white p-1 bg-[#1a1a2e] from-gray-800 to-gray-900 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative'
                style={{
                    backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)
                `
                }} />
        )
    }

    return (
        <textarea
            name={props.name}
            rows={props.rows}
            cols={props.cols}
            id={props.id}
            placeholder={props.placeholder}
            className='text-white p-1 bg-[#1a1a2e] from-gray-800 to-gray-900 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative'
            style={{
                backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)
                `
            }}
        />

    )
}

export default RetroInput