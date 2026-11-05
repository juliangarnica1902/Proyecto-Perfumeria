const { body } = require('express-validator');

exports.productRules = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio.').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),
  body('description').trim().notEmpty().withMessage('La descripción es obligatoria.').bail()
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
  body('category').trim().toLowerCase().isIn(['hombre', 'mujer']).withMessage('Elige una categoría válida (hombre o mujer).'),
  body('price').isInt({ min: 1 }).withMessage('Ingresa un precio válido, mayor que 0.'),
  body('image').custom((value, { req }) => {
    if (req.fileError) throw new Error(req.fileError);
    return true;
  })
];
