import { MovieDetails } from '../models/movies';
import { usePersistentStorage } from './useLocalStorage';
import { storageKeys } from '~/constants/storageKeys';

export const useUserData = () => {
  const persistentStorage = usePersistentStorage();

  const download = (filename: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const exportUserData = () => {
    const liked =
      persistentStorage?.getItem<MovieDetails[]>(storageKeys.LIKED) ?? [];
    const watched =
      persistentStorage?.getItem<Record<number, number[]>>(
        storageKeys.WATCHED
      ) ?? {};

    const userData = { liked, watched };

    download(
      `mymovielist-data-${new Date().toJSON()}.json`,
      JSON.stringify(userData)
    );
  };

  type UserDataFile = Blob | File;
  const InvalidFile = new Error('Arquivo Inválido');
  const importUserData = async (file: UserDataFile) => {
    const userDataStringified = await file.text();

    const userData = JSON.parse(userDataStringified);

    const { liked, watched } = userData;

    if (!liked || !watched) throw InvalidFile;

    persistentStorage?.setItem(storageKeys.LIKED, liked);
    persistentStorage?.setItem(storageKeys.WATCHED, watched);
  };

  return {
    exportUserData,
    importUserData,
  };
};
