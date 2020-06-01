import * as Yup from 'yup';
import Recepient from '../models/Recepient';

// import Recepient from '../models/Recipient';

class RecepientController {
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

    // const recepientExists = await Recepient.findOne({
    //   where: { name: req.body.name },
    // });

    // if (recepientExists) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Recipient with this name already registered.' });
    // }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recepient.create(req.body);

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

export default new RecepientController();
