import { createContext, useContext, useMemo, useState } from 'react';

const AppStateContext = createContext({
  currentList: null,
  currentUser: null
});
export function AppState({ children }) {
  const [currentList, setCurrentList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const value = useMemo(
    () => ({
      currentList,
      setCurrentList,
      currentUser,
      setCurrentUser
    }),
    [currentList]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }

  return context;
}
