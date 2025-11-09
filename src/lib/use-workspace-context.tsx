"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { WorkspaceContext as WorkspaceContextType, getDefaultSoloContext } from "./workspace-context";

interface WorkspaceContextValue {
  currentContext: WorkspaceContextType;
  setCurrentContext: (context: WorkspaceContextType) => void;
  workspaces: WorkspaceContextType[];
  setWorkspaces: (workspaces: WorkspaceContextType[]) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(
  undefined
);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [currentContext, setCurrentContext] = useState<WorkspaceContextType>(
    getDefaultSoloContext()
  );
  const [workspaces] = useState<WorkspaceContextType[]>([
    {
      id: "squad-alpha",
      name: "Squad Alpha",
      type: "private",
      memberCount: 5,
      isActive: true,
    },
    {
      id: "wsb-traders",
      name: "WSB Traders",
      type: "public",
      memberCount: 1234,
      isActive: true,
    },
  ]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentContext,
        setCurrentContext,
        workspaces,
        setWorkspaces: () => {}, // TODO: Implement when needed
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error(
      "useWorkspaceContext must be used within a WorkspaceProvider"
    );
  }
  return context;
}

