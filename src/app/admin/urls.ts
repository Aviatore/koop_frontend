export const Urls = {
  CreateUserUrl: 'http://localhost:5000/api/auth/signup',
  GetAllUsers: 'http://localhost:5000/api/auth/user/all',
  GetAllFunds: 'http://localhost:5000/api/test/funds',
  CheckEmail: 'http://localhost:5000/api/auth/user/email/check',
  CheckUsername: 'http://localhost:5000/api/auth/user/username/check',
  RemoveUser: 'http://localhost:5000/api/auth/user',
  BaseAuthUrl: 'http://localhost:5000/api/auth',
  GetAllRoles: 'http://localhost:5000/api/auth/roles',
  GetAllCategories: 'http://localhost:5000/api/test/categories',
  GetProductCategories: 'http://localhost:5000/api/test/product/categories', // ?productid=
  GetAllUnits: 'http://localhost:5000/api/test/allUnits',
  GetAllSuppliers: 'http://localhost:5000/api/test/allsuppliers',
  GetAvailAllQuantities: 'http://localhost:5000/api/test/product/availAllQuantities', // ?productid=
  GetProductById: 'http://localhost:5000/api/test/product', // <productid>/get
  UpdateProduct: 'http://localhost:5000/api/test/product/update' // ?productid=
};
