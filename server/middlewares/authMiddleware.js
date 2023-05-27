const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        //req.headers matlab ema request no header hase 
        //req.headers['authorization'] is accessing the value of the "Authorization" header
        //aama kevu hoy k aapde je header ma aave e Bearer token aavu hoy etla mate first aapde
        //split karyu etle e array return karse jema first keyword Bearer hase ane second keyword
        //aapdo token hase so aapde tene index1([1]) thi access karyu
        // console.log(req.headers['authorization']);
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        // console.log(token);
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log(err);
                return res.status(200).send({ message: 'Auth Failed', success: false });
            }
            else {
                req.body.userId = decode.id;
                console.log(decode);
                //next no matlab e aa function ma thi bahar nikdse 
                //jo next  lakhsu j nahi to e aa function ma thi bahar jay j nai ane atki jase
                //means home page par jai j nai sake
                next();
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: 'Auth Failed', success: false });

    }
}