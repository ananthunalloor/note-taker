import { Code, TextInput, rem } from '@mantine/core';
import { IconDashboard, IconFileText, IconHome, IconSearch } from '@tabler/icons-react';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Get full information about current system status',
    onClick: () => console.log('Dashboard'),
    leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onClick: () => console.log('Documentation'),
    leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
  }
];

export const NoteSearch = () => {
  return (
    <>
      <TextInput
        placeholder='Search'
        size='xs'
        leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
        rightSectionWidth={70}
        onClick={spotlight.open}
        rightSection={<Code>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        style={{ paddingInline: 18, paddingTop: 16 }}
        mb='sm'
      />
      <Spotlight
        actions={actions}
        nothingFound='Nothing found...'
        shortcut='Ctrl + K'
        highlightQuery
        searchProps={{
          leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
          placeholder: 'Search...'
        }}
      />
    </>
  );
};
