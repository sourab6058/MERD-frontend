import React from "react";

export default function login() {
  function handleSubmit(event) {
    // event.preventDefault();
  }
  return (
    <div>
      <form method="GET" action="http://localhost:3000" onSubmit={handleSubmit}>
        <input type="text" name="sid" value="something" />
        <input value="POST" type="submit" />
      </form>
    </div>
  );
}
