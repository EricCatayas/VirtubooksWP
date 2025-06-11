export default function ImageContent({ content }) {
  const { value, styles = {} } = content;

  return (
    <div className="image-content">
      {value ? (
        <img
          src={value}
          alt="Content"
          style={{ display: "block", ...styles }}
        />
      ) : (
        <p>Select an image</p>
      )}
    </div>
  );
}
