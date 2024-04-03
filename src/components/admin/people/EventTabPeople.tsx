import * as api from '@/api/admin';
import { Group } from '@/types/Group';
import { PersonComplete } from '@/types/PersonComplete';
import { useEffect, useState } from 'react';
import {
  GroupItem,
  GroupItemNotFound,
  GroupItemPlaceholder,
} from '../groups/GroupItem';
import { PersonAdd } from './PersonAdd';
import { PersonEdit } from './PersonEdit';
import {
  PersonItem,
  PersonItemNotFound,
  PersonItemPlaceholder,
} from './PersonItem';

type Props = {
  eventId: number;
};
export const EventTabPeople = ({ eventId }: Props) => {
  // GROUPS
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [groupLoading, setGroupLoading] = useState(true);

  const loadGroups = async () => {
    setSelectedPerson(null);
    setSelectedGroupId(0);
    setGroupLoading(true);
    const groupList = await api.getGroups(eventId);
    setGroupLoading(false);
    setGroups(groupList);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  // PEOPLE
  const [people, setPeople] = useState<PersonComplete[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null>(
    null
  );

  const loadPeople = async () => {
    setSelectedPerson(null);
    if (selectedGroupId <= 0) return;
    setPeople([]);
    setPeopleLoading(true);
    const peopleList = await api.getPeople(eventId, selectedGroupId);
    setPeopleLoading(false);
    setPeople(peopleList);
  };

  useEffect(() => {
    loadPeople();
  }, [selectedGroupId]);

  const handleEditButton = (person: PersonComplete) => {
    setSelectedPerson(person);
  };

  return (
    <div>
      <div className="my-3">
        {!groupLoading && groups.length > 0 && (
          <select
            className="w-full bg-gray-800 text-white text-xl p-3 rounded border-none outline-none"
            onChange={e => setSelectedGroupId(parseInt(e.target.value))}
          >
            <option value={0}>Selecione um grupo</option>
            {groups.map(item => (
              <option
                key={item.id}
                value={item.id}
                className="w-full bg-transparent text-white text-xl p-3 outline-none"
              >
                {item.name}
              </option>
            ))}
          </select>
        )}
        {groupLoading && <GroupItemPlaceholder />}
        {!groupLoading && groups.length === 0 && <GroupItemNotFound />}
      </div>

      {selectedGroupId > 0 && (
        <>
          <div className="border border-dashed p-3 my-3">
            {!selectedPerson && (
              <PersonAdd
                eventId={eventId}
                groupId={selectedGroupId}
                refreshAction={loadPeople}
              />
            )}
            {selectedPerson && (
              <PersonEdit person={selectedPerson} refreshAction={loadPeople} />
            )}
          </div>
          {!peopleLoading &&
            people.length > 0 &&
            people.map(item => (
              <PersonItem
                key={item.id}
                refreshAction={loadPeople}
                item={item}
                onEdit={handleEditButton}
              />
            ))}
          {peopleLoading && (
            <>
              <PersonItemPlaceholder />
              <PersonItemPlaceholder />
            </>
          )}
          {!peopleLoading && people.length === 0 && <PersonItemNotFound />}
        </>
      )}
    </div>
  );
};
