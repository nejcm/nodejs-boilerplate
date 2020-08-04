import {EventDispatcher as EventDispatcherClass} from 'event-dispatch';
import {Container, Handler} from 'typedi';

export function EventDispatcher() {
  return (
    object: Handler['object'],
    propertyName: string,
    index?: number,
  ): void => {
    const eventDispatcher = new EventDispatcherClass();
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => eventDispatcher,
    });
  };
}

export {EventDispatcher as EventDispatcherInterface} from 'event-dispatch';
