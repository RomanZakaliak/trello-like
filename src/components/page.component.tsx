import { useEffect, useState } from 'react';
import { useAppDispatch } from '../lib/redux/hooks';
import { CollapseSwitch } from './collapse-switch.component';
import { getAllColumns } from '@/lib/redux/columns/columns.actions';
import { AddTodoForm } from './add-todo-form.component';
import { getAllTodos } from '@/lib/redux/todo-items/todo-items.actions';
import { ColumnsContainer } from './columns-container.component';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

function Page() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllColumns());
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center gap-3 py-2">
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Create new ToDo</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <DialogTitle>Create ToDo</DialogTitle>
            <AddTodoForm
              onFormSubmit={() => {
                setIsOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>

        <CollapseSwitch />
      </div>
      <main className="overflow-x-hidden">
        <ColumnsContainer />
      </main>
    </>
  );
}

export default Page;
