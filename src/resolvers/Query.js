const { getUserId } = require('../utils')

const user = (root, args, { db }, info) =>
    db.query.user({
        where: {
            username: args.username
        }
    }, info)

const comments = async (root, args, { db, request }, info) => {
    const userId = getUserId(request)
    return db.query.comments({
        where: {
            recipient: {
                id: userId
            }
        },
        orderBy: "createdAt_DESC"
    }, info)
}

module.exports = {
    user,
    comments
}