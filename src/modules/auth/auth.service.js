import { User } from "../../db/models/user.model.js";
import { 
    asyncHandler,
    compare,
    encrypt,
    generaToken,
    hash,
    sendEmail,
    verify
 } 
from "../../utils/index.js";

export const register = async (req, res, next) => {
    // get data from req?
    const { userName, email, password, phone } = req.body;

    // create user
    const createdUser = await User.create({
        userName,
        email,
        password:hash({password}),
        phone: encrypt({data: phone}),        
    });

    // link >> server
    const token = generaToken({payload: { id: createdUser._id },
    options: { expiresIn: "15m" }
    })
   
    const link = `http://localhost:3000/auth/activate-account/${token}`;
    const isSent = await sendEmail({
        to: email,
        subject: "Verify Account",
        html: `<p>To verify your account, please click the link below:</p>
                   <a href="${link}">${link}</a>`
    });

    if (!isSent)
        return next(new Error("email not sent plz try agail", { cause: 500 }));
    // send response
    return res.status(201).json({
        success: true,
        message: "user created successfully",
        data: createdUser,
    });

};

export const login = asyncHandler(async (req, res, next) => {
    //get data from req
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
        return next(new Error("email not found", { cause: 401 }));
    }
    //check password
    if (!userExist.isConfirmed)
        return next(new Error("plz verify account first", { cause: 400 }));

  
    if(userExist.isDeleted == true){
        await User.updateOne({_id: userExist._id},{isDeleted: false});
    }
    const match = compare({password, hashedPassword:userExist.password});
    if (!match) {
        return next(new Error("invalid password", { cause: 401 }));
        

    }
    // generate token

    const token = generaToken({payload:{ email, id: userExist._id },
    options:{ expiresIn: "1h" }
 });
    // send response
    return res.status(200).json({
        success: true,
        message: "login successfully",
        token, // http req>> stateless
    });
    

});

export const activateAccount = asyncHandler(async (req, res, next) => {

    const { token } = req.params;
    const { id, error } = verify({token});
    if(error) return next(error)
    // jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findByIdAndUpdate(id, { isConfirmed: true });
    if (!user)
        return next(new Error("user not found", { cause: 404 }));
    return res.status(200).json({
        success: true,
        message: "congratulations, plz login",
    });

});