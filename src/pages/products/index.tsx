'use client';

import MainLayout from '@/components/main.layout';
import useHttp, {useHttpMutated} from '@/utils/http';
import FlatList from 'flatlist-react';
import ProductItem from '@/components/list/product.item';
import Loader from '@/components/loader';
import Header from '@/components/page/header';
import SlideOver from '@/components/page/slide.over';
import {MdClose, MdOutlineFilterList} from 'react-icons/md';
import {PlusIcon} from '@heroicons/react/20/solid';
import {useRouter} from 'next/navigation';
import {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext, ProvidersContext} from '@/app/providers';
import SlideOverProviders from '@/components/ui/slide.over.providers';
import Input from '@/components/ui/input';

export default function Index() {
  
  const router = useRouter();
  const slideOverRef: any = useRef(null);
  const {hasLoggedIn, isAdmin, isSeller} = useContext(AuthContext);
  const {selectedProvidersIds, setSelectedProviders} = useContext(ProvidersContext);
  
  const [search, setSearch] = useState('');
  
  const {data: products, trigger: searchProducts, reset, isMutating} = useHttpMutated('/products/search', {
    search,
    providersIds: selectedProvidersIds,
  });
  
  useEffect(() => {
    if (!hasLoggedIn) {
      router.push('/login');
    }
  }, [hasLoggedIn]);
  
  const resetFilters = () => {
    setSelectedProviders([]);
    setSearch('');
    reset();
  };
  
  useEffect(() => {
    searchProducts();
  }, [search, selectedProvidersIds]);
  
  const hasSelectedProviders = selectedProvidersIds.length > 0;
  const hasFilters = (search.trim()).length > 0 || hasSelectedProviders;
  
  return (
    <MainLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-12 pt-10 lg:max-w-7xl lg:px-8">
          
          <div className={'mb-12'}>
            <Header>
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                
                {hasFilters && <span className="hidden sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={resetFilters}
                  >
                    <MdClose className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                             aria-hidden="true"/>
                    Limpiar filtros
                  </button>
                </span>}
                
                {isAdmin && <span className="ml-3 hidden sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => slideOverRef.current?.show()}
                  >
                    <MdOutlineFilterList className={`-ml-0.5 mr-1.5 h-5 w-5 ${hasSelectedProviders ? 'text-blue-600' : 'text-gray-400'}`}
                                         aria-hidden="true"/>
                    {hasSelectedProviders && selectedProvidersIds.length === 1 &&
                      <p>{selectedProvidersIds.length} proveedor seleccionado</p>}
                    {hasSelectedProviders && selectedProvidersIds.length > 1 &&
                      <p>{selectedProvidersIds.length} proveedores seleccionados</p>}
                    {!hasSelectedProviders && <p>Filtrar por proveedores</p>}
                  </button>
                </span>}
                
                {(isAdmin || isSeller) && <span className="sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => router.push('/products/create')}
                  >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5"
                              aria-hidden="true"/>
                    Agregar producto
                  </button>
                </span>}
              </div>
            </Header>
          </div>
          
          <SlideOver ref={slideOverRef}
                     title={'Filtrar por proveedores'}>
            <SlideOverProviders/>
          </SlideOver>
          
          <div>
            <Input value={search}
                   onChange={(value) => setSearch(value)}/>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            
            {isMutating && <Loader/>}
            {!isMutating &&
              <FlatList list={products}
                        renderWhenEmpty={() => <div>Agrega tu primer producto.</div>}
                        renderItem={(product: any, index) => <ProductItem key={product.id}
                                                                          id={product.id}
                                                                          name={product.name}
                                                                          sku={product.sku}
                                                                          quantity={product.quantity}
                                                                          price={product.price}
                                                                          updatedAt={product.updatedAt}
                        />}/>}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
