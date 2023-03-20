import { ChangeEvent, FormEvent, HTMLInputTypeAttribute, useCallback, useEffect, useRef, useState } from "react";
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
    const formRef = useRef<HTMLFormElement>(null);

    const inputMap: Record<string, typeof PasswordInput | typeof EmailInput | typeof TextInput> = {
        password: PasswordInput,
        email: EmailInput,
        text: TextInput,
    };

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    }, [onSubmit, formData]);

    const handleFieldChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevValues) => ({ ...prevValues, [id]: value }));
        setIsValid(formRef.current?.checkValidity() || false);
    }, [setIsValid]);



    useEffect(() => {
        config.forEach(({ id, defaultValue }) => {
            setFormData((prevValues) => ({ ...prevValues, [id]: defaultValue || '' }));
        });
    }, [config]);

    return (
        <Form id={formId} ref={formRef} onSubmit={handleSubmit}>
            {config.map((item) => {
                const Input = inputMap[getType(item.type)];

                return <Input {...item} key={item.id} onChange={handleFieldChange} />
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