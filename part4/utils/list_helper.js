const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let sum=0;
    blogs.forEach(blog => {
        sum += blog.likes;
    });

    return sum;
}

const favoriteBlog = (blogs) => {
    let favorite=blogs[0];
    blogs.forEach(blog => {
        if(favorite.likes<blog.likes){
            favorite=blog;
        }
    });

    return favorite;
}



  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}