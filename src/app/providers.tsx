'use client';
import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import useHttp from '@/utils/http';
import Loader from '@/components/loader';
import {RoleEnum} from '@/constants/role.enum';

export const AuthContext = createContext({
  authEmail: null,
  hasLoggedIn: false,
  isAdmin: false,
  isBuyer: false,
  isSeller: false,
});

// @ts-ignore
export const ProvidersContext = createContext({
  selectedProvidersIds: [],
  setSelectedProviders: (value: number[]) => {
  },
});

export function Providers({children}: any) {
  let accessToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }
  const [hasLoggedIn, setHasLoggedIn] = useState(!!accessToken);
  const {data, isLoading} = useHttp('/users/me');
  const [authEmail, setAuthEmail] = useState(data?.email);
  const [isAdmin, setIsAdmin] = useState(data?.roleId === RoleEnum.Admin);
  const [isBuyer, setIsBuyer] = useState(data?.roleId === RoleEnum.Admin);
  const [isSeller, setIsSeller] = useState(data?.roleId === RoleEnum.Admin);
  
  const [selectedProvidersIds, setSelectedProvidersIds] = useState([]);
  const setSelectedProviders: any = (value: SetStateAction<never[]>) => setSelectedProvidersIds(value);
  
  useEffect(() => {
    setAuthEmail(data?.email);
  }, [data?.email]);
  
  useEffect(() => {
    setIsAdmin(data?.roleId === RoleEnum.Admin);
    setIsBuyer(data?.roleId === RoleEnum.Buyer);
    setIsSeller(data?.roleId === RoleEnum.Seller);
  }, [data?.roleId]);
  
  if (isLoading) {
    return <Loader size={'large'}
                   containerStyle={'h-full'}/>;
  }
  return (
    <AuthContext.Provider value={{
      hasLoggedIn,
      authEmail,
      isAdmin,
      isBuyer,
      isSeller,
    }}>
      <ProvidersContext.Provider value={{
        selectedProvidersIds,
        setSelectedProviders,
      }}>
        {children}
      </ProvidersContext.Provider>
    </AuthContext.Provider>
  );
}
