module.exports.BatchMessageSender = class BatchMessageSender {
    constructor(clientManager) {
        this.clientManager = clientManager;
    }
    async send(topic, messages) {
        this.messages = Array.from(messages);
        return await this.sendNextMessage(topic, messages);
    }
    async sendNextMessage(topic) {
        const client = await this.clientManager.getClient();
        if (this.messages.length > 0) {
            const message = this.messages.shift();
            let buffer
            try {
                /**
                 * @TODO
                 * If this resolution is really better than a 
                 * callback, client must be wrapped and 
                 * the drain event must be resolve as a promise
                 * resolution.
                 */
                buffer = !client.send(topic, message);
            } catch (error) {
                return Promise.reject(error)
            }
            if (buffer)
                client.once('drain', () => {
                    this.sendNextMessage(topic);
                })
            else
                this.sendNextMessage(topic);
        } else {
            return Promise.resolve(true)
        }
    }
}