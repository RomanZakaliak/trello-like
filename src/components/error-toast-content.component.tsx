import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdError } from 'react-icons/md';

interface IErrorToastContentProps {
  errorMessage: string;
}

export const ErrorToastContent: React.FC<IErrorToastContentProps> = ({
  errorMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center gap-1">
      <MdError className="" size={25} />
      <div>
        <h6 className="font-bold">{t('toastErrorTitle')}</h6>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};
