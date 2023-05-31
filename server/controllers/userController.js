const User = require("../models/User")


// Method: POST
// Required : firstName, lastName, mobile, address
// Return : Success Message
exports.registerUser = async (req, res) => {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.mobile || !req.body.address) {
            return res.status(400).json({
                message: "all fields required"
            })
        }
        await User.create(req.body)

        res.status(201).json({
            message: "User Created Successfully"
        })

    } catch (error) {
        res.status(400).json({ message: "something went wrong " + error, error })
    }
}

// Method: GET
// Required : Nothing
// Return : Array of Users
exports.getUsers = async (req, res) => {
    try {

        const result = await User.find().select("firstName lastName mobile _id address")

        res.status(201).json({
            message: "User Fetched Successfully",
            result
        })

    } catch (error) {
        res.json({ message: "something went wrong", error })
    }

}

// Method: PUT
// Required : userId 
// Return : Success Message
exports.updateUser = async (req, res) => {
    try {

        const result = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true
        })

        res.status(201).json({
            message: "User Updated Successfully",
        })

    } catch (error) {
        res.json({ message: "something went wrong " + error, error })
    }

}

// Method: DELETE
// Required : userId 
// Return : Success Message
exports.deleteUser = async (req, res) => {
    try {

        const result = await User.findByIdAndDelete(req.params.userId)

        res.status(201).json({
            message: "User deleted Successfully",
            result
        })
    } catch (error) {
        res.json({ message: "something went wrong", error })
    }

}

