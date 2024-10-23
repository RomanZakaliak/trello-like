import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateCollumnsCollapse } from "@/lib/redux/settings/settings.slice";

export const CollapseSwitch: React.FC = () => {
  const { collapseEmptyColumns } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="collapse-collumns"
        checked={collapseEmptyColumns}
        onCheckedChange={(checked) => dispatch(updateCollumnsCollapse(checked))}
      />
      <Label htmlFor="collapse-collumns">Collapse empty columns</Label>
    </div>
  );
};
