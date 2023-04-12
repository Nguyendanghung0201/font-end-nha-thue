const list = []
const type = ['IN', 'OUT']
const status = ['COMPLETED', 'PENDING', 'CANCELLED']
for (let i = 1; i < 10; i++) {
    let data = {
        id: i,
        transaction: {
            code: 'AAAAA-' + i,
            type: type[Math.floor(Math.random() * 2)],
        },
        bank: {
            bank_code: 'VCB',
            bank_name: 'Vietcombank',
            account_number: '12321321321',
            account_name: 'DSADSADSAD',
        },
        note: 'CONCATADCAEAEQ',
        amount: 300000,
        status: status[Math.floor(Math.random() * 3)],
        created_at: '2021-08-08 16:11:11',
        updated_at: '',
    }
    list.push(data)
}
const MockUserHistoryResponse = {
    success: {
        success: true,
        code: 0,
        data: [
            {
                data: list,
                page: 1,
                pages: 2,
                total: 20,
            },
        ],
    },

}

export default MockUserHistoryResponse
