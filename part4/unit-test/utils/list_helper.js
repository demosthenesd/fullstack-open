const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if (blogs.length === 1) return blogs[0].likes
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}


const favoriteBlog = (blogs)=> {

  const maxLikes = 0;



  blogs.forEach(blog =>{
    if(blog.like > maxLikes) maxLikes = blog.like;
  })

  return {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  } ;


}






module.exports = {
  dummy, totalLikes,favoriteBlog
}
