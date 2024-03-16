import { ActionIcon, Flex, NavLink, Tooltip, rem, Text, Modal, Button } from '@mantine/core';
import { IconNote, IconPlus } from '@tabler/icons-react';
import { getAllNotes } from '../../service';
import { useCallback, MouseEvent } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from '@mantine/form';
// import { CreateNote } from '../../types';
// import { useAuth } from '../../context';

export const NoteCollection = () => {
  // const { user } = useAuth()
  const { notebookId, noteId } = useParams<{ notebookId: string; noteId: string }>();
  const { data, refetch } = getAllNotes(notebookId);
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  // const { getInputProps, onSubmit } = useForm<CreateNote>({
  //   initialValues: {
  //     title: '',
  //     description: '',
  //     notebook_id: '',
  //     user_id: user && user.id
  //   },

  //   validate: {
  //     title: (value) => (value.length <= 3 ? 'Title is too short' : null),
  //     description: (value) => (value.length >= 8 ? null : 'Password is too short')
  //   }
  // });
  // console.log(noteId);
  const createNote = useCallback(() => {
    console.log('create note');
    close();
    refetch();
  }, [close]);

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
          <Tooltip label='Add a Note'>
            <ActionIcon variant='transparent' aria-label='Dropdown' onClick={open}>
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
            />
          ))}
        </Flex>
      </Flex>
      <Modal opened={opened} onClose={close} title='Create a Note'>
        <Button onClick={createNote}>close</Button>
      </Modal>
    </>
  );
};
