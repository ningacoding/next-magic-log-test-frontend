import {MdCheck} from 'react-icons/md';

export default function ProviderItem({
                                       id,
                                       name,
                                       roleId,
                                       isSelected,
                                       onClick,
                                     }: {
  id: number;
  name: string,
  roleId: number,
  isSelected: boolean,
  onClick: any,
}) {
  return <div key={id}
              className={`flex flex-row ${isSelected ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'} cursor-pointer select-none`}
              onClick={onClick}>
    <div className="p-4">
      <img
        src={`https://ui-avatars.com/api/?name=${name}&background=random`}
        alt={'Provider image'}
        className="h-12 w-12 object-cover object-center rounded-full"
      />
    </div>
    <div className="flex-1 py-4 pr-4 items-center">
      <div className={'text-gray-700'}>
        {name}
      </div>
      <div className={'text-gray-400'}>
        {roleId === 1 ? 'Administrador' : roleId === 2 ? 'Vendedor' : roleId === 3 ? 'Comprador' : 'Unknown role'}
      </div>
    </div>
    <div className={'flex items-center justify-center text-2xl text-blue-700 pr-6'}>
      {isSelected && <MdCheck/>}
    </div>
  </div>;
}
