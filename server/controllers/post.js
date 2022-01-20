const pool = require('../db/')

const getUserPosts = async (req, res) => {
  const loggedUserId = req.user.id
  const { userId } = req.params
  const { current } = req.body
  try {
    const stmt1 =
      'SELECT posts.*, username, first_name, last_name, profile_pic, like_id FROM posts INNER JOIN users ON posts.posted_by = users.user_id LEFT JOIN likes ON likes.post_id = posts.post_id AND likes.user_id = $1 WHERE posted_by = $2'
    const stmt2 = ' ORDER BY posts.post_id desc LIMIT 5'
    let query = null
    const values = [loggedUserId, userId]
    if (current > 0) {
      query = stmt1 + ' AND posts.post_id < $3' + stmt2
      values.push(current)
    } else query = stmt1 + stmt2
    const result = await pool.query(query, values)
    const posts = {
      contents: {},
      ids: []
    }
    const users = {}
    result.rows.forEach((post) => {
      posts.contents[post.post_id] = {
        caption: post.caption,
        images: post.image_urls,
        timestamp: post.posted_on,
        likes: post.like_count,
        comments: post.comment_count,
        commentIds: [],
        author: post.posted_by,
        liked: post.like_id || false
      }
      posts.ids.push(post.post_id)
      if (!(post.posted_by in users)) {
        users[post.posted_by] = {
          username: post.username,
          firstname: post.first_name,
          lastname: post.last_name,
          avatar: post.profile_pic
        }
      }
    })
    return res.status(200).json({ posts, users, comments: [] })
  } catch (err) {
    return res
      .status(500)
      .json({ message: ' There was an error while fetching posts. Please try again later.' })
  }
}


module.exports = {
  getUserPosts
}
