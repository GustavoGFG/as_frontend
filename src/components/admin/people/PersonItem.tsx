import { PersonComplete } from '@/types/PersonComplete';
import { ItemButton } from '../ItemButton';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import * as api from '@/api/admin';

type Props = {
  item: PersonComplete;
  refreshAction: () => void;
  onEdit: (person: PersonComplete) => void;
};
export const PersonItem = ({ item, refreshAction, onEdit }: Props) => {
  const handleDeleteButton = async () => {
    if (confirm('Deseja excluir a pessoa?')) {
      await api.deletePerson(item.id_event, item.id_group, item.id);
      refreshAction();
    }
  };

  return (
    <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
      <div className="flex-1 flex flex-col md:flex-row md:gap-2 text-sm md:text-base">
        <span>{item.name}</span>
        <span>(CPF: {item.cpf})</span>
      </div>
      <ItemButton IconElement={FaRegEdit} onClick={() => onEdit(item)} />
      <ItemButton IconElement={FaRegTrashAlt} onClick={handleDeleteButton} />
    </div>
  );
};

export const PersonItemPlaceholder = () => {
  return (
    <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r from-gray-900 to-gray-950 animate animate-pulse"></div>
  );
};
export const PersonItemNotFound = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      Não há pessoas neste grupo.
    </div>
  );
};
