import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Trip Budgets
        </h1>
        <p className="text-muted-foreground">
          Manage your spending for your upcoming adventures.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This is where you'll be able to track your trip budgets. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
