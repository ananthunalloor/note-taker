import { ActionIcon, Flex, NavLink, Tooltip, rem, Text } from '@mantine/core';
import { IconFilePlus, IconNotebook } from '@tabler/icons-react';
import { getAllNotebooks } from '../../service';

export const NotebookCollection = () => {
  const { data } = getAllNotebooks();
  return (
    <Flex
      direction='column'
      style={{
        paddingInline: 16,
        maxHeight: 200
      }}
    >
      <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Text size='sm' fw={500} c='dimmed'>
          Notebooks
        </Text>
        <Tooltip label='Add a Notebook'>
          <ActionIcon variant='transparent' aria-label='Dropdown' disabled>
            <IconFilePlus style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <Flex direction='column' style={{ flexGrow: 1, overflowY: 'auto' }}>
        {data?.map((notebook) => (
          <NavLink
            key={notebook.id}
            href={`#${notebook.id}`}
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
            label={notebook.name}
            leftSection={<IconNotebook size='1rem' stroke={1.5} />}
          />
        ))}
      </Flex>
    </Flex>
  );
};