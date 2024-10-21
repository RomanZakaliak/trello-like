import React, { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const CollapseSwitch: React.FC = () => {
  const [columnsCollapse, setColumnsCollapse] = useState(false);
  console.log(columnsCollapse);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={columnsCollapse}
        onCheckedChange={setColumnsCollapse}
      />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
};

export default CollapseSwitch;
