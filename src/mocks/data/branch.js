let list = []
for (let i = 1; i < 10; i++) {
    let data = {
        id: i,
        name: 'Vjpr' + i,
        email: 'vippro' + i + '@email.com',
        description: 'aaaaaaaaaaaaaaa' + i,
        status: 0,
        created_at: '2021-08-08 16:11:11',
        updated_at: '2021-08-08 16:11:11',
        team: 'ABC-' + i,
    }
    list.push(data)
}
const MockBranchResponse = {
    success: {
        success: true,
        code: 0,
        data: [
            {
                data:list,
                total:20,
                page:1
            }
        ],
    },
    detailSuccess: {
        success: true,
        code: 0,
        data: [
            {
                id: 1,
                name: 'Vjpr001',
                email: 'Vjpr001@email.com',
                description: 'Vjpr001@email.com',
            },
        ],
    },
    detailFailed: {
        success: false,
        code: 0,
        data: [
            {
                data: {
                    id: 1,
                    name: 'Vjpr001',
                },
            },
        ],
    },
    updateSuccess: {
        success: true,
        code: 0,
        data: null,
    },
    updateFailed: {
        success: false,
        code: 0,
        data: null,
    },
    addSuccess: {
        success: true,
        code: 0,
        data: [
            {
                id: 1,
            },
        ],
    },
    addFailed: {
        success: false,
        code: 0,
        data: null,
    },

}

export default MockBranchResponse
