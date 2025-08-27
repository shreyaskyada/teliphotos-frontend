import { Button } from "@teliphotos/ui";
import Link from "next/link";

const page = () => {
  return (
    <div>
      Teli Photo dashboard
      <Button>
        <Link href={"/login"}>Go to Login Page</Link>
      </Button>
    </div>
  );
};

export default page;
