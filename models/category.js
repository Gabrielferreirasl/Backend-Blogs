module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Categories' });

  Category.associate = (models) => {
    Category.hasMany(models.PostsCategory);
  };

  return Category;
};