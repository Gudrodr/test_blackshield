import { debounce } from "lodash";
import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useEffect, useState } from "react";
import styled from "styled-components";

export interface FieldConfig {
    id: string;
    type: 'inputText' | 'inputEmail' | 'inputPassword';
    label: string;
    defaultValue?: string;
    required?: boolean;
}

interface Props {
    formId: string;
    config: FieldConfig[];
    onSubmit: (values: Record<string, string>) => void;
    setIsValid: (value: boolean) => void;
    validatePassword: (value: string) => boolean;
    validateEmail: (value: string) => boolean;
    validateText: (value: string) => boolean;
}

const DynamicForm = (props: Props) => {
    const {
        config,
        onSubmit,
        setIsValid,
        formId,
        validateEmail,
        validatePassword,
        validateText
    } = props;
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [requiredFields, setRequiredFields] = useState<Record<string, boolean>>({});

    const getType = (type: string) => type.slice(5).toLowerCase();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type } = event.target;
        setFormData((prevValues) => ({ ...prevValues, [id]: value }));
        // проверка на обязательное к заполнению поле
        if (requiredFields[id] !== undefined) {
            validate(id, value, type);
        }
    };

    const validate = debounce((id: string, value: string, type: HTMLInputTypeAttribute) => {
        switch (type) {
            case 'password':
                requiredFields[id] = validatePassword(value);
                break;
            case 'email':
                requiredFields[id] = validateEmail(value);
                break;
            default:
                requiredFields[id] = validateText(value);
        };
        // если в requiredField не осталось полей со значением false, то форма валидна
        const isFormValid = Object.values(requiredFields).filter(item => item === false).length === 0;
        setIsValid(isFormValid);
    }, 500)

    useEffect(() => {
        config.forEach(({ id, defaultValue, required }) => {
            setFormData((prevValues) => ({ ...prevValues, [id]: defaultValue || '' }));
            if (required) {
                setRequiredFields((prevValues) => ({ ...prevValues, [id]: false }));
            }
        });
    }, [config]);

    return (
        <Form id={formId} onSubmit={handleSubmit}>
            {config.map((item) => (
                <Input
                    key={item.id}
                    type={getType(item.type)}
                    id={item.id}
                    name={item.id}
                    defaultValue={item.defaultValue}
                    required={item.required}
                    onChange={handleFieldChange}
                    placeholder={item.label}
                    isValid={requiredFields[item.id]}
                />
            ))}
        </Form>
    );
};

export default DynamicForm;

const Form = styled.form`
    min-width: 20em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

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