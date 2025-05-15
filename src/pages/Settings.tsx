
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<boolean>(true);
  
  const toggleNotifications = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Address</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about new recipes and updates
                  </p>
                </div>
                <Button 
                  variant={notifications ? "default" : "outline"}
                  onClick={toggleNotifications}
                >
                  {notifications ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
