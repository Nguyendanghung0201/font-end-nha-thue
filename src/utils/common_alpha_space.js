const common_alpha_space = {
    validate(value) {
        const regex = /^[A-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]*$/i
        return regex.test(value);
    },
    message(fieldName) {
        return `${fieldName} chỉ gồm chữ và khoảng trắng`;
    },
};

export default common_alpha_space;