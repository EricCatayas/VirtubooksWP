import React from "react";
export default function MultilineInput({
  value,
  onChange,
  className = "",
  isReadOnly = true,
  style,
  placeholder = "Type here...",
  onFocus,
  onBlur,
}) {
  return (
    <textarea
      className={`multiline ${className} vb-content`}
      value={value}
      readOnly={isReadOnly}
      style={style}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
