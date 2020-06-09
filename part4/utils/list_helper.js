const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });

  return sum;
};

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];
  blogs.forEach((blog) => {
    if (favorite.likes < blog.likes) {
      favorite = blog;
    }
  });

  return favorite;
};

const mostBlogs = (blogs) => {
  let most = blogs[0];
  blogs.forEach((blog) => {
    if (most.blogs < blog.blogs) {
      most = blog;
    }
  });

  return ({ author:most.author, blogs:most.blogs });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
