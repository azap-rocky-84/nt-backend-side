import User from "../models/User";
export const registerUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user){
           //  return res.status(400).json({message: "Che fai? Sei già registrato!"});
           throw new Error("Che fai? Sei già registrato!");
        }
        user = await User.create({
            name, email, password,
        });
        return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJWT(),
        });
    } catch (error) {
        next(error);
    }
}
export {registerUser};