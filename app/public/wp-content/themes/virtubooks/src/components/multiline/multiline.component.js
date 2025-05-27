import React from "react";
export default function MultilineInput({
  value,
  onChange,
  className = "",
  isReadOnly = false,
  style,
  placeholder = "Type here...",
  onFocus,
  onBlur,
}) {
  return (
    <textarea
      className={`multiline ${className}`}
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
