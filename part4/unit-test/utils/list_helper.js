const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 1) return blogs[0].likes
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let maxBlogLike = blogs[0];
  blogs.forEach(blog => { if (blog.likes > maxBlogLike.likes) maxBlogLike = blog; })
  return maxBlogLike;
}


const mostBlogs = (blogs) => {


  let authorHash = {};



  blogs.forEach(blog => {
    authorHash[blog.author] = (authorHash[blog.author] || 0) + 1;
  })

  let maxBlogs = 0;
  let topAuthor = null;

  for(const author in authorHash){
    if(authorHash[author] > maxBlogs) {
      maxBlogs = authorHash[author]
      topAuthor=author;

    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  };

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likeCounts = {};

  // Sum likes per author
  blogs.forEach(blog => {
    likeCounts[blog.author] = (likeCounts[blog.author] || 0) + blog.likes;
  });

  // Find the author with the most likes
  let topAuthor = null;
  let maxLikes = 0;

  for (const author in likeCounts) {
    if (likeCounts[author] > maxLikes) {
      topAuthor = author;
      maxLikes = likeCounts[author];
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}



