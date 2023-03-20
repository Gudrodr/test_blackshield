import { validateText } from "../../helpers";
import BaseInput from "./BaseInput";
import { InputProps } from "./types";

const TextInput = (props: InputProps) => {

    const onChange = (value: string) => {
        props.onChange(props.id, value, validateText(value));
    };

    return (
        <BaseInput
            {...props}
            htmlType='text'
            onChange={onChange}
        />
    );
}

export default TextInput;