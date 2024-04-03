import { Group } from '@/types/Group';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { InputField } from '../InputField';
import * as api from '@/api/admin';
import { z } from 'zod';
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod';

type Props = {
  group: Group;
  refreshAction: () => void;
};
export const GroupEdit = ({ group, refreshAction }: Props) => {
  const [nameField, setNameField] = useState(group.name);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const groupSchema = z.object({
    nameField: z
      .string()
      .min(1, 'Preencha o nome')
      .max(40, 'Máx 40 caracteres'),
  });

  useEffect(() => {
    setErrors([]);
    const data = groupSchema.safeParse({ nameField });
    if (!data.success) return setErrors(getErrorFromZod(data.error));
  }, [nameField]);

  const handleUpdateButton = async () => {
    if (errors.length > 0) return;
    setLoading(true);
    const updatedGroup = await api.updateGroup(group.id_event, group.id, {
      name: nameField,
    });
    setLoading(false);
    if (updatedGroup) {
      refreshAction();
    } else {
      alert('Ocorreu um erro');
      refreshAction();
    }
  };
  return (
    <div>
      <h4 className="text-xl">Editar Grupo</h4>
      <InputField
        value={nameField}
        onChange={e => setNameField(e.target.value)}
        placeholder="Digite o nome do grupo"
        errorMessage={errors.find(item => item.field === 'nameField')?.message}
        disabled={loading}
      />
      <div className="flex gap-3">
        <Button
          value="Cancelar"
          onClick={() => {
            refreshAction();
          }}
          disabled={loading}
        />
        <Button
          value={loading ? 'Salvando' : 'Salvar'}
          onClick={handleUpdateButton}
          disabled={loading}
        />
      </div>
    </div>
  );
};
