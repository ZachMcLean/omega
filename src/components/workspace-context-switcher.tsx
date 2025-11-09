"use client";

/**
 * Workspace Context Switcher - Dropdown to switch between Solo and Workspace modes
 * This is the primary navigation mechanism for context switching
 */

import { useState } from "react";
import { Check, ChevronDown, Plus, Compass, User, Lock, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { WorkspaceContext } from "@/lib/workspace-context";

interface WorkspaceContextSwitcherProps {
  currentContext: WorkspaceContext;
  workspaces: WorkspaceContext[];
  onContextChange: (context: WorkspaceContext) => void;
  onBrowseWorkspaces: () => void;
  onCreateWorkspace: () => void;
}

export function WorkspaceContextSwitcher({
  currentContext,
  workspaces,
  onContextChange,
  onBrowseWorkspaces,
  onCreateWorkspace,
}: WorkspaceContextSwitcherProps) {
  const [open, setOpen] = useState(false);

  const getContextIcon = (type: WorkspaceContext["type"]) => {
    switch (type) {
      case "solo":
        return <User className="w-4 h-4" />;
      case "private":
        return <Lock className="w-4 h-4" />;
      case "public":
        return <Globe className="w-4 h-4" />;
    }
  };

  const getContextColor = (type: WorkspaceContext["type"]) => {
    switch (type) {
      case "solo":
        return "text-cyan-400 bg-cyan-500/20 border-cyan-500/30";
      case "private":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30";
      case "public":
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
    }
  };

  const getMemberText = (workspace: WorkspaceContext) => {
    if (workspace.type === "solo") return "You";
    return `${workspace.memberCount || 0} members`;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between border ${getContextColor(currentContext.type)} hover:bg-slate-700/50 transition-all group`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {getContextIcon(currentContext.type)}
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="text-sm truncate w-full text-left">
                {currentContext.name}
              </span>
              <span className="text-xs text-slate-400 truncate w-full text-left">
                {getMemberText(currentContext)}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-300 transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 bg-slate-900 border-slate-700" align="start">
        {/* Current Context */}
        <div className="px-2 py-1.5">
          <p className="text-xs text-slate-400 mb-2">CURRENT CONTEXT</p>
          <DropdownMenuItem
            className={`${getContextColor(currentContext.type)} cursor-default`}
          >
            <div className="flex items-center gap-2 flex-1">
              {getContextIcon(currentContext.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{currentContext.name}</p>
                <p className="text-xs opacity-70">{getMemberText(currentContext)}</p>
              </div>
              <Check className="w-4 h-4" />
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-slate-700" />

        {/* Available Workspaces */}
        {workspaces.length > 0 && (
          <>
            <div className="px-2 py-1.5 max-h-64 overflow-y-auto">
              <p className="text-xs text-slate-400 mb-2">YOUR WORKSPACES</p>
              {workspaces.map((workspace) => {
                const isActive = workspace.id === currentContext.id;
                return (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => {
                      onContextChange(workspace);
                      setOpen(false);
                    }}
                    className={`${
                      isActive
                        ? getContextColor(workspace.type)
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getContextIcon(workspace.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{workspace.name}</p>
                        <p className="text-xs text-slate-400">{getMemberText(workspace)}</p>
                      </div>
                      {isActive && <Check className="w-4 h-4 flex-shrink-0" />}
                      {workspace.isActive && !isActive && (
                        <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
            <DropdownMenuSeparator className="bg-slate-700" />
          </>
        )}

        {/* Actions */}
        <div className="p-2 space-y-1">
          <DropdownMenuItem
            onClick={() => {
              onBrowseWorkspaces();
              setOpen(false);
            }}
            className="hover:bg-slate-800 text-slate-300"
          >
            <Compass className="w-4 h-4 mr-2" />
            Browse All Workspaces
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onCreateWorkspace();
              setOpen(false);
            }}
            className="hover:bg-slate-800 text-cyan-400"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Workspace
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

