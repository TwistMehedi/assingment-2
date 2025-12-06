
export const AuthModel = {
    createUser: `INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, name, email, phone, role`,

    signin: `SELECT id, name, email, password, phone, role FROM users WHERE email = $1`
};