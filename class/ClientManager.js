const promisify = require('util').promisify;
const mqlight = require("mqlight")

module.exports.ClientManager = class ClientManager {

    static fromMqLight(options) {
        const createClient = promisify(mqlight.createClient);
        const pendingClientConection = createClient(options);
        return new ClientManager(pendingClientConection);
    }

    constructor(pendingClientConnection) {
        this.pendingClientConnection = pendingClientConnection;
    }

    async getClient() {
        return await this.pendingClientConnection
    }
}