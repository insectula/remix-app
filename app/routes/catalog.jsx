import { Outlet } from "@remix-run/react";
import Bullits from '~/components/bullits';

export default function () {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        catalog/
        <Bullits/>
        v Outlet v @catalog/<br/>
      <Outlet/>
      </div>
    );
  }
  