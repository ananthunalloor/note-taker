import { ActionIcon, Flex, NavLink, Tooltip, rem, Text } from '@mantine/core';
import { IconNote, IconPlus } from '@tabler/icons-react';
import { getAllNotes } from '../../service';

export const NoteCollection = () => {
  const { data } = getAllNotes();
  return (
    <Flex
      direction='column'
      style={{
        paddingInline: 16,
        flexGrow: 1
      }}
    >
      <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Text size='sm' fw={500} c='dimmed'>
          Notes
        </Text>
        <Tooltip label='Add a Note'>
          <ActionIcon variant='transparent' aria-label='Dropdown'>
            <IconPlus style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <Flex direction='column' style={{ flexGrow: 1, overflowY: 'auto' }}>
        {data?.map((note) => (
          <NavLink
            href={`#${note.id}`}
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
            label={note.title}
            leftSection={<IconNote size='1rem' stroke={1.5} />}
          />
        ))}
      </Flex>
    </Flex>
  );
};
