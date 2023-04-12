const tokenTest = 'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0'
const token = {
    tokenType: 'Bearer',
    accessToken: tokenTest,
    expires_in: 3600,
    user_id: 1,
}
const roles = ['BRANCH']
const MockAuthResponse = {
    requiredLogin: {
        success: false,
        code: 400,
        error: 'Vui long dang nhap',
    },
    success: {
        success: true,
        code: 0,
        data: [
            {
                token,
            },
        ],
    },
    info: {
        success: true,
        code: 0,
        data: [
            {
                id: 2,
                email: 'demo@demo.com',
                name: 'demo',
                token,
                roles: roles,
                team_id: 2,
                branch_id: 2,
            },
        ],
    },
    fail: {
        success: false,
        code: 400,
        error: 'Login failed',
    },
    forgotPasswordSuccess: {
        success: true,
        code: 200,
        error: null,
    },
    forgotPasswordFailed: {
        success: false,
        code: 400,
        error: null,
    },
    checkResetTokenSuccess: {
        success: true,
        code: 200,
        error: null,
    },
    checkResetTokenFailed: {
        success: false,
        code: 400,
        error: null,
    },
    resetPasswordSuccess: {
        success: true,
        code: 400,
        error: null,
    },
    resetPasswordFailed: {
        success: false,
        code: 400,
        error: null,
    },
}

export default MockAuthResponse
