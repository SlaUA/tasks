import validate from 'validate.js';

let validationRules = {
    username: {
        presence: {
            message: '^Логин не может быть пустым'
        },
        length: {
            minimum: 5,
            maximum: 10,
            message: '^Логин должен содерхать от 5 до 10 символов'
        },
        format: {
            // lowercase, uppercase, number
            pattern: /^[a-zA-Z0-9]+$/,
            message: '^Логин может содержать только латинские буквы (хотя бы одну) и цифры'
        },
        checkForLetter: {
            // lowercase, uppercase, number
            pattern: /[a-zA-Z]+/,
            message: '^Логин должен содержать хотя бы одну букву'
        }
    },

    password: {
        presence: {
            message: '^Пароль не может быть пустым'
        },
        length: {
            minimum: 6,
            maximum: 10,
            message: '^Пароль должен содерхать от 6 до 10 символов'
        },
        format: {
            // lowercase, uppercase, number
            pattern: /^[a-zA-Z0-9]+$/,
            message: '^Пароль должен содержать только латинские буквы (хотя бы одну) и цифры'
        },
        checkForLetter: {
            // lowercase, uppercase, number
            pattern: /[a-zA-Z]+/,
            message: '^Пароль должен содержать хотя бы одну букву'
        }
    }
};

validate.validators.checkForLetter = function (value, options) {

    if (options.pattern.exec(value)) {
        return;
    }
    return options.message;
};

/**
 * validateFormPart
 * @param formPart {{}} config with keys from validationRules and values
 * @returns {{}} errors
 */
export default (formPart) => {

    let errors = validate(formPart, validationRules) || {};

    for (let field in validationRules) {
        if (!validationRules.hasOwnProperty(field) || !errors.hasOwnProperty(field)) {
            continue;
        }
        errors[field] = errors[field] && errors[field][0] || '';
    }
    return errors;
};