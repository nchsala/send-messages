const promisify = require('util').promisify;
const mqlight = require("mqlight")

module.exports.ClientManager = class ClientManager {

    static create(options) {
        const createClient = promisify(mqlight.createClient);
        const pendingClientConection = createClient(options);
        return new ClientManager(pendingClientConection);
    }

    constructor(pendingClientConnection) {
        this.pendingClientConnection = pendingClientConnection;
    }

    async send(message) {
        const client = await this.getClient();
        return await client.send(message);
    }

    async getClient() {
        return await this.pendingClientConnection
    }
}