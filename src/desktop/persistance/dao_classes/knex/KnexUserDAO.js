const AbstractUserDAO = require('../abstract/AbstractUserDAO');

module.exports = class KnexUserDAO extends AbstractUserDAO {
    constructor(connection) {
        super();
        if (connection) {
            this.connection = connection;
        } else {
            throw new Error('missing parameter')
        }
    }
    async insert(user) {
        await this.connection('users').insert(user);
    }
    async selectAll() {
        return await this.connection('users').select('*');
    }
    async selectUserByEmail(email) {
        return await this.connection('users')
            .where('email', email)
            .select('*')
            .first();
    }
    async selectUser(password, email) {
        return await this.connection('users')
            .where('password', password)
            .andWhere('email', email)
            .select('name', 'id')
            .first();
    }
    async deleteUser(userId) {
        return await this.connection('users')
            .where('id', userId)
            .delete();
    }
}