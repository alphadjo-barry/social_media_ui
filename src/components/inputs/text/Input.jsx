

export default function Input({ type, classeName, id,  placeholder, onChange}) {

    return <>
        <input type={type} className={classeName} id={id} placeholder={placeholder} onChange={onChange}/>
    </>
}