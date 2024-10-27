import { useDraggable } from '@dnd-kit/core';
import { PropsWithChildren } from 'react';

type TDraggableProps<T> = PropsWithChildren & {
  id: number;
  element?: React.ElementType;
  data?: T;
};

export const Draggable = <T,>(props: TDraggableProps<T>): JSX.Element => {
  const Element = props.element || 'div';

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: props.data ?? undefined,
  });

  return (
    <Element ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </Element>
  );
};
