const database = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await database('incidents').count();

    const incidents = await database('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json({ incidents });
  },

  async show(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await database('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.json({ incidents });
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await database('incidents').insert({
      ong_id,
      title,
      description,
      value
    });

    return res.json({
      id
    });
  },

  // async update(req, res) {},

  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const [incident] = await database('incidents')
      .where('id', id)
      .select('ong_id');

    if (incident.ong_id !== ong_id) {
      return res.status(401).send();
    }

    await database('incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  }
};
