import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';

const content = 'test content';

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content
  });
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
