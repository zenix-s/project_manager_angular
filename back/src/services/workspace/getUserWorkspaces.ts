import { Workspace } from "@/interfaces/interfaces";

const Data: Workspace[] = [
  {
    id: 1,
    name: "Workspace 1",
    description: "Description of Workspace 1",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Workspace 2",
    description: "Description of Workspace 2",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Workspace 3",
    description: "Description of Workspace 3",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Workspace 4",
    description: "Description of Workspace 4",
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Workspace 5",
    description: "Description of Workspace 5",
    createdAt: new Date(),
  },
];
function getUserWorkspaces(userId: number): Workspace[] {
	
  return Data;
}

export default getUserWorkspaces;
