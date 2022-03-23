module.exports.BatchMessageSender = class BatchMessageSender {
    constructor(clientManager) {
        this.clientManager = clientManager;
    }
    
    async send(topic, originalMessages) {
        const messages = Array.from(originalMessages);
        const client = await this.clientManager
        while (messages.length) {
            const message = messages.pop();
            await client.send(topic, message)
        }
    }
}

