'use client';

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface CodeBlockProps {
  language: string;
  children: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  return (
    <div className="code-block">
      <SyntaxHighlighter
        language={language}
        style={{}}
        customStyle={{
          margin: 0,
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}; 