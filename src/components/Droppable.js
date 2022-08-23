import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import classes from "./Bookshelf.module.css";
const Droppable = ({ id, items, title }) => {
  const { setNodeRef } = useDroppable({ id });

  const getTitle = (title) => {
    switch (title) {
      case "currentlyReading":
        return "Currently Reading";
      case "wantToRead":
        return "Want To Readg";
      case "read":
        return "Read";

      default:
        return title;
    }
  };
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className={classes["list-books-content"]}>
        <div className={classes["bookshelf"]}>
          {title && (
            <h2 className={classes["bookshelf-title"]}>{getTitle(title)}</h2>
          )}
          <div className={classes["bookshelf-books"]}>
            <ol className={classes["books-grid"]}>
              {items.map((book) => (
                <SortableItem
                  item={book}
                  mode="list"
                  key={book.id}
                  id={book.id}
                />
              ))}
              {items.length === 0 && (
                <div>
                  {title && <p> there is no anyBooks in this shelf.</p>}
                  {!title && (
                    <p> Search by title, author, or ISBN to view more books.</p>
                  )}
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </SortableContext>
  );
};

export default Droppable;
