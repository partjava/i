'use client';

import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface SimpleCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
  placeholder?: string;
}

const SimpleCodeEditor: React.FC<SimpleCodeEditorProps> = ({
  value,
  onChange,
  language,
  height = '400px',
  placeholder = '在这里编写你的代码...'
}) => {
  return (
    <TextArea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        height,
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        resize: 'none'
      }}
      className="code-editor"
    />
  );
};

export default SimpleCodeEditor; 