import React from "react";
import { GoatFinalResultsProps } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Optional: for conditional classes

function GoatFinalResults({
  finalSkills,
  taggedSkills,
}: GoatFinalResultsProps) {
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">G.O.A.T. Results</CardTitle>
          <p className="text-muted-foreground">
            Your final skill assessment is complete. Tagged skills are marked
            below.
          </p>
        </CardHeader>
      </Card>

      {/* Skills List */}
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {Object.entries(finalSkills).map(([skill, value]) => {
            const isTagged = taggedSkills.includes(skill);
            return (
              <Card
                key={skill}
                className={cn(
                  "transition-shadow",
                  isTagged ? "border-green-600 shadow-lg" : ""
                )}
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div className="font-medium capitalize">
                    {skill.replace(/([A-Z])/g, " $1")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{value}</span>
                    {isTagged && <Badge variant="outline">Tagged</Badge>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Summary (placeholder) */}
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          Based on your performance, Vault-Tec recommends a future in
          **Engineering**. Be sure to review your tagged skills and prepare for
          greatness!
        </CardContent>
      </Card>
    </div>
  );
}

export default GoatFinalResults;
