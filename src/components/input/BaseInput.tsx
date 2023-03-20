import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import { FieldConfig } from "../DynamicForm";

interface Props extends FieldConfig {
    isValid: boolean;
    htmlType: HTMLInputTypeAttribute;
    onChange: (value: string) => void;
}

const BaseInput = (props: Props) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value);
    };

    return (
        <Input
            type={props.htmlType}
            id={props.id}
            name={props.id}
            defaultValue={props.defaultValue}
            required={props.required}
            onChange={onChange}
            placeholder={props.label}
            isValid={props.isValid}
        />
    );
}

export default BaseInput;

const Input = styled.input<{ isValid?: boolean }>`
    width: 100%;
    padding: 1em;
    border-width: 0.1em;
    border-radius: 0.3em;
    border-color: ${({ required, isValid }) => required && !isValid ? '#f8bb8a' : 'auto'};
    border-style: solid;
    margin-bottom: 1em;

    :last-child {
        margin-bottom: 0;
    }
`;