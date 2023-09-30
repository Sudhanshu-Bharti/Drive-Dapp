import React from "react";
import "../App.css";
import { Button } from "../ui/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/ui/avatar";
import { Badge } from "../ui/ui/badge";
import { Input } from "../ui/ui/input";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/ui/hover-card";

const LandingPage = () => {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          {" "}
          <div className="flex px-2 my-8 mx-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ewa</AvatarFallback>
            </Avatar>
            <Badge variant="outline">Connected</Badge>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>UserAddress</HoverCardContent>
      </HoverCard>
      <div className="w-80 h-10 mx-auto">
        <div className="mx-auto p-8">
          <div className="border-dashed box-border rounded-lg border-blue-300 h-64 w-64 p-2 border-2">
            <Button className="mx-auto flex items-center my-4" variant="share">
              Choose Image
            </Button>
            <p className="mx-auto text-blue-200 flex justify-center ">
              IMG:No Image Selected
            </p>
            <Button
              className="mx-auto flex items-center my-4"
              variant="primary"
            >
              Upload
            </Button>
          </div>
        </div>
        <Input type="text" placeholder="Enter Address" />
        <div className="flex justify-between">
          <Button className="mx-2 my-2" variant="primary">
            Get Data
          </Button>
          <Button className=" mx-2 my-2" variant="share">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
