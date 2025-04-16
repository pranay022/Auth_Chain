'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'super-admin',
        role_type:'SUPER_ADMIN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'admin',
        role_type: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'user',
        role_type: 'USER',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'guest',
        role_type: 'GUEST',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};

