import { useEffect, useState } from "react";
import SearchButton from "../components/SearchButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove, insertAtIndex, removeAtIndex } from "../utils/array";
import Droppable from "../components/Droppable";
import Bookshelf from "../components/Bookshelf";
import { bookActions } from "../store/BooksSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { readingBooks, wantBooks, finishedBooks, loading } = useSelector(
    (state) => state.books
  );

  const [items, setItems] = useState({
    currentlyReading: [...readingBooks],
    wantToRead: [...wantBooks],
    read: [...finishedBooks],
  });

  useEffect(() => {
    setItems({
      currentlyReading: [...readingBooks],
      wantToRead: [...wantBooks],
      read: [...finishedBooks],
    });
  }, [readingBooks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = (e) => {
    const { over, active } = e;
    // console.log("e", active);
    // console.log("active", active);
    // console.log("over", over);
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;
    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const item = items[activeContainer].find((i) => i.id === active.id);
      // console.log("drag-over");
      updateShelf({ item, overContainer });
      setItems((items) => {
        const activeIndex = active.data.current?.sortable?.index;
        const overIndex = over.data.current?.sortable.index || 0;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          item
        );
      });
    }
  };

  const updateShelf = (book, shelf) => {
    dispatch(bookActions.updateBooks({ book, shelf }));
  };

  const handleDragEnd = (data) => {
    const { active, over } = data;
    // console.log("--------------------------");
    // console.log("active", active);
    // console.log("over", over.id, over.data.current?.sortable.containerId);
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          const item = items[activeContainer].find(
            (element) => element.id === active.id
          );
          updateShelf(item, overContainer);
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            item
          );
        }

        return newItems;
      });
    }
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      {
        <div className="list-books">
          {Object.keys(items).map((group) => (
            <div key={group}>
              <Droppable
                title={group}
                id={group}
                items={items[group]}
                key={group}
              />
            </div>
          ))}

          <SearchButton />
        </div>
      }
      {loading && <p>Loading ...</p>}
    </DndContext>
  );
};

export default Home;
