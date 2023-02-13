import { createContext } from 'react';

export type AdminContextValue = {
  isAdmin: boolean;
};

const AdminContext = createContext<AdminContextValue>({ isAdmin: false });

export default AdminContext;