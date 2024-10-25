import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language } from '@/common/enums/language.enum';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { i18n } = useTranslation();

  return (
    <header className="flex flex-row justify-between px-10 pt-2">
      <div>Logo goes here</div>
      <nav>
        <ul>
          <Link to="/">ToDo</Link>
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
          {Object.entries(Language).map(([key, value]) => (
            <SelectItem value={value} key={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  );
};
