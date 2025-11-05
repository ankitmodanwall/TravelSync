import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings are not yet available. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  </change>
  <change>
    <file>src/app/(app)/help/page.tsx</file>
    <content><![CDATA[import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            The help center is currently under construction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
