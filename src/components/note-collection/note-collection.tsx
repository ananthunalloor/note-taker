import { useCallback, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconNote, IconPlus } from '@tabler/icons-react';
import {
  ActionIcon,
  Flex,
  NavLink,
  Tooltip,
  rem,
  Text,
  Modal,
  Button,
  TextInput,
  Group
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';

import { useAuth } from '../../context';
import { CreateNote } from '../../types';
import { getAllNotes, useCreateNote } from '../../service';

export const NoteCollection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notebookId, noteId } = useParams<{ notebookId: string; noteId: string }>();

  const { data, refetch } = getAllNotes(notebookId);
  const { mutate: createNote } = useCreateNote();

  const [opened, { open, close }] = useDisclosure(false);

  const { getInputProps, onSubmit, reset } = useForm<CreateNote>({
    initialValues: {
      title: '',
      description: '',
      notebook_id: notebookId || '',
      user_id: user && user.id
    },

    validate: {
      title: (value) =>
        value.length >= 3 && value.length <= 50
          ? null
          : 'Title should be between 3 and 50 characters',
      description: (value) =>
        value.length >= 3 && value.length <= 100
          ? null
          : 'Description should be between 3 and 100 characters'
    }
  });

  const onCreateHandler = useCallback(
    async (values: CreateNote) => {
      if (!user || !notebookId) {
        notifications.show({
          title: 'Missing User or Notebook',
          message: 'Please select a notebook and try again',
          color: 'red',
          icon: null,
          autoClose: 3000
        });
        return;
      }
      createNote(
        { ...values, notebook_id: notebookId },
        {
          onSuccess: () => {
            notifications.show({
              title: 'Note Created',
              message: 'You have successfully created a note',
              color: 'teal',
              icon: null,
              autoClose: 3000
            });
            close();
            reset();
            refetch();
          },

          onError: (error) => {
            notifications.show({
              title: 'Note Creation Failed',
              message: error.message,
              color: 'red',
              icon: null,
              autoClose: 3000
            });
          }
        }
      );
    },
    [close]
  );

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      navigate(`${notebookId}/${event.currentTarget.dataset.note}`);
    },
    [navigate]
  );

  return (
    <>
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
          <Tooltip label={!notebookId ? 'Select a Notebook' : 'Add a Note'}>
            <ActionIcon
              variant='transparent'
              aria-label='Dropdown'
              onClick={open}
              disabled={!notebookId}
            >
              <IconPlus style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Flex>
        <Flex direction='column' style={{ flexGrow: 1, overflowY: 'auto' }}>
          {data?.map((note) => (
            <NavLink
              key={note.id}
              data-note={note.id}
              onClick={handleOnClick}
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              label={note.title}
              leftSection={<IconNote size='1rem' stroke={1.5} />}
              active={note.id === noteId}
              description={note.description}
            />
          ))}
        </Flex>
      </Flex>
      <Modal opened={opened} onClose={close} title='Create a Note'>
        <form onSubmit={onSubmit(onCreateHandler)}>
          <Flex
            direction={'column'}
            style={{
              gap: 8
            }}
          >
            <TextInput
              withAsterisk
              label='Title'
              type='text'
              placeholder='Note Title'
              {...getInputProps('title')}
              min={3}
              max={20}
            />
            <TextInput
              withAsterisk
              label='Description'
              type='text'
              placeholder='Note Description'
              {...getInputProps('description')}
            />
            <Group
              style={{
                justifyContent: 'flex-end'
              }}
            >
              <Button
                style={{
                  marginTop: 6
                }}
                type='submit'
              >
                Create Note
              </Button>
            </Group>
          </Flex>
        </form>
      </Modal>
    </>
  );
};
