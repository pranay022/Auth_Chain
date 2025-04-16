
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role_type:{
        type: Sequelize.ENUM('SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST'),
				defaultValue: 'GUEST',
				allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.NOW,
      }
    })
  },

  down: async (queryInterface, Sequelize) =>{
    await queryInterface.dropTable('roles');
  }

}