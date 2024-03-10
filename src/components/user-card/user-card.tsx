import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Avatar, Flex, Group, Menu, rem, Text } from '@mantine/core';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';

import { useAuth } from '../../context';

export const UserCard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
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
  );
};
