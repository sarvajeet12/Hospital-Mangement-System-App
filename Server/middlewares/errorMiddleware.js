// centralized error of schema
// app.use(errorMiddleware)  ] written in server.js page, to connect all or centralized 

const errorMiddleware = (err, req, resp, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || "Error From Backend";

    return resp.status(status).send({ message, extraDetails });

};

module.exports = errorMiddleware

