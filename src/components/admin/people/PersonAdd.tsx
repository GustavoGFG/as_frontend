import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { z } from 'zod';
import { transformCPF } from '@/utils/transformCPF';
import * as api from '@/api/admin';

type Props = {
  eventId: number;
  groupId: number;
  refreshAction: () => void;
};
export const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const personSchema = z.object({
    nameField: z
      .string()
      .min(1, 'Preencha o nome')
      .max(40, 'Máx 40 caracteres'),
    cpfField: z.string().length(11, 'CPF inválido'),
  });

  useEffect(() => {
    setErrors([]);
    const data = personSchema.safeParse({ nameField, cpfField });
    if (!data.success) return setErrors(getErrorFromZod(data.error));
  }, [nameField, cpfField]);

  const handleSaveButton = async () => {
    if (errors.length > 0) return;
    setLoading(true);
    const addPerson = await api.addPerson(eventId, groupId, {
      name: nameField,
      cpf: cpfField,
    });
    setLoading(false);
    if (addPerson) {
      refreshAction();
      setNameField('');
      setCpfField('');
    } else {
      alert('Ocorreu um erro!');
    }
  };

  return (
    <div>
      <h4 className="text-xl">Nova Pessoa</h4>
      <InputField
        value={nameField}
        onChange={e => setNameField(e.target.value)}
        placeholder="Digite o nome da pessoa"
        errorMessage={errors.find(item => item.field === 'nameField')?.message}
        disabled={false}
      />
      <InputField
        value={cpfField}
        onChange={e => setCpfField(transformCPF(e.target.value))}
        placeholder="Digite o CPF da pessoa"
        errorMessage={errors.find(item => item.field === 'cpfField')?.message}
        disabled={false}
      />
      <Button
        value={loading ? 'Adicionando...' : 'Adicionar'}
        onClick={handleSaveButton}
        disabled={loading}
      />
    </div>
  );
};
