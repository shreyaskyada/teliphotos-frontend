"use client";
import { Button } from "@teliphotos/ui";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

const page = () => {
  const onClickHandler = async () => {
    const token = Cookies.get("accessToken");
    await axios.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div>
      <Button onClick={onClickHandler}>Logout </Button>
    </div>
  );
};

export default page;
