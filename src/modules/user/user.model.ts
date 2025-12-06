

export const UserModel = {
    users: `SELECT * FROM users`,
    deleteUser: `DELETE FROM users WHERE id = $1`
}