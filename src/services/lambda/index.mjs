import { $connect, $disconnect, setName, sendPublic, sendPrivate } from './actions.mjs';

export const handler = async (event, context) => {
  if (!event.requestContext) {
    return {};
  }

  try {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    const body = JSON.parse(event.body || '{}');

    switch (routeKey) {
      case '$connect':
        await $connect()
        break;
      case '$disconnect':
        await $disconnect(body, connectionId)
        break;
      case 'setName':
        await setName(body, connectionId)
        break;
      case 'sendPublic':
        await sendPublic(body, connectionId)
        break;
      case 'sendPrivate':
        await sendPrivate(body, connectionId)
        break;
    }
  } catch (err) {
    console.error(err);
  }

  return {};
};