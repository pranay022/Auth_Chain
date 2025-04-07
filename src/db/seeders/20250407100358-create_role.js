'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'super-admin',
        role_type:'SUPER_ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'admin',
        role_type: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user',
        role_type: 'USER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'guest',
        role_type: 'GUEST',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};



module.exports = {
  up:( queryInterface,  Sequelize) => {
    return queryInterface.bulkInsert( 'roles', [
      {
        name: 'Super admin',
        role_type : 'SUPER_ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  down: (queryInterface, Sequelize) =>{
    return queryInterface.bulkDelete('roles', null, {});
  }
}