const errorHandler = (err, req, res, next) => {
    let error = {...err};

    res.status(err.statusCode || 500).json({
        sucess: false,
        message: error.message || 'Server Eror'
    });
};

module.exports = errorHandler;