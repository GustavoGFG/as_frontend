import { PersonComplete } from '@/types/PersonComplete';
import * as api from '@/api/admin';
import { InputField } from '../InputField';
import { useEffect, useState } from 'react';
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod';
import { z } from 'zod';
import { Button } from '../Button';
import { transformCPF } from '@/utils/transformCPF';
type Props = {
  person: PersonComplete;
  refreshAction: () => void;
};
export const PersonEdit = ({ person, refreshAction }: Props) => {
  const [nameField, setNameField] = useState(person.name);
  const [cpfField, setCpfField] = useState(person.cpf);
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

  const handleUpdateButton = async () => {
    if (errors.length > 0) return;
    setLoading(true);
    const updatePerson = await api.updatePerson(
      person.id_event,
      person.id_group,
      person.id,
      { name: nameField, cpf: cpfField }
    );
    setLoading(false);
    if (updatePerson) {
      refreshAction();
    } else {
      alert('Ocorreu um erro');
    }
  };

  return (
    <div>
      <h4 className="text-xl">Editar Pessoa</h4>
      <InputField
        value={nameField}
        onChange={e => setNameField(e.target.value)}
        placeholder="Digite o nome"
        disabled={loading}
        errorMessage={errors.find(item => item.field === 'nameField')?.message}
      />
      <InputField
        value={cpfField}
        onChange={e => setCpfField(transformCPF(e.target.value))}
        placeholder="Digite o CPF"
        disabled={loading}
        errorMessage={errors.find(item => item.field === 'cpfField')?.message}
      />
      <div className="flex gap-3">
        <Button value="Cancelar" onClick={refreshAction} disabled={loading} />
        <Button
          value={loading ? 'Salvando...' : 'Salvar'}
          onClick={handleUpdateButton}
          disabled={loading}
        />
      </div>
    </div>
  );
};
