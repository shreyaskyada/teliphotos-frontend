import { Button } from "@teliphotos/ui";
import React from "react";
import { ChannelSelector } from "./ChannelSelector";
import { LayoutProps } from "./types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header className="p-5">
        <p>TeliPhotos</p>

        <ChannelSelector />
      </header>
      <section className="flex gap-1">
        <section className="w-[150px]">
          <Button variant="secondary">Left menu</Button>

          {/* <Button onClick={onClickHandler}>Logout </Button> */}
        </section>
        <section>{children}</section>
      </section>
    </div>
  );
};

export default Layout;
