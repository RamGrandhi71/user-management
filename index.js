const express = require('express');
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect("mongodb+srv://abhiramgrandhi:abhirobo@cluster0.0cj5va6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

		const userSchema = new mongoose.Schema({
			name: String,
            username: String,
            age: Number,
            email: String,
            phone: String,
            password: String
})

		const User = mongoose.model('user', userSchema, 'usermanagement');
        module.exports = User;

		function authenticate(requser, user){
	if(requser.password === user.password)
		{
		return true;
	}
		return false;
}

/**
 * @swagger
 * tags:
 *   name: Welcome
 *   description: Welcome message
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a welcome message.
 *     tags: [Welcome]
 *     responses:
 *       200:
 *         description: Welcome message
 */

app.get('/', (req, res) => {
			res.send("Welcome To User Management Backend");
})


/**
 * @swagger
 * tags:
 *   name: Options
 *   description: Backend Options
 */

/**
 * @swagger
 * /:
 *   options:
 *     summary: Backend Options
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: Options for the backend API
 */

app.options('/',(req,res)=>{
			res.send({
				"GET": {
					'/': "returns API home",
					'/getusers': "returns all users"
				},
				"POST": {
					'/register': "register user",
					'/authenticate': "authenticates user"
				},
				"PUT": {
					'/updateuser': "update specified user"
				},
				"DELETE": {
					'/deleteuser': "deletes specified user"
				},
				"OPTIONS": {
					'/': "Backend Options"
				}
			})
		})

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations about users
 */

/**
 * @swagger
 * /getusers:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */

app.get('/getusers', async (req, res) => {
	const users = await User.find({ });
		res.send(users);
})

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */

app.post('/register', async (req, res) => {
	var userdata = req.body;
		var user = new User(userdata);

		await user.save().then(function (user) {
		if (user) {
			console.log(user.name + " saved to user collection.");
		res.send({
			status: 200, 
			message: "User "+user.name+" Created Successfully" });
		}
	}, function (err) {
			console.log(err);
		res.send({status: 500, message: "Internal server error" });
	});
})

/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Authenticate user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal server error
 */

app.post('/authenticate', (req, res) => {
	var requser=req.body;

		User.where({username: requser.username }).findOne().then((user) => {
		if (user) {
			if(authenticate(requser ,user))
		{
			res.send({ status: 200, message: "Authorized" });
			}
		else
		{
			res.send({ status: 401, message: "Not Authorized" });
			}
		}
		else {
			res.send({ status: 500, message: "User Not Found" });
		}
	}).catch(function (err) {
			res.send({ status: 500, message: 'Internal Server Error' });
	});
})

/**
 * @swagger
 * /updateuser:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 */

app.put('/updateuser', async (req, res) => {
	var userdata = req.body;

		User.where({username: userdata.username }).findOne().then((user) => {
		if (user) {
			User.where({ username: userdata.username })
				.updateOne({ 
					name: userdata.name, 
					age: userdata.age, 
					email: userdata.email, 
					phone: userdata.phone, 
					password: userdata.password 
				}).then(function (user) {
				if (user) {
					User.where({ username: userdata.username })
						.findOne().then((user) => {
						res.send({ 
							status: 200, 
							newuser: user, 
							message: "User Updated Successfully"
						});
					})
				}
			}, function (err) {
				console.log(err);
				res.send({ status: 500, message: "Internal server error" });
			});
		}
		else {
			res.send({ status: 500, message: "User Not Found" });
		}
	}).catch(function (err) {
			res.send({ status: 500, message: 'Internal Server Error' });
	});
})

/**
 * @swagger
 * /deleteuser:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */

app.delete('/deleteuser', async (req, res) => {
	var username = req.body.username;

		User.where({username: username }).findOne().then((user) => {
		if (user) {
			User.where({ username: username })
				.deleteOne().then(function (del) {
				if (del.deletedCount === 1) {
					res.send({ 
						status: 200, 
						message: "User Deleted Successfully"
					});
				}
			}, function (err) {
				console.log(err);
				res.send({ status: 500, message: "Internal server error" });
			});
		}
		else {
			res.send({ status: 500, message: "User Not Found" });
		}
	}).catch(function (err) {
			res.send({ status: 500, message: 'Internal Server Error' });
	});
})

app.listen(port, () => {
			console.log("Server started at port " + port);
})

