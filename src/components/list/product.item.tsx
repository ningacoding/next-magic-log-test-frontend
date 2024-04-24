export default function ProductItem({
                                      id,
                                      name,
                                      sku,
                                      quantity,
                                      price,
                                      updatedAt,
                                    }: {
  id: number;
  name: string,
  sku: string,
  quantity: number,
  price: number,
  updatedAt: string,
}) {
  return <div key={id}
              className="group relative bg-gray-50 rounded-b-md hover:shadow-lg transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300">
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-200 lg:aspect-none lg:h-48">
      <img
        src={`https://picsum.photos/seed/${name + id}/200/300`}
        alt={'Product image'}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="flex justify-between p-4">
      <div>
        <h3 className="text-sm text-gray-700">
          <a href={'#'}>
                        <span aria-hidden="true"
                              className="absolute inset-0"/>
            {name}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {sku}
        </p>
      </div>
      <p className="text-sm font-medium text-gray-900">
        ${(+price||0).toFixed(2)}
      </p>
    </div>
  </div>;
}
