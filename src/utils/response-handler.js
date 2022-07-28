const responseData = (response, statusCode, value) => {
    let data = {
        success: true,
        data: value
    }
    response.status(statusCode).json(data);
    response.end();
};

const responseMessage = (response, statusCode, message) => {
    let data = {
        success: true,
        message: message
    }
    response.status(statusCode).json(data);
    response.end();
};


module.exports = {responseData, responseMessage};