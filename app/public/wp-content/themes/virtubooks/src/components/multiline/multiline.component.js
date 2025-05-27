import react from "react";
import { useState } from "react";
export default function MultilineInput({
  value,
  onChange,
  className = "",
  isReadOnly = false,
  placeholder = "Type here...",
}) {
  return (
    <textarea
      className={`multiline ${className}`}
      value={value}
      readOnly={isReadOnly}
      rows={1}
      onChange={(e) => {
        onChange(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
      placeholder={placeholder}
    />
  );
}
