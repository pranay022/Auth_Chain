'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const { roles } = require('../models');

    return roles.findOne({ where: { name: 'super admin' } })
      .then(superAdminRole => {
        return queryInterface.bulkInsert('users', [
          {
            name: 'Super Admin',
            email: 'superAdmin@mail.com',
            role_id: superAdminRole.id,
            password: '$2b$10$4ENEf3dNiaq44NtNNm.7Hez.Gk.wFJxVzFC5rnak2WTSSxnF9Gedi', //Test@123
            is_verifyed: true,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ]);
      });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', { email: 'superAdmin@mail.com' }, {});
  }
};
