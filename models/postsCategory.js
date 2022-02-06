module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  });

  PostCategory.associate = (models) => {
  PostCategory.belongsTo(models.BlogPost);

    PostCategory.belongsTo(models.Category);
  };

  return PostCategory;
};