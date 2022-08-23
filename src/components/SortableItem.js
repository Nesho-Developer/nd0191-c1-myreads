import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import Book from "./Book";

const SortableItem = ({ item, id, mode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  return (
    <div
      key={item.id}
      style={{ transform, transition, margin: "10px" }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {/* {item} */}
      <Book book={item} mode={mode} />
    </div>
  );
};

export default SortableItem;
