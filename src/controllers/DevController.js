const api = require('../services/api');
const Dev = require('../models/Dev');

module.exports = {
	async index(req, res) {
		const { user } = req.headers;
		const loggedDev = await Dev.find();

		const users = await Dev.find({
			$and: [{ _id: { $ne: user } }, { _id: { $nin: loggedDev.likes } }, { _id: { $nin: loggedDev.dislikes } }]
		});

		res.json(users);
	},

	async store(req, res) {
		const { username: user } = req.body;

		const userExists = await Dev.findOne({ user });

		if (userExists) return res.json(userExists);

		let dev = {};
		try {
			const response = await api.get(`/users/${user}`);
			const { name, bio, avatar_url: avatar } = response.data;
			console.log(response.data);
			dev = await Dev.create({
				name,
				user,
				bio,
				avatar
			});
		} catch (error) {
			console.error(error);
		}

		return res.json(dev);
	}
};
