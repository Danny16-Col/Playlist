
export const errorHandler = (err, req, res , next) =>{
    res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message || 'Internal Server Error'
    })

}