import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const TextInput = (props: InputProps) => {
    return <BaseInput {...props} htmlType='text' />;
}

export default TextInput;