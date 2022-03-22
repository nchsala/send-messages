const { BatchMessageSender } = require("./class/BatchManager");
const { ClientManager } = require("./class/ClientManager");

(async function(){
    const topic = "TEST.QUEUE.TOP"
    const testMessages = Array.from({ length: 100 }, (_, i) => `Message ${i}`);
    const clientManager = ClientManager.fromMqLight({ service: 'amqp://localhost'})
    const batchMessageSender = new BatchMessageSender(clientManager);
    await batchMessageSender.send(topic, testMessages);
    return;
})()