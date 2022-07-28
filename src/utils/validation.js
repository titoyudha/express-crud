const validate = require('validate.js');

exports.validateBootcamp = (data) => {
    let constrait = {
        name: {
            presence: {
                allowedEmpty: false
            }
        },
        description: {
            presence: {
                allowedEmpty: false
            }
        },
        website: {
            presence: {
                allowedEmpty: false
            },
            url: true
        },
        phone: {
            presence: {
                allowedEmpty: false
            }
        },
        email: {
            presence: {
                allowedEmpty: false
            },
            email: true
        },
        address: {
            presence: {
                allowedEmpty: false
            } 
        }
    };

    return validate(data, constrait, {format: 'flat'});
}