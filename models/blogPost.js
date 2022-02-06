module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  }, { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User);
  };

  return BlogPost;
};