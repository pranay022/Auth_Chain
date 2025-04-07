const { QueryInterface, Sequelize } = require("sequelize");
const { down } = require("../migrations/20250326062758-create-role-table");

module.exports = { 
  up: (queryInterface, Sequelize ) => {
    return queryInterface.bulkInsert('users', [ {
      name:'Super Admin',
      email: 'superuser@mail.com',
      role_ID: 1,
      password: '',
      status: 'ACTIVE',
      is_verifyed: 'true',
    }])
  },
  down: ( queryInterface, Sequelize ) =>{
    return queryInterface.bulkDelete('users', { eamil : 'superuser@mail.com'}, {});
  }
}