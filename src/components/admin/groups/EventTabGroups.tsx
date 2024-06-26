'use client';
import { Group } from '@/types/Group';
import { useEffect, useState } from 'react';
import * as api from '@/api/admin';
import {
  GroupItem,
  GroupItemNotFound,
  GroupItemPlaceholder,
} from './GroupItem';
import { GroupAdd } from './GroupAdd';
import { GroupEdit } from './GroupEdit';

type Props = {
  eventId: number;
};
export const EventTabGroups = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await api.getGroups(eventId);
    setLoading(false);
    setGroups(groupList);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleEditButton = (group: Group) => {
    setSelectedGroup(group);
  };

  return (
    <div>
      <div className="border border-dashed p-3 my-3">
        {selectedGroup && (
          <GroupEdit group={selectedGroup} refreshAction={loadGroups} />
        )}
        {!selectedGroup && (
          <GroupAdd eventId={eventId} refreshAction={loadGroups} />
        )}
      </div>
      {!loading &&
        groups.length > 0 &&
        groups.map(item => (
          <GroupItem
            key={item.id}
            item={item}
            refreshAction={loadGroups}
            onEdit={handleEditButton}
          />
        ))}
      {loading && (
        <>
          <GroupItemPlaceholder />
          <GroupItemPlaceholder />
          <GroupItemPlaceholder />
        </>
      )}
      {!loading && groups.length === 0 && <GroupItemNotFound />}
    </div>
  );
};
