import {useCallback, useContext, useState} from 'react';
import {ProvidersContext} from '@/app/providers';
import useHttp from '@/utils/http';
import Loader from '@/components/loader';
import FlatList from 'flatlist-react';
import ProviderItem from '@/components/list/provider.item';

export default function SlideOverProviders() {
  
  const {selectedProvidersIds, setSelectedProviders} = useContext(ProvidersContext);
  
  const {data: providers, isLoading} = useHttp('/users/providers');
  
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({} as any), []);
  
  const selectProvider = (id: number, isSelected: boolean) => {
    const currentSelection = [...selectedProvidersIds];
    if (isSelected) {
      const index = currentSelection.indexOf(id as never);
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(id as never);
    }
    setSelectedProviders(currentSelection);
    forceUpdate();
  };
  
  return (
    <div>
      {isLoading && <Loader/>}
      {!isLoading &&
        <FlatList list={providers}
                  renderItem={(user: any) => {
                    const isSelected = selectedProvidersIds.includes(user.id as never);
                    return <ProviderItem key={user.id}
                                         id={user.id}
                                         name={user.email}
                                         roleId={user.roleId}
                                         isSelected={isSelected}
                                         onClick={() => selectProvider(user.id, isSelected)}
                    />;
                  }}/>}
    </div>
  );
}
