"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const longComment = comment.length > 100;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 100)}...` : comment;

  return (
    <div>
      <p className="text-2xl font-[roboto]">{displayComment}</p>
      {longComment && (
        <Button
          className="text-muted-foreground pl-0 text-2xl"
          onClick={toggleExpanded}
          variant="link"
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}
export default Comment;
