import "./panel.css";
import { useDrag, useDrop } from "react-dnd";

function Panel({ colors, color, index, handleMoveColor }) {
  const [{ isDragging }, drag] = useDrag({
    type: "COLOR_PANEL",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COLOR_PANEL",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        handleMoveColor(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <section
      ref={(panel) => {
        drag(drop(panel));
      }}
      className="panel"
      style={{ backgroundColor: color, opacity: isDragging ? 0 : 1 }}
    ></section>
  );
}

export default Panel;
