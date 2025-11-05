import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            