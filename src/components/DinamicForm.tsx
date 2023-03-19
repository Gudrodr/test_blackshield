import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

export interface FieldConfig {
    id: string;
    type: 'inputText' | 'inputEmail' | 'inputPassword';
    label: string;
    defaultValue?: string;
    required?: boolean;
}

interface FormData {
    [key: string]: string;
}

interface Props {
    formId: string;
    config: FieldConfig[];
    onSubmit: (values: FormData) => void;
    setIsValid: Dispatch<SetStateAction<boolean>>;
}

const validateEmail = (value: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!value.match(validRegex);
}

const validatePassword = (value: string) => value.length > 6;

const validateText = (value: string) => value.length > 2;

const getType = (type: string) => type.slice(5).toLowerCase();

const DinamicForm = (props: Props) => {
    const { config, onSubmit, setIsValid, formId } = props;
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [requiredFields, setRequiredFields] = useState<Record<string, boolean>>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = event.target;
        setFormData((prevValues) => ({ ...prevValues, [id]: value }));
        if (requiredFields[id] !== undefined) {
            validate(id, value);
        }
    };

    const validate = debounce((id, value) => {
        switch (id) {
            case 'password':
                requiredFields[id] = validatePassword(value);
                break;
            case 'email':
                requiredFields[id] = validateEmail(value);
                break;
            default:
                requiredFields[id] = validateText(value);
        };
        setIsValid(Object.values(requiredFields).filter(item => item === false).length === 0);
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
        <Container id={formId} onSubmit={handleSubmit}>
            {config.map((item) => (
                <div key={item.id}>
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <Input
                        type={getType(item.type)}
                        id={item.id}
                        name={item.id}
                        defaultValue={item.defaultValue}
                        required={item.required}
                        onChange={handleFieldChange}
                    />
                </div>
            ))}
        </Container>
    );
};

export default DinamicForm;

const Container = styled.form``;

const Label = styled.label``;

const Input = styled.input``;