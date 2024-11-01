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
import { BiColumns } from 'react-icons/bi';
import { useAppSelector } from '@/lib/redux/hooks';

export const Header = () => {
  const { i18n } = useTranslation();
  const token = useAppSelector((state) => state.auth.userToken);

  return (
    <header className="flex flex-row items-center justify-between bg-slate-300 px-10 py-2 text-xl">
      <Link to="/">
        <BiColumns size={40} />
      </Link>
      <nav className="flex items-center">
        <ul className="flex flex-row gap-4">
          <li>
            <Link to="/">ToDos</Link>
          </li>
          {token != null ? (
            <li>
              <button>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
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
