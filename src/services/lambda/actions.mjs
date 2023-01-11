import AWS from "aws-sdk";
let NAMES_DB = {};

const ENDPOINT = "0ofeqz0qw0.execute-api.us-east-1.amazonaws.com/production/";
const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });

const sendToOne = async (id, body) => {
  try {
    await client
      .postToConnection({
        ConnectionId: id,
        Data: Buffer.from(JSON.stringify(body)),
      })
      .promise();
  } catch (err) {
    console.error(err);
  }
};

const sendToAll = async (ids, body) => {
  const all = ids.map((i) => sendToOne(i, body));
  return Promise.all(all);
};

export const $connect = async () => {
  return {};
};

export const setName = async (payload, connectionId) => {
  NAMES_DB[connectionId] = payload.name;
  await sendToAll(Object.keys(NAMES_DB), { members: NAMES_DB });
  await sendToAll(Object.keys(NAMES_DB), {
    systemMessage: `${NAMES_DB[connectionId]} has joined the chat`,
  });
  return {};
};

export const sendPublic = async (payload, connectionId) => {
  await sendToAll(Object.keys(NAMES_DB), {
    publicMessage: {
      id: connectionId,
      message: payload.message,
    },
  });
  return {};
};

export const sendPrivate = async (payload, connectionId) => {
  const to = Object.keys(NAMES_DB).find((key) => NAMES_DB[key] === payload.to);
  await sendToOne(to, {
    privateMessage: {
      id: connectionId,
      message: payload.message,
    },
  });
  return {};
};

export const $disconnect = async (payload, connectionId) => {
  await sendToAll(Object.keys(NAMES_DB), {
    systemMessage: `${NAMES_DB[connectionId]} has left the chat`,
  });
  delete NAMES_DB[connectionId];
  await sendToAll(Object.keys(NAMES_DB), { members: Object.values(NAMES_DB) });
  return {};
};
