const mqlight = require('mqlight');
const client = mqlight.createClient({ service: 'amqp://localhost', user: "guest", password: "guest" });
const topic = "TEST.QUEUE.TOP"
const testMessages = Array.from({ length: 10 }, (_, i) => `Message ${i}`);
client.on('started', async () => {
    console.log('Started');
    const batchMessageSender = new BatchMessageSender(client);
    await batchMessageSender.send(topic, testMessages);
    process.exit(0);
});

class BatchMessageSender {
    constructor(client) {
        this.client = client;
    }
    async send(topic, messages) {
        this.messages = Array.from(messages);
        return await this.sendNextMessage(topic, messages);
    }
    async sendNextMessage(topic) {
        if (this.messages.length > 0) {
            const message = this.messages.shift();
            let buffer
            try {
                buffer = !this.client.send(topic, message);
            } catch (error) {
                return Promise.reject(error)
            }
            if (buffer)
                this.client.once('drain', () => {
                    this.sendNextMessage(topic);
                })
            else
                this.sendNextMessage(topic);
        } else {
            return Promise.resolve(true)
        }
    }
}