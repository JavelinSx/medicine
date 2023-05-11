import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Button({icon, text, type}) {
    return ( 
        <>
            <button type={type}>
                {text}
                {icon && <FontAwesomeIcon icon={icon} />}
            </button>
        </>
     );
}

export default Button;