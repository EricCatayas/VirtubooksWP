import ImageUploadsComponent from "../image-uploads/image-uploads.component";

export default function ImageUploadsModal() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageUploadsComponent />
    </div>
  );
}
