import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { updateColumnsCollapse } from '@/lib/redux/settings/settings.slice';
import { useTranslation } from 'react-i18next';

export const CollapseSwitch: React.FC = () => {
  const { t } = useTranslation();
  const { collapseEmptyColumns } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="collapse-columns"
        checked={collapseEmptyColumns}
        onCheckedChange={(checked) => dispatch(updateColumnsCollapse(checked))}
      />
      <Label htmlFor="collapse-columns">{t('collapseColumnsLabel')}</Label>
    </div>
  );
};
