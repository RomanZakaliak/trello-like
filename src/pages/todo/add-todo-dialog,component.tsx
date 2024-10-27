import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddTodoForm } from './add-todo-form.component';

export const AddTodoDialog = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{t('createNewTodoButton')}</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <DialogTitle>{t('createTodoTitle')}</DialogTitle>
        <AddTodoForm
          onFormSubmit={() => {
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
