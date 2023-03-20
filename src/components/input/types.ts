import { FieldConfig } from "../DynamicForm";

export interface InputProps extends FieldConfig {
    isValid: boolean;
    onChange: (id: string, value: string, validate: boolean) => void;
}