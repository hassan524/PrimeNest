'use client'
import { createContext, useState, ReactNode, useContext } from "react";

// Define the context type properly
interface AppContextType {
  IsLoginOpen: boolean;
  SetIsLoginOpen: (value: boolean) => void;
  IsSignOpen: boolean;
  SetIsSignOpen: (value: boolean) => void;
  IsSideBarOpen: boolean;
  SetIsSidebarOpen: (value: boolean) => void;
  IsPropertyOpen: boolean,
  SetIsPropertyOpen: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  IsLoginOpen: false,
  SetIsLoginOpen: () => {},
  IsSignOpen: false,
  SetIsSignOpen: () => {},
  IsSideBarOpen: false,
  SetIsSidebarOpen: () => {},
  IsPropertyOpen: false,
  SetIsPropertyOpen: () => {}
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [IsLoginOpen, SetIsLoginOpen] = useState(false);
  const [IsSignOpen, SetIsSignOpen] = useState(false);
  const [IsSideBarOpen, SetIsSidebarOpen] = useState(false);
  const [IsPropertyOpen, SetIsPropertyOpen] = useState(false)

  return (
    <AppContext.Provider value={{ 
      IsLoginOpen, SetIsLoginOpen, 
      IsSignOpen, SetIsSignOpen, 
      IsSideBarOpen, SetIsSidebarOpen,
      IsPropertyOpen, SetIsPropertyOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to safely use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
