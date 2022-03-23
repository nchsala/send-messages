module.exports.MqLightWrapper = class MqLightWrapper {
    constructor(clientManager) {
        this.clientManager = clientManager;
    }

    async send(topic, message) {
        const client = await this.clientManager.getClient();
        return new Promise((resolve, reject) => {
            let buffer
            try {
                buffer = !client.send(topic, message);
                if (buffer)
                    client.once('drain', () => {
                        resolve(true)
                    })
                else
                    resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}