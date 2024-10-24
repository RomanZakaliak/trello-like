import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      createNewTodoButton: 'Create new ToDo',
      createTodoTitle: 'Create ToDo',
      addTodoButton: 'Add ToDo',
      todoFormTitlePlaceholder: 'Cook dishes',
      titleName: 'Title',
      desriptionName: 'Description',
      todoFormDescriptionPlaceholder: 'Prepare ingredients and cook dinner',
      addColumnButton: 'Add column',
      columnFormTitlePlaceholder: 'In Superposition',
      collapseColumnsLabel: 'Collapse empty columns',
      columnFormTitle: 'New Column',
      addColumnSchemaTitleErrorMin: 'Title cannot be empty',
      addColumnsSchemaTitleErrorMax: 'Title should be less than 50 symbols',
      addTodoSchemaErrorTitleMin: 'Title cannot be empty',
      addTodoShemaErrorTitleMax: 'Title should be less than 200 symbols',
      addTodosSchemaDescriptionMax:
        'Description should be less than 500 symbols',
      toastErrorTitle: 'Oh no, an error occurred',
      statusesSelectLabel: 'Statuses',
      changeStatusValuePlaceholder: 'Change status',
    },
  },
  ua: {
    translation: {
      createNewTodoButton: 'Створити новий ToDo',
      createTodoTitle: 'Створити ToDo',
      addTodoButton: 'Додати ToDo',
      todoFormTitlePlaceholder: 'Приготувати поїсти',
      titleName: 'Заголовок',
      desriptionName: 'Опис',
      todoFormDescriptionPlaceholder:
        "Підготувати інгредієнти та приготувати вечер'ю",
      addColumnButton: 'Додати колонку',
      columnFormTitlePlaceholder: 'В суперпозиції',
      collapseColumnsLabel: 'Згорнути пусті колонки',
      columnFormTitle: 'Нова Колонка',
      addColumnSchemaTitleErrorMin: 'Закголовок не може бути пустим',
      addColumnsSchemaTitleErrorMax:
        'Заголовок повинен містити менше 50 символів',
      addTodoSchemaErrorTitleMin: 'Заголовок не може бути пустим',
      addTodoShemaErrorTitleMax: 'Заголовок повинен містити менше 200 символів',
      addTodosSchemaDescriptionMax: 'Опис повинен містити менше 500 символів',
      toastErrorTitle: 'О ні, трапилась помилка',
      statusesSelectLabel: 'Статуси',
      changeStatusValuePlaceholder: 'Змінити статус',
    },
  },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    lng: 'ua',
    interpolation: {
      escapeValue: false,
    },
    resources: resources,
  });

export default i18next;
