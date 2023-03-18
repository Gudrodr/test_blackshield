import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

export interface FieldConfig {
  id: string;
  type: 'inputText' | 'inputEmail' | 'inputPassword';
  label: string;
  defaultValue?: string;
  required?: boolean;
}

interface FormValues {
  [key: string]: string;
}

interface Props {
  config: FieldConfig[];
  onSubmit: (values: FormValues) => void;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const DinamicForm = (props: Props) => {
    const { config, onSubmit, onChange } = props;
    const [formValues, setFormValues] = useState<Record<string, string>>({});
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.log('kek')
        event.preventDefault();
        onSubmit(formValues);
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value, required } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
    
        if (required && value === '') {
            onChange(false);
        } else if (Object.values(formValues).every((value) => value !== '')) {
            onChange(true);
        }
    };

    const getType = (type: string) => {
        switch(type) {
            case 'inputEmail':
                return 'email';
            case 'inputPassword':
                return 'password';
            default:
                return 'text'
        }
    }

    useEffect(() => {
        config.forEach(({id, defaultValue}) => {
            setFormValues((prevValues) => ({ ...prevValues, [id]: defaultValue || '' }));
        });
    }, []);

    return (
        <Container id="dinamic" onSubmit={handleSubmit}>
          {config.map((item) => (
            <div key={item.id}>
              <Label htmlFor={item.id}>{item.label}</Label>
              <Input
                type={getType(item.type)}
                id={item.id}
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