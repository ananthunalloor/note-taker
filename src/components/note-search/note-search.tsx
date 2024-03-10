import { Code, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const NoteSearch = () => {
  return (
    <TextInput
      placeholder='Search'
      size='xs'
      leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
      rightSectionWidth={70}
      rightSection={<Code>Ctrl + K</Code>}
      styles={{ section: { pointerEvents: 'none' } }}
      style={{ paddingInline: 18, paddingTop: 16 }}
      mb='sm'
    />
  );
};
