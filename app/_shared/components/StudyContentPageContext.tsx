'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface StudyContentPageState {
  isContentPage: boolean;
  setIsContentPage: (v: boolean) => void;
}

const StudyContentPageContext = createContext<StudyContentPageState>({
  isContentPage: false,
  setIsContentPage: () => {},
});

export const useStudyContentPage = () => useContext(StudyContentPageContext);

export function StudyContentPageProvider({ children }: { children: ReactNode }) {
  const [isContentPage, setIsContentPage] = useState(false);
  return (
    <StudyContentPageContext.Provider value={{ isContentPage, setIsContentPage }}>
      {children}
    </StudyContentPageContext.Provider>
  );
}
