export const httpErrors = {
  // common
  QUERY_INVALID: {
    message: 'Query params không hợp lệ',
    code: 'COMMON_0001',
  },
  // user
  USER_NOT_FOUND: {
    message: 'Email không tồn tại',
    code: 'USER_1001',
  },
  EMAIL_EXISTED: {
    message: 'Địa chỉ email đã tồn tại',
    code: 'USER_0002',
  },
  PHONE_EXISTED: {
    message: 'Số điện thoại đã tồn tại',
    code: 'USER_0003',
  },
  PASSWORD_INCORRECT: {
    message: 'Mật khẩu không chính xác',
    code: 'USER_0003',
  },
  TOKEN_EXPIRED: {
    message: 'Token đã hết hạn',
    code: 'USER_0004',
  },
  TOKEN_INVALID: {
    message: 'Token không hợp lệ',
    code: 'USER_0005',
  },
  // brand
  BRAND_EXIST: {
    message: 'Tên thương hiệu đã tồn tại',
    code: 'BRAND_0001',
  },
  BRAND_ADD_SUCCESS: {
    message: 'Thêm thương hiệu thành công',
    code: 'BRAND_0002',
  },
  BRAND_NOT_FOUND: {
    message: 'Thương hiệu không tồn tại',
    code: 'BRAND_0003',
  },
  // category
  CATEGORY_EXIST: {
    message: 'Tên danh mục đã tồn tại',
    code: 'CATEGORY_0001',
  },
  CATEGORY_ADD_SUCCESS: {
    message: 'Thêm danh mục thành công',
    code: 'CATEGORY_0002',
  },
  CATEGORY_NOT_FOUND: {
    message: 'Danh mục không tồn tại',
    code: 'CATEGORY_0003',
  },

  // typeship
  TYPE_SHIP_EXIST: {
    message: 'Tên loại phí đã tồn tại',
    code: 'TYPESHIP_0001',
  },
  TYPE_SHIP_ADD_SUCCESS: {
    message: 'Thêm loại phí thành công',
    code: 'TYPESHIP_0002',
  },
  // voucher
  VOUCHER_ADD_TYPE_SUCCESS: {
    message: 'Thêm loại voucher thành công',
    code: 'VOUCHER_0001',
  },
  VOUCHER_ADD_CODE_SUCCESS: {
    message: 'Thêm mã voucher thành công',
    code: 'VOUCHER_0002',
  },

  //product
  PRODUCT_ADD_SUCCESS: {
    message: 'Thêm  sản phẩm thành công',
    code: 'PRODUCT_0001',
  },
  PRODUCT_NOT_FOUND: {
    message: 'Sản phẩm không tồn tại',
    code: 'PRODUCT_0002',
  },
  PRODUCT_UPDATE_FAILED: {
    message: 'Cập nhật sản phẩm thất bại',
    code: 'PRODUCT_0003',
  },
  // shopcart
  SHOPCART_ADD_SUCCESS: {
    message: 'Thêm sản phẩm vào giỏ hàng thành công',
    code: 'SHOPCART_0001',
  },
  SHOPCART_ADD_FAIL: {
    message: 'Số lượng sản phẩm không đủ',
    code: 'SHOPCART_0002',
  },
};
