import { AccessControl } from "accesscontrol";

const grantsObjects = {
  "Organization Admin": {
    organizations: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    organizationUsers: {
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
      "create:any": ["*"]
    },
    posts: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
      "create:any": ["*"]
    },
    requests: {
      "create:any": ["*"]
    },
    users: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
      "create:own": ["*"]
    },
    rooms: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
      "create:own": ["*"]
    }
  },
  "Super Admin": {
    organizations: {
      "create:own": ["*"],
      "read:any": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    organizationAdmins: {
      "create:own": ["*"],
      "read:any": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    organizationEditors: {
      "create:own": ["*"],
      "read:any": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"]
    },
    posts: {
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
      "create:any": ["*"]
    },
    requests: {
      "read:any": ["*"],
      "update:own": ["*"],
      "update:any": ["*"],
      "delete:own": ["*"],
      "create:any": ["*"]
    },
    users: {
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
      "create:own": ["*"]
    }
  }
};

export const AccessControlInstance = new AccessControl(grantsObjects);
