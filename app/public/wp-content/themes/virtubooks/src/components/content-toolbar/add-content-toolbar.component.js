import AddContentControl from "../toolbar-controls/add-content.component";
import React from "react";

export default function AddContentToolbar({
  content,
  onAddContent,
  toolbarControls,
}) {
  return (
    <section className="content-toolbar add-content-toolbar">
      <div className="d-flex align-items-center gap-2 justify-content-start">
        {/* Slot for custom controls  */}
        {toolbarControls}

        <AddContentControl onAddContent={(type) => onAddContent(type)} />
      </div>
    </section>
  );
}
