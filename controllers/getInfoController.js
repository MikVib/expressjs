import Auth from "../models/Auth.js"

const getInfo = async (req, res) => {

    try {
        const { userId } = req.user
        const user = await Auth.findById(userId)
        if (!user) {
            return res.status(400).send('User not found')
        }

        const { email, name, verified } = user

        const info = {
            email,
            name,
            verified
        }

        return res.status(200).send(info)


    } catch (e) {
        console.log(e)
        return res.status(500).send('Internal Server Error')
    }

}
export { getInfo }