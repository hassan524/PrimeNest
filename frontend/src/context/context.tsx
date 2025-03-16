'use client';
import { createContext, useState, ReactNode, useContext } from "react";

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  tags: string[];
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  userId: string;
  propertyType: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  favorites: string[]; 
  properties: string[]; 
}

interface AppContextType {
  IsLoginOpen: boolean;
  SetIsLoginOpen: (value: boolean) => void;
  IsSignOpen: boolean;
  SetIsSignOpen: (value: boolean) => void;
  IsSideBarOpen: boolean;
  SetIsSidebarOpen: (value: boolean) => void;
  IsPropertyOpen: boolean;
  SetIsPropertyOpen: (value: boolean) => void;
  Properties: Property[] | null;
  SetProperties: (value: Property[] | null) => void;
  OriginolProperties: Property[] | null;
  SetOriginolProperties: (value: Property[] | null) => void;
  Users: IUser[]; // Storing an array of IUser objects
  SetUsers: (value: IUser[]) => void;
  IsConnectionDisable: boolean;
  SetIsConnectionDisable: (value: boolean) => void;
}

// Default Context Values
export const AppContext = createContext<AppContextType>({
  IsLoginOpen: false,
  SetIsLoginOpen: () => {},
  IsSignOpen: false,
  SetIsSignOpen: () => {},
  IsSideBarOpen: false,
  SetIsSidebarOpen: () => {},
  IsPropertyOpen: false,
  SetIsPropertyOpen: () => {},
  Properties: null,
  SetProperties: () => {},
  OriginolProperties: null,
  SetOriginolProperties: () => {},
  Users: [],
  SetUsers: () => {},
  IsConnectionDisable: false,
  SetIsConnectionDisable: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [IsLoginOpen, SetIsLoginOpen] = useState(false);
  const [IsSignOpen, SetIsSignOpen] = useState(false);
  const [IsSideBarOpen, SetIsSidebarOpen] = useState(false);
  const [IsPropertyOpen, SetIsPropertyOpen] = useState(false);
  const [IsConnectionDisable, SetIsConnectionDisable] = useState(false);
  
  const [Properties, SetProperties] = useState<Property[] | null>(null);
  const [OriginolProperties, SetOriginolProperties] = useState<Property[] | null>(null);
  const [Users, SetUsers] = useState<IUser[]>([]); // Fixed type here

  return (
    <AppContext.Provider
      value={{
        IsLoginOpen,
        SetIsLoginOpen,
        IsSignOpen,
        SetIsSignOpen,
        IsSideBarOpen,
        SetIsSidebarOpen,
        IsPropertyOpen,
        SetIsPropertyOpen,
        Properties,
        SetProperties,
        OriginolProperties,
        SetOriginolProperties,
        Users,
        SetUsers,
        IsConnectionDisable,
        SetIsConnectionDisable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to safely use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
