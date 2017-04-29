import validate from 'validate.js';

let validationRules = {
    username: {
        presence: {
            message: '^Login can not be empty'
        },
        length: {
            minimum: 5,
            maximum: 10,
            message: '^Login should contains from 5 to 10 symbols'
        },
        format: {
            // lowercase, uppercase, number
            pattern: /^[a-zA-Z0-9]+$/,
            message: '^Login should contains latin letters (at least 1) and numbers'
        },
        checkForLetter: {
            // lowercase, uppercase, number
            pattern: /[a-zA-Z]+/,
            message: '^Login should contains at least 1 letter'
        }
    },

    password: {
        presence: {
            message: '^Password can not be empty'
        },
        length: {
            minimum: 6,
            maximum: 10,
            message: '^Password should contains from 6 to 10 symbols'
        },
        format: {
            // lowercase, uppercase, number
            pattern: /^[a-zA-Z0-9]+$/,
            message: '^Password should contains latin letters (at least 1) and numbers'
        },
        checkForLetter: {
            // lowercase, uppercase, number
            pattern: /[a-zA-Z]+/,
            message: '^Password should contains at least 1 letter'
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