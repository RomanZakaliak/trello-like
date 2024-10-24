import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ELanguage } from '@/common/Enums/language.enum';

export const Header = () => {
  const { i18n } = useTranslation();

  return (
    <header className="flex flex-row justify-between px-10 pt-2">
      <div>Logo goes here</div>
      <nav>
        <ul>
          <li>Navigation goes here</li>
        </ul>
      </nav>

      <Select
        onValueChange={(lng) => i18n.changeLanguage(lng)}
        defaultValue={i18n.language}
      >
        <SelectTrigger className="w-20">
          <SelectValue placeholder={i18n.language} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ELanguage).map(([key, value]) => (
            <SelectItem value={value}>{key}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  );
};
