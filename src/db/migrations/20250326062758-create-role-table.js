
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: true,
      },
      role_type:{
        type: Sequelize.ENUM('SUPER_USER', 'ADMIN', 'USER', 'GEST'),
				defaultValue: 'GEST',
				allowNull: true,
      },
    })
  },

  down: async (queryInterface, Sequelize) =>{
    await queryInterface.dropTable('users');
  }

}