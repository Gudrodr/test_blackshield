import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const PasswordInput = (props: InputProps) => {
    return <BaseInput {...props} htmlType='password' />;
}

export default PasswordInput;