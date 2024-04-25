'use client';
import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import useHttp, {useHttpMutated} from '@/utils/http';
import Loader from '@/components/loader';
import {RoleEnum} from '@/constants/role.enum';
import useSWRMutation from 'swr/mutation';

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
  let accessToken: unknown;
  
  const {trigger: getMyData, data, isMutating} = useHttpMutated('/users/me');
  
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }
  
  const [hasLoggedIn, setHasLoggedIn] = useState(!!accessToken);
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
    setHasLoggedIn(!!accessToken);
    if (!!accessToken) {
      getMyData();
    }
  }, [accessToken]);
  
  useEffect(() => {
    setIsAdmin(data?.roleId === RoleEnum.Admin);
    setIsBuyer(data?.roleId === RoleEnum.Buyer);
    setIsSeller(data?.roleId === RoleEnum.Seller);
  }, [data?.roleId]);
  
  if (isMutating) {
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
