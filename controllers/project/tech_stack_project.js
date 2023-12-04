const { Tech_Stack_Icon } = require('../../models');

const checkTechStack = async (id_required) => {
  try {
    const tech_stack_icons = await Tech_Stack_Icon.count({ where: { id: id_required } });

    if (tech_stack_icons === null) throw 'Tech stack not found';
    if (id_required.length !== tech_stack_icons) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { checkTechStack };
