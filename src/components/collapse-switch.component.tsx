import React from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useAppDispatch, useAppSelector } from '@/common/lib/redux/hooks';
import { updateCollumnsCollapse } from '@/common/lib/redux/settings/settings.slice';
import { useTranslation } from 'react-i18next';

export const CollapseSwitch: React.FC = () => {
  const { t } = useTranslation();
  const { collapseEmptyColumns } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="collapse-collumns"
        checked={collapseEmptyColumns}
        onCheckedChange={(checked) => dispatch(updateCollumnsCollapse(checked))}
      />
      <Label htmlFor="collapse-collumns">{t('collapseColumnsLabel')}</Label>
    </div>
  );
};
