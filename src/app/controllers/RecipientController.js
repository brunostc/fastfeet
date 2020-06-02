import * as Yup from 'yup';
import Recipient from '../models/Recipient';

// import Recepient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(8, 'Must be exactly 8 digits')
        .max(8, 'Must be exactly 8 digits'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed, please fill the fields correctly.',
      });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res
        .status(400)
        .json({ error: 'Recipient with this name already registered.' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(8, 'Must be exactly 8 digits')
        .max(8, 'Must be exactly 8 digits'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation failed, please fill the fields correctly.',
      });
    }

    const { street, number, complement } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (req.body.name) {
      const recipientExists = await Recipient.findOne({
        where: { name: req.body.name },
      });

      if (recipientExists) {
        return res
          .status(400)
          .json({ error: 'Recipient with this name already registered.' });
      }
    }

    const { name, state, city, zip_code } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
