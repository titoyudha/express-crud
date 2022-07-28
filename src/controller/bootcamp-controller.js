const {validateBootcamp} = require('../utils/validation');
const ErrorResponse = require('../utils/errorResponse');
const {
    insertBootcamp,
    getBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../models/bootcamp-models');

exports.createData = (req, res, next) => {
    const data = {...req.body};
    const querySQL = 'INSERT INTO bootcamp SET ?';

    //validate
    let errors = validateBootcamp(data);
    if (errors) {
        return next(new ErrorResponse(errors[0], 400));
    }
    //insert into model
    insertBootcamp(res, querySQL, data, next);
};

exports.readData = (req, res, next) => {
    const queryGet = 'SELECT * FROM bootcamp';

    getBootcamp(res, queryGet);
};

exports.updateData = (req, res, next) => {
    const data = {...req.body};
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryupdate = 'UPDATE bootcamp SET ? WHERE id = ?';

    updateBootcamp(res, querySearch, queryupdate, req.params.id, data);
};

exports.deleteData = (req, res, next) => {
    const querySearch = 'SELECT * FROM bootcamp WHERE id = ?';
    const queryDelete = 'DELETE FROM bootcamp WHERE id = ?';

    deleteBootcamp(res, querySearch, queryDelete, req.params.id);
};