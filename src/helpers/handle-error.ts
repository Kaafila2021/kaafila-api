
const handleError = (err, res) => {
    console.error(err);
    res
        .status(500)
        .contentType("text/json")
        .json({
            error: true,
            data: null,
            ok: false,
            message: 'Oops! Something went wrong! ' + err
        });
};

export default handleError;