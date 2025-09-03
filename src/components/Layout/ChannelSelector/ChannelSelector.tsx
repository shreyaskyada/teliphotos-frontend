import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@teliphotos/ui/Popover";

const ChannelSelector = async () => {
  // const token = (await cookies()).get("accessToken")?.value;

  // const res = await fetch("http://localhost:5001/private-channels", {
  //   cache: "no-store",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // const text = await res.text();
  // console.log("Response text:", text);

  // let data;
  // try {
  //   data = JSON.parse(text);
  // } catch (e) {
  //   console.error("Not JSON response", e);
  // }

  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        Content
        {/* {data &&
          (data.data.channels as TelegramChatFull[]).map((data) => {
            return <h1 key={data.chats[0].id}>{data.chats[0].title}</h1>;
          })} */}
      </PopoverContent>
    </Popover>
  );
};

export default ChannelSelector;
