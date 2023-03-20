import { ChangeEvent } from "react";
import { FieldConfig } from "../DynamicForm";

export interface InputProps extends FieldConfig {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}