const crypto = require('crypto');
const database = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await database('ongs').select('*');

    return res.json({ ongs });
  },

  // async show(req, res) {},

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await database('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({
      id
    });
  }

  // async update(req, res) {},

  // async destroy(req, res) {}
};
