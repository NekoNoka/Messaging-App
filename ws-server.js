const wss = {
  Server: undefined,
  connections: [],
  tokens: {}
};

module.exports = wss;

// process.on('exit', () => connections.forEach(user => user?.ws?.close()));
// process.on('SIGINT', () => process.exit());

/*

send messages
live messages
direct messages

channels?
channel state change

friends? - contacts - saved gmail contacts
join leave - updating online statuses of people
updating statuses of people

spam protection

*/
