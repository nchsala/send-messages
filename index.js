const { BatchMessageSender } = require("./class/BatchMessageSender");
const { ClientManager } = require("./class/ClientManager");
const { MqLightWrapper } = require("./class/MqLightClient");

(async function(){
    const topic = "TEST.QUEUE.TOP"
    const testMessages = Array.from({ length: 10000 }, (_, i) => `Message ${i}`);
    const clientManager = ClientManager.create({ service: 'amqp://localhost'})
    const mqLightWrapper = new MqLightWrapper(clientManager);
    const batchMessageSender = new BatchMessageSender(mqLightWrapper);
    await batchMessageSender.send(topic, testMessages);
    console.log("Mensajes enviados");
    process.exit(0);
})()