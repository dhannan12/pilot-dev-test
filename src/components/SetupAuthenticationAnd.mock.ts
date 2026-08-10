export interface AuthProvider {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
}

export const mockAuthProviders: AuthProvider[] = [
  {
    id: 'oauth-google',
    name: 'Google OAuth',
    description: 'Sign in with Google account',
  },
  {
    id: 'oauth-github',
    name: 'GitHub OAuth',
    description: 'Sign in with GitHub account',
  },
  {
    id: 'oauth-microsoft',
    name: 'Microsoft OAuth',
    description: 'Sign in with Microsoft account',
  },
  {
    id: 'saml',
    name: 'SAML 2.0',
    description: 'Enterprise SAML authentication',
  },
  {
    id: 'ldap',
    name: 'LDAP',
    description: 'LDAP directory authentication',
  },
];

export const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access and configuration',
    level: 1,
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Team management and reporting access',
    level: 2,
  },
  {
    id: 'user',
    name: 'User',
    description: 'Standard user with basic access',
    level: 3,
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to resources',
    level: 4,
  },
  {
    id: 'guest',
    name: 'Guest',
    description: 'Limited guest access',
    level: 5,
  },
];

export const mockPermissions: Permission[] = [
  {
    id: 'create-user',
    name: 'Create User',
    description: 'Create new user accounts',
    resource: 'users',
  },
  {
    id: 'read-user',
    name: 'Read User',
    description: 'View user information',
    resource: 'users',
  },
  {
    id: 'update-user',
    name: 'Update User',
    description: 'Modify user information',
    resource: 'users',
  },
  {
    id: 'delete-user',
    name: 'Delete User',
    description: 'Remove user accounts',
    resource: 'users',
  },
  {
    id: 'manage-roles',
    name: 'Manage Roles',
    description: 'Create and modify roles',
    resource: 'roles',
  },
  {
    id: 'view-audit-log',
    name: 'View Audit Log',
    description: 'Access system audit logs',
    resource: 'audit',
  },
  {
    id: 'manage-permissions',
    name: 'Manage Permissions',
    description: 'Configure system permissions',
    resource: 'permissions',
  },
  {
    id: 'export-data',
    name: 'Export Data',
    description: 'Export system data',
    resource: 'data',
  },
];