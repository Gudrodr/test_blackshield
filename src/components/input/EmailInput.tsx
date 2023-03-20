import { validateEmail } from "../../helpers";
import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const EmailInput = (props: InputProps) => {

    const onChange = (value: string) => {
        props.onChange(props.id, value, validateEmail(value));
    };

    return (
        <BaseInput
            {...props}
            htmlType='email'
            onChange={onChange}
        />
    );
}

export default EmailInput;