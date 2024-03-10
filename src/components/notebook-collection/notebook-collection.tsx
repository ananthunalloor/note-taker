import { ActionIcon, Flex, NavLink, Tooltip, rem, Text } from '@mantine/core';
import { IconFilePlus, IconNotebook } from '@tabler/icons-react';

export const NotebookCollection = () => {
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
        <NavLink
          href='#3449032492'
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
          label='With icon this is along label this should be long enough to wrap and truncate'
          leftSection={<IconNotebook size='1rem' stroke={1.5} />}
        />
        <NavLink
          href='#3449032492'
          label='With icon'
          leftSection={<IconNotebook size='1rem' stroke={1.5} />}
        />
        <NavLink
          href='#3449032492'
          label='With icon'
          leftSection={<IconNotebook size='1rem' stroke={1.5} />}
        />
      </Flex>
    </Flex>
  );
};
