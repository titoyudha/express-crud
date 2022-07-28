const connection = require('../config/db');
const { responseData, responseMessage} = require('../utils/response-handler');
const ErrorResponse = require('../utils/errorResponse')

exports.insertBootcamp = (response, statement, data, next) => {

    connection.query(statement, data, (err, rows, field) => {
        if (err) {
            return next(new ErrorResponse(err.message, 500));
        }
        response.status(201).json({
            success: true,
            message: 'Success inserting data'
        })
    });
};

exports.getBootcamp = (response, statement, next) => {

    connection.query(statement, (err, rows, field) => {
        if (err) {
            return next(new ErrorResponse(err.message, 500))
        }
        response.status(200).json({
            sucess: true,
            message: 'Success get all data',
            data: rows
        })
    })
};

exports.updateBootcamp = (response, searchStatement, updateStatement, id, data, next) => {

    connection.query(searchStatement, id,  (err, rows, field) => {
        if (err) {
            return next(new ErrorResponse(err.message, 500))
        }
        if (rows.length) {
            connection.query(updateStatement, [data, id], (err, rows, field) => {
                if (err) {
                    return response.status(500).json({
                        message: 'Error occured when updating',
                        error: err
                    })
                }
                response.status(200).json({
                    success: true,
                    message: 'Success update data'
                })
            });
        }else {
            return next(new ErrorResponse('Data Not Found', 500));
        }        
    })
}

exports.deleteBootcamp = (response, searchStatement, deleteStatement, id, next) => {
    
    connection.query(searchStatement, id, (err, rows, field) => {
        if (err) {
            return next(new ErrorResponse(err.message, 500))
        }
        if (rows.length){
            connection.query(deleteStatement, id, (err, rows, field) => {
                if (err) {
                    response.status(500).json({
                        message: 'Error while deleting data',
                        error: err
                    })
                }
                response.status(200).json({
                    success: true,
                    message: 'Successful deleting bootcamp'
                })
            })
        } else {
            response.status(404).json({
                success: false,
                message: 'Data not found'
            })
        }
    })
}