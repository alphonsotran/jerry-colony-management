const models = require('../../db/models');

afterAll(() => models.sequelize.close());
