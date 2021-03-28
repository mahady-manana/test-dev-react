import jwt from 'jsonwebtoken';
import config from '../configs/config';
import Bcryptjs from "bcryptjs";
import User from "../models/user.model";

const login = async (req, res) => {

  try {
    let user = await User.findOne({
      "email": req.body.email
    }).exec()
    
    if (!user) {
        return res.status('401').json({
            error: "Adresse email inconnu!"
        })
    }
    if (!Bcryptjs.compareSync(req.body.password, user.password)) {
        return res.json({error : "Mot de passe incorrect!"})      
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 99999
    })

    return res.json({
      token,
      user: {_id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email},
      status : "Authorise"
    })
  } catch (err) {
    console.log(err)
    return res.status('401').json({
      error: "Quelques choses ne va pas!"
    })
  }
}

const logout = (req, res) => {
  res.clearCookie("t")
  return res.status(200).json({
    message: "Sorti avec succes!"
  })
}

export default {
  login,
  logout,
}
