const {admin} = require('../config/firebase-config')

module.exports = async function (req,res,next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied! No Token provided!')
    
    try{
        const decoded = await admin.auth().verifyIdToken(token.split(' ')[1])
        const {name, email_verified, email} = decoded
        
        if(decoded && email_verified) {
            req.user = {name: name, email: email}
            next()
        }
        else {
            res.status(401).send('Unauthorised access')
        }
    }
    catch(ex){
        res.status(500).send(ex.message)
    }
}
