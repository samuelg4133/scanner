import React, {createContext} from 'react';

interface InputFileContextData {
  data: object;
}

const InputFileContext = createContext<InputFileContextData>(
  {} as InputFileContextData,
);

export const InputFileProvider: React.FC = ({children}) => {
  return (
    <InputFileContext.Provider value={{data: {}}}>
      {children}
    </InputFileContext.Provider>
  );
};
