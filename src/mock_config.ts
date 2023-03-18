import { FieldConfig } from "./components/DinamicForm";

export const config: FieldConfig[] = [
    {
        id: 'first_name',
        type: 'inputText',
        label: 'First Name',
        defaultValue: 'Some first name'
    },
   {
        id:  'last_name',
        type: 'inputText',
        label: 'Last Name'
    },
    {
        id: 'email',
        type: 'inputEmail',
        label: 'Email',
        required: true
    },
    {
        id: 'password',
        type: 'inputPassword',
        label: 'Password',
        required: true
    },
]