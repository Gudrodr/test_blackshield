import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import { FieldConfig } from "../DynamicForm";

interface Props extends FieldConfig {
    htmlType: HTMLInputTypeAttribute;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput = (props: Props) => {
    return (
        <Input
            type={props.htmlType}
            id={props.id}
            name={props.id}
            defaultValue={props.defaultValue}
            required={props.required}
            onChange={props.onChange}
            placeholder={props.label}
        />
    );
}

export default BaseInput;

const Input = styled.input`
    width: 100%;
    padding: 1em;
    border-width: 0.1em;
    border-radius: 0.3em;
    border-style: solid;
    margin-bottom: 1em;

    :last-child {
        margin-bottom: 0;
    }

    :invalid {
        border-color: #f8bb8a;
    }
`;