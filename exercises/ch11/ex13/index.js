export function stringifyJSON(value) {
  if (value === null) {
    return "null";
  }

  const type = typeof value;

  // 文字列はエスケープして囲む
  if (type === "string") {
    return (
      '"' +
      value.replace(/[\\"\u0000-\u001F]/g, (c) => {
        switch (c) {
          case '"':
            return '\\"';
          case "\\":
            return "\\\\";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "\t":
            return "\\t";
          default:
            return "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0");
        }
      }) +
      '"'
    );
  }

  if (type === "number") {
    return isFinite(value) ? String(value) : "null";
  }

  if (type === "boolean") {
    return value ? "true" : "false";
  }

  if (Array.isArray(value)) {
    return (
      "[" +
      value
        .map((item) => {
          if (
            typeof item === "undefined" ||
            typeof item === "function" ||
            typeof item === "symbol"
          ) {
            return "null";
          }
          return stringifyJSON(item);
        })
        .join(",") +
      "]"
    );
  }

  if (type === "object") {
    const keys = Object.keys(value);
    const props = [];

    for (const key of keys) {
      const val = value[key];
      if (
        typeof val === "undefined" ||
        typeof value === "function" ||
        typeof val === "symbol"
      ) {
        continue; // skip invalid values
      }
      props.push(stringifyJSON(key) + ":" + stringifyJSON(val));
    }

    return "{" + props.join(",") + "}";
  }

  // undefined, function, symbolなど
  return undefined;
}
