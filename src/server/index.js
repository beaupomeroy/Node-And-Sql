const express = require("express");
const cors = require("cors");
const { isAuthenticated } = require("./middleware/isAuthenticated");

const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");
const {
	getAllPosts,
	getCurrentUserPosts,
	addPost,
	editPost,
	deletePost,
} = require("./controllers/posts");

const app = express();

const PORT = process.env.PORT || 4005;

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);

const { register, login } = require("./controllers/auth");

app.post("/register", register);
app.post("/login", login);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () =>
			console.log(`db sync successful & server running on port ${PORT}`)
		);
	})
	.catch((err) => console.log(err));
