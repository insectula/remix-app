import { Outlet } from "@remix-run/react";

export default function () {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>Булиты</h1>
        v Outlet v<br/>
      <Outlet/>
      </div>
    );
  }
  