import { useNavigate } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Avatar,
  Flex,
  Text,
  Menu,
  ActionIcon,
  rem,
  Group,
  Divider,
  TextInput,
  Code,
  NavLink,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconLogout,
  IconSearch,
  IconNotebook,
  IconFilePlus,
  IconPlus,
  IconNote
} from '@tabler/icons-react';

import { useAuth } from '../../context';
import { useCallback } from 'react';

export const Home = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure();

  const onLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding='md'
    >
      <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
      <AppShell.Navbar
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <Flex style={{ padding: 16, alignItems: 'center', gap: 16 }}>
          <Avatar src={null} alt={(user && user.name) || 'User Avatar'} color='red'>
            {user && user.name}
          </Avatar>

          <Flex direction='column'>
            <Text fz='lg' lh='xs' truncate='end'>
              {user && user.name}
            </Text>
            <Text fz='sm' lh='sm' truncate='end'>
              {user && user.email}
            </Text>
          </Flex>
          <Group justify='flex-end' style={{ marginLeft: 'auto' }}>
            <Menu shadow='md' width={200}>
              <Menu.Target>
                <ActionIcon
                  variant='transparent'
                  aria-label='Dropdown'
                  style={{
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconChevronDown style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>User Options</Menu.Label>
                <Menu.Item
                  onClick={onLogout}
                  rightSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>

        <Divider />

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
        <Divider />
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
        <Divider />
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
            <NavLink
              href='#3449032492'
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              label='With icon this is along label this should be long enough to wrap and truncate'
              leftSection={<IconNote size='1rem' stroke={1.5} />}
            />
            <NavLink
              href='#3449032492'
              label='With icon'
              leftSection={<IconNote size='1rem' stroke={1.5} />}
            />
            <NavLink
              href='#3449032492'
              label='With icon'
              leftSection={<IconNote size='1rem' stroke={1.5} />}
            />
          </Flex>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
};
