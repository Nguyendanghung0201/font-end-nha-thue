const MockUserListResponse = {
    success: {
        success: true,
        code: 0,
        data: [
            {
                data: [
                    {
                        id: 1,
                        name:'HEHE',
                        email:'abc@email.com',
                        branch:{
                            id:1,
                            name:'ABC',
                        },
                        status:1,
                        created_at: '2021-08-08 16:11:11',
                        updated_at: '',
                    },
                    {
                        id: 2,
                        name:'HAHA',
                        email:'abc@email.com',
                        branch:{
                            id:1,
                            name:'ABC',
                        },
                        status:1,
                        created_at: '2021-08-08 16:11:11',
                        updated_at: '',
                    },
                ],
            },
        ],
    },
    detail: {
        success: true,
        code: 0,
        data: [
            {
                data:  {
                    id: 2,
                    name:'HAHA',
                    email:'abc@email.com',
                    created_at: '2021-08-08 16:11:11',
                    updated_at: '',
                },
            },
        ],
    },
    updateSuccess: {
        success: true,
        code: 0,
        data: [

        ],
    },
    updateFailed: {
        success: false,
        code: 400,
        error: 'Update failed'
    },
    deleteSuccess: {
        success: true,
        code: 0,
        data: [

        ],
    },
}

export default MockUserListResponse
