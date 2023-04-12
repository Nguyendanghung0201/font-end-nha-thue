import querystring from 'querystring'
import { Response, Server } from 'miragejs'
import { getBaseUrl } from '@/helpers/common'
import MockAuthResponse from '@/mocks/data/auth'
import MockUserListResponse from '@/mocks/data/userList'
import MockBranchResponse from '@/mocks/data/branch'
import MockRevenueResponse from '@/mocks/data/revenue'
import MockCommissionResponse from '@/mocks/data/commission'

export function makeServer({ environment = 'development' } = {}) {
    const token_test = 'eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0'
    const checkUser = (request) => {
        if (!request.requestHeaders.Authorization) return false
        return request.requestHeaders.Authorization === 'Bearer ' + token_test;

    }

    return new Server({
        environment,

        routes() {

            this.get(getBaseUrl('/auth'), (schema, request) => {
                if (!checkUser(request)) return new Response(400, {},
                    MockAuthResponse.requiredLogin)
                return new Response(200, {}, MockAuthResponse.info)
            })
            this.get(getBaseUrl('/auth/me'), (schema, request) => {
                if (!checkUser(request)) return new Response(400, {},
                    MockAuthResponse.requiredLogin)
                return new Response(200, {}, MockAuthResponse.info)
            })
            this.post(getBaseUrl('/auth/login'), (schema, request) => {
                let attrs = querystring.decode(request.requestBody)

                if (attrs.email !== 'test@demo.com' || attrs.password !== '123456') {
                    return new Response(400, {}, MockAuthResponse.fail)
                }

                return new Response(200, {}, MockAuthResponse.success)
            })
            this.post(getBaseUrl('/auth/register'), (schema, request) => {
                let attrs = querystring.decode(request.requestBody)
                return new Response(200, {}, MockAuthResponse.success)
            })
            this.post(getBaseUrl('/auth/forgot-password'), (schema, request) => {
                let attrs = querystring.decode(request.requestBody)
                return new Response(200, {}, MockAuthResponse.forgotPasswordSuccess)
            })
            this.post(getBaseUrl('/auth/forgot-password/check-reset-token'), (schema, request) => {
                let attrs = querystring.decode(request.requestBody)
                return new Response(200, {}, MockAuthResponse.forgotPasswordSuccess)
            })
            this.post(getBaseUrl('/auth/reset-password'), (schema, request) => {
                let attrs = querystring.decode(request.requestBody)
                return new Response(200, {}, MockAuthResponse.resetPasswordSuccess)
            })

            // Branches
            this.post(getBaseUrl('/member/branch/'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.success)
            })
            this.get(getBaseUrl('/member/branch/2/edit'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/branch/2'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/branch/detail'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/branch/update'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/branch/add'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.addSuccess)
            })
            this.post(getBaseUrl('/member/branch/delete'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.updateSuccess)
            })

            // Users
            this.post(getBaseUrl('/member/user/'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.success)
            })
            this.get(getBaseUrl('/member/user/2/edit'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/user/2'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/user/detail'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/user/update'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/user/add'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.addSuccess)
            })
            this.post(getBaseUrl('/member/user/delete'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.updateSuccess)
            })
            this.post(getBaseUrl('/member/user/active'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.updateSuccess)
            })
            this.post(getBaseUrl('/member/user/deactive'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.updateSuccess)
            })
            // Team
            this.post(getBaseUrl('/member/team/'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.success)
            })
            this.get(getBaseUrl('/member/team/2/edit'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/team/2'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/team/detail'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/team/update'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.detailSuccess)
            })
            this.post(getBaseUrl('/member/team/add'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.addSuccess)
            })
            this.post(getBaseUrl('/member/team/delete'), (schema, request) => {
                return new Response(200, {}, MockBranchResponse.updateSuccess)
            })

            // Revenue
            this.post(getBaseUrl('/member/revenue'), (schema, request) => {
                if (!checkUser(request)) return new Response(400, {},
                    MockAuthResponse.requiredLogin)

                return new Response(200, {}, MockRevenueResponse.success)
            })
            // Commission
            this.post(getBaseUrl('/member/commission'), (schema, request) => {
                if (!checkUser(request)) return new Response(400, {},
                    MockAuthResponse.requiredLogin)

                return new Response(200, {}, MockCommissionResponse.success)
            })

            // this.post(getBaseUrl('/user/bank/account'), (schema, request) => {
            //     if (!checkUser(request)) return new Response(400, {},
            //         MockAuthResponse.requiredLogin)
            //
            //     return new Response(200, {}, MockUserBankResponse.success)
            // })
            // this.post(getBaseUrl('/user/bank/add'), (schema, request) => {
            //     if (!checkUser(request)) return new Response(400, {},
            //         MockAuthResponse.requiredLogin)
            //
            //     return new Response(200, {}, MockBankListResponse.success)
            // })
            // this.post(getBaseUrl('/user/bank/detail'), (schema, request) => {
            //     if (!checkUser(request)) return new Response(400, {},
            //         MockAuthResponse.requiredLogin)
            //
            //     return new Response(200, {}, MockUserBankResponse.detail)
            // })
            // this.post(getBaseUrl('/user/bank/update'), (schema, request) => {
            //     if (!checkUser(request)) return new Response(400, {},
            //         MockAuthResponse.requiredLogin)
            //
            //     return new Response(200, {}, MockUserBankResponse.updateSuccess)
            // })
            // this.post(getBaseUrl('/user/bank/delete'), (schema, request) => {
            //     if (!checkUser(request)) return new Response(400, {},
            //         MockAuthResponse.requiredLogin)
            //
            //     return new Response(200, {}, MockUserBankResponse.deleteSuccess)
            //
            // })
            // // History
            // this.post(getBaseUrl('/user/history'), (schema, request) => {
            //     if (!checkUser(request)) return new Response(400, {},
            //         MockAuthResponse.requiredLogin)
            //     return new Response(200, {}, MockUserHistoryResponse.success)
            // })
        }
    })
}
