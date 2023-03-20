import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const EmailInput = (props: InputProps) => {
    return <BaseInput {...props} htmlType='email' />;
}

export default EmailInput;