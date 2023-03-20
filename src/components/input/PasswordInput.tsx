import { validatePassword } from "../../helpers";
import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const PasswordInput = (props: InputProps) => {

    const onChange = (value: string) => {
        props.onChange(props.id, value, validatePassword(value));
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