import React from "react";

export default function TestNav() {
  return (
    <div
      style={{
        position: "sticky",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "blue",
        margin: 0,
        padding: 0,
      }}
    >
      <h1 style={{ color: "white" }}>Custom Navbar</h1>
    </div>
  );
}
