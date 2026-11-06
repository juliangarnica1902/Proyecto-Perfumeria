const { body } = require('express-validator');
const db = require('../database/models');
const { suggestDomain, domainExists } = require('../helpers/emailCheck');

const imageRule = body('image').custom((value, { req }) => {
  if (req.fileError) throw new Error(req.fileError);
  return true;
});

exports.registerRules = [
  body('firstName').trim().notEmpty().withMessage('El nombre es obligatorio.').bail()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.'),
  body('lastName').trim().notEmpty().withMessage('El apellido es obligatorio.').bail()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres.'),
  body('email').trim().toLowerCase().notEmpty().withMessage('El correo es obligatorio.').bail()
    .isEmail().withMessage('Ingresa un correo válido, por ejemplo tucorreo@ejemplo.com.').bail()
    .custom(async (email) => {
      const [user, domain] = email.split('@');
      const suggestion = suggestDomain(domain);
      if (suggestion) throw new Error(`¿Quisiste decir ${user}@${suggestion}? Revisa cómo escribiste el correo.`);
      if (!(await domainExists(domain))) throw new Error('El dominio del correo no existe. Revisa que esté bien escrito.');
      return true;
    }).bail()
    .custom(async (email) => {
      if (await db.User.findOne({ where: { email } })) throw new Error('Ese correo ya está registrado.');
      return true;
    }),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').bail()
    .matches(/[a-z]/).withMessage('La contraseña debe incluir una letra minúscula.').bail()
    .matches(/[A-Z]/).withMessage('La contraseña debe incluir una letra mayúscula.').bail()
    .matches(/\d/).withMessage('La contraseña debe incluir un número.').bail()
    .matches(/[^A-Za-z0-9]/).withMessage('La contraseña debe incluir un carácter especial (por ejemplo ! # $ .).'),
  body('password2').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Las contraseñas no coinciden.');
    return true;
  }),
  imageRule
];

exports.loginRules = [
  body('email').trim().toLowerCase().notEmpty().withMessage('El correo es obligatorio.').bail()
    .isEmail().withMessage('Ingresa un correo válido, por ejemplo tucorreo@ejemplo.com.').bail()
    .custom(async (email) => {
      if (!(await db.User.findOne({ where: { email } }))) throw new Error('No existe una cuenta con ese correo.');
      return true;
    }),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.')
];
