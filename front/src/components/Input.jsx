import styles from './input.module.css'

export function InputText(props) {
    return (
        <input type={props.type} 
        id={props.id} 
        name={props.name} 
        max={props.max} 
        min={props.min} 
        maxLength={props.maxLength} 
        minLength={props.minLength} 
        onChange={props.onChange} 
        className={styles.inputext} 
        placeholder = {props.placeholder} 
        readOnly={props.readOnly} 
        disabled={props.disabled} 
        required={props.required}
        value={props.value}
        >
        {props.content}
        </input>
    )
}


