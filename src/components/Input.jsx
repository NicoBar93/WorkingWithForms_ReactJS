export default function Input({label, error, id, ...props}) {
    return (
        <div className="control">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...props}
            />
            <div className="control-error">
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}
