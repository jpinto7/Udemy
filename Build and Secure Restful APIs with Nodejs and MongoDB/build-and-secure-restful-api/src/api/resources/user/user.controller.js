import Joi from '@hapi/joi';
import User from './user.model';
import userService from './user.service';

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const user = await User.create(value);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
