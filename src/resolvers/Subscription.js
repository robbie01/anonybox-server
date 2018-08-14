const { getUserId } = require('../utils')

const newCommentSubscribe = async (root, args, { db, connection }, info) => {
    const userId = getUserId(connection.context)
    return db.subscription.comment({
        where: {
            mutation_in: ["CREATED"],
            node: {
                recipient: {
                    id: userId
                }
            }
        }
    }, info)
}

const newComment = {
    subscribe: newCommentSubscribe
}

module.exports = {
    newComment
}