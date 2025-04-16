
module.exports = { 
  up: (queryInterface, Sequelize ) => {
    return queryInterface.bulkInsert('users', [ {
      name:'Super Admin',
      email: 'superuser@mail.com',
      role_id: 1,
      password: 'Test@123',
      status: 'ACTIVE', 
      is_verifyed: 'true',
      created_at: new Date(),
      updated_at: new Date(),
    }])
  },
  down: ( queryInterface, Sequelize ) =>{
    return queryInterface.bulkDelete('users', { email : 'superuser@mail.com'}, {});
  }
}