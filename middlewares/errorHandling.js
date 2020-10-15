module.exports = (error, req, res, next) => {
    let status = 500;
    let msg = "Internal server error"

    if(error.name === "SequelizeValidationError"){
        status = 500;
        msg = error.errors[0].message
    }
    
    res.status(status).json({
        status, msg
    })
}
