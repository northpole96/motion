"use client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SonnerDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>

      <Avatar>
        <AvatarImage src="https://unsplash.com/photos/a-woman-is-sitting-on-a-bike-with-a-bag-RaPA5GlnRxs" alt="@shadcn"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}
