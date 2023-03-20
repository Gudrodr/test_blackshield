import { validatePassword } from "../../helpers";
import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const PasswordInput = (props: InputProps) => {

    const onChange = (value: string) => {
        const validate = validatePassword(value);
        console.log('validate pass', validate);
        props.onChange(props.id, value, validate);
    };

    return (
        <BaseInput
            {...props}
            htmlType='password'
            onChange={onChange}
        />
    );
}

export default PasswordInput;