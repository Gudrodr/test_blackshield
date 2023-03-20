import { FormEvent, HTMLInputTypeAttribute, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import EmailInput from "./input/EmailInput";
import PasswordInput from "./input/PasswordInput";
import TextInput from "./input/TextInput";

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
}

const getType = (type: string): HTMLInputTypeAttribute => type.slice(5).toLowerCase();

const DynamicForm = (props: Props) => {
    const {
        config,
        onSubmit,
        setIsValid,
        formId,
    } = props;
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [requiredFields, setRequiredFields] = useState<Record<string, boolean>>({});

    const inputMap: Record<string, typeof PasswordInput | typeof EmailInput | typeof TextInput> = {
        password: PasswordInput,
        email: EmailInput,
        text: TextInput,
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleFieldChange = useCallback((id: string, value: string, validate: boolean) => {
        setFormData((prevValues) => ({ ...prevValues, [id]: value }));
        if (requiredFields[id] !== undefined) {
            setRequiredFields((prevValues) => ({ ...prevValues, [id]: validate }));
            // если в requiredField не осталось полей со значением false, то форма валидна
            const isFormValid = Object.values(requiredFields).filter(item => item === false).length === 0;
            setIsValid(isFormValid);
        }
    }, [requiredFields, setIsValid]);

    useEffect(() => {
        const reqFields: Record<string, boolean> = {};
        config.forEach(({ id, defaultValue, required }) => {
            setFormData((prevValues) => ({ ...prevValues, [id]: defaultValue || '' }));
            if (required) {
                // создаём список полей обязательных к заполнению и валидации
                reqFields[id] = false;
            }
        });

        // если не оказалось обязательных к заполнению полей
        // то сразу отмечаем форму как валидную
        if (Object.keys(reqFields).length === 0) {
            setIsValid(true);
        } else {
            setRequiredFields(reqFields);
        }
    }, [config, setIsValid]);

    return (
        <Form id={formId} onSubmit={handleSubmit}>
            {config.map((item) => {
                const Input = inputMap[getType(item.type)];
                const props = {
                    ...item,
                    onChange: handleFieldChange,
                    isValid: requiredFields[item.id]
                };

                return <Input {...props} key={item.id} />
            })}
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