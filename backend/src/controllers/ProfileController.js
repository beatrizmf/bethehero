const database = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await database('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.json({ incidents });
  }

  // async show(req, res) {},

  // async store(req, res) {},

  // async update(req, res) {},

  // async destroy(req, res) {}
};
