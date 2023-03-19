export const validateEmail = (value: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!value.match(validRegex);
}

export const validatePassword = (value: string) => value.length > 6;

export const validateText = (value: string) => value.length > 2;