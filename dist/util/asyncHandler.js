const asyncHandler = (passedFunction) => async (req, res, next) => {
    return Promise
        .resolve(passedFunction(req, res, next))
        .catch((err) => next(err));
};
export default asyncHandler;
