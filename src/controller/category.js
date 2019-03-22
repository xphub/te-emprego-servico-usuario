const Category = require('@model/category');
const logger = require('@service/logger');

/**
 * Adds a new category
 * @error E10001
 * @param {Request} req express request object
 * @param {Response} res express response object
 */
const create = async (req, res) => {
  const E_CODE = 'E10001';
  const { title, description } = req.body;
  const category = new Category({ title, description });

  await category.save((err, category) => {
    if (err) {
      logger
        .error(err.message || err, { key: E_CODE, date: Date.now() });
      return res
        .status(500)
        .send({
          message: 'Erro interno do servidor.',
          code: E_CODE,
        });
    }
    logger.info(`Nova categoria adicionada: ${category.title}`);
    res
      .status(201)
      .send({
        message: 'Categoria criada com sucesso',
        category,
      });
  });
};

/**
 * Lists all available categories
 * @error E10002
 * @param {Request} req express request object
 * @param {Response} res express response object
 */
const read = async (req, res) => {
  const E_CODE = 'E10002';
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res
      .status(500)
      .send({
        message: 'Erro interno no servidor.',
        code: E_CODE,
      });
  }
};

module.exports = {
  create,
  read,
};
