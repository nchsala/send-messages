const promisify = require('util').promisify;
const mqlight = require("mqlight")

module.exports.ClientManager = class ClientManager {

    static createFrom(createClientFn) {
        return new ClientManager(createClientFn);
    }

    constructor(createClientFn) {
        this.createClientFn = createClientFn;
    }

    async send(message) {
        const client = await this.getClient();
        return await client.send(message);
    }

    async getClient() {
        return this.client || await this.createClientFn();;
    }
}