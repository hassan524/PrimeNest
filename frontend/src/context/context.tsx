'use client'
import { createContext, useState, ReactNode, useContext } from "react";

// Define the context type
interface AppContextType {
  IsLoginOpen: boolean;
  SetIsLoginOpen: (value: boolean) => void;
  IsSignOpen: boolean;
  SetIsSignOpen: (value: boolean) => void;
  IsSideBarOpen: boolean;
  SetIsSidebarOpen: (value: boolean) => void;
  IsPropertyOpen: boolean;
  SetIsPropertyOpen: (value: boolean) => void;
  Properties: any[];
  SetProperties: (value: any[]) => void;
  OriginolProperties: any[],
  SetOriginolProperties: (value: any[]) => void;
  Users: any[];
  SetUsers: (value: any[]) => void;
  IsConnectionDisable: boolean;
  SetIsConnectionDisable: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  IsLoginOpen: false,
  SetIsLoginOpen: () => { },
  IsSignOpen: false,
  SetIsSignOpen: () => { },
  IsSideBarOpen: false,
  SetIsSidebarOpen: () => { },
  IsPropertyOpen: false,
  SetIsPropertyOpen: () => { },
  Properties: [],
  SetProperties: () => { },
  OriginolProperties: [],
  SetOriginolProperties: () => { },
  Users: [],
  SetUsers: () => { },
  IsConnectionDisable: false,
  SetIsConnectionDisable: () => {}
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [IsLoginOpen, SetIsLoginOpen] = useState(false);
  const [IsSignOpen, SetIsSignOpen] = useState(false);
  const [IsSideBarOpen, SetIsSidebarOpen] = useState(false);
  const [IsPropertyOpen, SetIsPropertyOpen] = useState(false);
  
  const [IsConnectionDisable, SetIsConnectionDisable] = useState(false)

  const [Properties, SetProperties] = useState<any>(null);
  const [OriginolProperties, SetOriginolProperties] = useState<any>(null);
  const [Users, SetUsers] = useState<any>()

  return (
    <AppContext.Provider value={{
      IsLoginOpen, SetIsLoginOpen,
      IsSignOpen, SetIsSignOpen,
      IsSideBarOpen, SetIsSidebarOpen,
      IsPropertyOpen, SetIsPropertyOpen,
      Properties, SetProperties, OriginolProperties, SetOriginolProperties,
      Users, SetUsers, IsConnectionDisable, SetIsConnectionDisable
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to safely use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
