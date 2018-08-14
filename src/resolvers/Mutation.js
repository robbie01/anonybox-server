const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const post = (root, args, { db }, info) =>
    db.mutation.createComment({
        data: {
            text: args.text,
            recipient: {
                connect: {
                    id: args.userId
                }
            }
        }
    }, info)

const signup = async (root, args, { db }, info) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await db.mutation.createUser({
        data: { ...args, password }
    }, `{ id }`)
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    return {
        token,
        user
    }
}

const login = async (root, args, { db }, info) => {
    const user = await db.query.user({
        where: {
            username: args.username
        }
    }, `{ id password }`)
    if (!user) {
        throw new Error('Unknown username')
    }
    const validPass = await bcrypt.compare(args.password, user.password)
    if (!validPass) {
        throw new Error('Incorrect password')
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    return {
        token,
        user
    }
}

module.exports = {
    post,
    signup,
    login
}