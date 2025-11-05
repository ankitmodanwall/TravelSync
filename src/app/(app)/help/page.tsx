import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Help & Support
        </h1>
        <p className="text-muted-foreground">
          Find answers to your questions and get support.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The help center is currently under construction.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code />
              Developer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This application was developed by Ankit Modanwal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
