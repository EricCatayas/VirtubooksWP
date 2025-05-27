import { registerBlockType } from "@wordpress/blocks";

registerBlockType("virtubooks/notebook", {
  title: "Notebook",
  attributes: {},
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent() {
  return <div>Notebook block</div>;
}

function SaveComponent() {
  return <div>Notebook block</div>;
}
