const createBookRules = ({ localBook, isEdit, checkBookExist }) => {
  return {
    MASACH: [
      {
        required: true,
        message: 'Mã sách không được để trống',
        trigger: ['blur', 'input'],
      },
      {
        validator: async (rule, value) => {
          if (!value || isEdit) return Promise.resolve();
          const existed = await checkBookExist(value);
          if (existed) return Promise.reject('Mã sách đã tồn tại');
          return Promise.resolve();
        },
        trigger: ['blur', 'input'],
      },
    ],
    TENSACH: [
      {
        required: true,
        message: 'Tên sách không được để trống',
        trigger: ['blur', 'input'],
      },
    ],
    SOQUYEN: [
      {
        validator: (rule, value) => {
          if (!value && value !== 0) return Promise.reject('Số lượng không được để trống');
          if (isNaN(value)) return Promise.reject('Số lượng phải là số');
          if (value <= 0) return Promise.reject('Số lượng phải lớn hơn 0');
          return Promise.resolve();
        },
        trigger: ['blur', 'input'],
      },
    ],
    DONGIA: [
      {
        validator: (rule, value) => {
          if (!value && value !== 0) return Promise.reject('Đơn giá không được để trống');
          if (isNaN(value)) return Promise.reject('Đơn giá phải là số');
          if (value < 0) return Promise.reject('Đơn giá phải lớn hơn 0');
          return Promise.resolve();
        },
        trigger: ['blur', 'input'],
      },
    ],
    CONLAI: [
      {
        validator: (rule, value) => {
          if (!value && value !== 0) return Promise.reject('Số lượng còn lại không được để trống');
          if (isNaN(value)) return Promise.reject('Số lượng còn lại phải là số');
          if (Number(value) > Number(localBook.value.SOQUYEN)) {
            return Promise.reject('Số lượng còn lại không hợp lệ');
          };
          return Promise.resolve();
        },
        trigger: ['blur', 'input'],
      },
    ],
  }
}

export default createBookRules;