exports.errorHandler = (err, res) => {
    if (err.isJoi) err.status = 422;
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors || undefined,
    });
};
