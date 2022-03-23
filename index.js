const { BatchMessageSender } = require("./class/BatchMessageSender");
const { ClientManager } = require("./class/ClientManager");
const { MqLightWrapper } = require("./class/MqLightClient");
const promisify = require('util').promisify;
const mqlight = require("mqlight");
const clientManager = ClientManager.createFrom(
    async () => promisify(mqlight.createClient)({
        service: "amqp://localhost"
    })
);

(async function () {
    const mqLightWrapper = new MqLightWrapper(clientManager);
    const batchMessageSender = new BatchMessageSender(mqLightWrapper);

    const topic = "TEST.QUEUE.TOP"
    const testMessages = Array.from({ length: 10000 }, (_, i) => `Message ${i}`);

    await batchMessageSender.send(topic, testMessages);
    console.log("Mensajes enviados");
    process.exit(0);
})()