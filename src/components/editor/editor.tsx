import { useState, useEffect, useCallback } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDebouncedValue, useIdle } from '@mantine/hooks';

import { useGetNote, useUpdateNote } from '../../service';

export interface EditorProps {
  noteId: string;
}

export const Editor = ({ noteId }: EditorProps) => {
  const { data: note, isFetching } = useGetNote(noteId);
  const { mutate: updateNote } = useUpdateNote(noteId);

  const [content, setContent] = useState<string | undefined>(note?.body || '');
  const [debounced] = useDebouncedValue(content, 2000);

  const isIdle = useIdle(10000, { initialState: false });

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content,
    onUpdate: (e) => setContent(e.editor.getHTML()),
    onBlur: () => onUpdateHandler()
  });

  const onUpdateHandler = useCallback(async () => {
    if (note && note.id === noteId) {
      updateNote({
        title: note.title,
        description: note.description,
        notebook_id: note.notebook_id,
        user_id: note.user_id,
        body: editor?.getHTML()
      });
    }
  }, [debounced]);

  useEffect(() => {
    onUpdateHandler();
  }, [debounced]);

  useEffect(() => {
    if (note && !isFetching) {
      editor?.commands.setContent(note.body || '');
      setContent(note.body);
    }
  }, [note, noteId, isFetching]);

  useEffect(() => {
    if (isIdle) {
      onUpdateHandler();
    }
  }, [isIdle]);

  return (
    <RichTextEditor
      editor={editor}
      style={{
        height: '100%',
        overflow: 'hidden'
      }}
      styles={{
        content: { width: '100%', height: '100%' }
      }}
    >
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        style={{
          paddingTop: 40,
          display: 'flex',
          height: '100%',
          width: '100%',
          overflowY: 'auto'
        }}
      />
    </RichTextEditor>
  );
};
