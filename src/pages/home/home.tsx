import { AppShell, Burger, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Editor, NoteCollection, NoteSearch, NotebookCollection, UserCard } from '../../components';

export const Home = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 40, sm: 0 } }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding='md'
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
      </AppShell.Header>
      <AppShell.Navbar
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <UserCard />
        <Divider />
        <NoteSearch />
        <Divider />
        <NotebookCollection />
        <Divider />
        <NoteCollection />
      </AppShell.Navbar>
      <AppShell.Main style={{ height: '100%' }}>
        <Editor />
      </AppShell.Main>
    </AppShell>
  );
};
