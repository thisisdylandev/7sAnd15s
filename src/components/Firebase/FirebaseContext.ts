import React, { useContext } from 'react';

export const FirebaseContext = React.createContext<any | null>(null);
// TODO: figure out how to fix this error without disabling the rule
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFirebase = () => useContext(FirebaseContext);
