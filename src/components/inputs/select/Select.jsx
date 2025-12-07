function Select({ options = [], className, onChange, placeholder}) {
    return <select className={className} onChange={onChange}>
        <option value="null" disabled selected>{ placeholder }</option>
        { options.length > 0 && (options.map((option) =>
            <option key={option.label} value={option.value}>{option.label}</option>))
        }
    </select>
}

export  default Select;
