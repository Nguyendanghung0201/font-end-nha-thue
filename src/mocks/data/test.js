const MockTestReponse = {
    success: {
        success: true,
        code: 0,
        data: {
            token: "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0."
        }
    },
    fail: {
        success: false,
        code: 400,
        error: 'Login fail'
    }
};

export default MockTestReponse
