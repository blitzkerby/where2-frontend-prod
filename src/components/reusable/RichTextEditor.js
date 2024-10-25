import React, { useState } from 'react';
import { Bold, Link as LinkIcon, List } from 'lucide-react';

const RichTextEditor = ({ value, onChange }) => {
  const [text, setText] = useState(value || '');
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText);
  };

  const saveSelection = () => {
    const textarea = document.getElementById('rich-textarea');
    setSelection({
      start: textarea.selectionStart,
      end: textarea.selectionEnd
    });
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById('rich-textarea');
    const start = selection.start;
    const end = selection.end;
    const currentText = textarea.value;
    let newText = '';

    switch (format) {
      case 'bold':
        newText = currentText.slice(0, start) + '**' + 
                  currentText.slice(start, end) + '**' + 
                  currentText.slice(end);
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newText = currentText.slice(0, start) + '[' + 
                    currentText.slice(start, end) + '](' + url + ')' + 
                    currentText.slice(end);
        }
        break;
      case 'bullet':
        // Split selected text into lines and add bullets
        const selectedText = currentText.slice(start, end);
        const bulletedText = selectedText
          .split('\n')
          .map(line => line.trim() ? '- ' + line : line)
          .join('\n');
        newText = currentText.slice(0, start) + bulletedText + currentText.slice(end);
        break;
      default:
        return;
    }

    setText(newText);
    onChange(newText);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2 p-2 bg-gray-100 rounded">
        <button
          onClick={() => insertFormatting('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => insertFormatting('link')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>
        <button
          onClick={() => insertFormatting('bullet')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List size={16} />
        </button>
      </div>
      <textarea
        id="rich-textarea"
        value={text}
        onChange={handleTextChange}
        onSelect={saveSelection}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter description (supports markdown formatting)"
      />
      <div className="mt-2 text-sm text-gray-500">
        Formatting tips:
        <ul className="list-disc ml-4">
          <li>Use **text** for bold</li>
          <li>Click link button to add URLs</li>
          <li>Select text and click bullet for lists</li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditor;