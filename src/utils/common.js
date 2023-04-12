const common = {
    validate(value) {
        const regex = /^([^<>])[0-9A-Z\s@&$-_()~!%+sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]*$/ig
        return regex.test(value);
    },
    message(fieldName) {
        return `${fieldName} chỉ gồm chữ, số và các kí tự (@&$-_)`;
    },
};

export default common;