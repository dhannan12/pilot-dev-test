import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAuthProviders, mockRoles, mockPermissions } from './SetupAuthenticationAnd.mock';
import { AlertCircle, CheckCircle2, Shield, Users } from 'lucide-react';

interface SelectedPermissions {
  [key: string]: boolean;
}

interface SelectedRoles {
  [key: string]: boolean;
}

const SetupAuthenticationAnd: React.FC = () => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<SelectedRoles>({});
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermissions>({});
  const [setupComplete, setSetupComplete] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  const handleProviderToggle = (providerId: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  };

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [roleId]: !prev[roleId],
    }));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const handleCompleteSetup = () => {
    if (selectedProviders.length > 0 && adminEmail) {
      setSetupComplete(true);
    }
  };

  const selectedRoleCount = Object.values(selectedRoles).filter(Boolean).length;
  const selectedPermissionCount = Object.values(selectedPermissions).filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Authentication & RBAC Setup</h1>
        <p className="text-gray-600">Configure authentication providers and role-based access control</p>
      </div>

      {setupComplete && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Authentication and RBAC setup completed successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="providers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers">Auth Providers</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Authentication Providers
              </CardTitle>
              <CardDescription>
                Select authentication providers to enable ({selectedProviders.length} selected)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {mockAuthProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={provider.id}
                      checked={selectedProviders.includes(provider.id)}
                      onCheckedChange={() => handleProviderToggle(provider.id)}
                    />
                    <Label htmlFor={provider.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm text-gray-600">{provider.description}</div>
                    </Label>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t space-y-3">
                <Label htmlFor="admin-email" className="text-base font-medium">
                  Admin Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Roles
              </CardTitle>
              <CardDescription>
                Define roles for your application ({selectedRoleCount} selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRoles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={role.id}
                      checked={selectedRoles[role.id] || false}
                      onCheckedChange={() => handleRoleToggle(role.id)}
                    />
                    <Label htmlFor={role.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-gray-600">{role.description}</div>
                      <div className="text-xs text-gray-500 mt-1">Level: {role.level}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>
                Configure granular permissions ({selectedPermissionCount} selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions[permission.id] || false}
                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                    />
                    <Label htmlFor={permission.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{permission.name}</div>
                      <div className="text-sm text-gray-600">{permission.description}</div>
                      <div className="text-xs text-gray-500 mt-1">Resource: {permission.resource}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleCompleteSetup}
          disabled={selectedProviders.length === 0 || !adminEmail}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default SetupAuthenticationAnd;