import { useLoaderData, useOutletContext } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/productCard";

export const loader = async({params}) => {

    
    const data = {};
    data.params = params
    /*
      СДЕЛАТЬ КАЖДЫЙ index.js ПО СТРУКТУРЕ 
          {свой loader} + <компонент карточки /> + <прочие товары />
              (логика отсеивания есть в книжке Порселлы)
      ДОПИЛИТЬ ЛОГИКУ ОПРЕДЕЛЕНИЯ категория-ТОВАР / категория-ПОДКАТЕГОРИЯ
      ДОБАВИТЬ ЛОГИКУ ВЫБОРА ТОВАРА ПО УМОЛЧАНИЮ
      ДОБАВИТЬ ФИЛЬТРЫ
    */
      try {
        const catalog = await prisma.catalog.findMany({
          where: {
            id: 5,
          },
          select: {
            cat: {
              select: {
                name: true,
                title: true,
                picture: true,
                content: true,
                hidden: true,
                filter: true
              }
            },
          },
        })
        const [first, ...others] = catalog[0].cat;
        data.product = first;
        data.products = others;
    } catch(e) {
        console.log('LOADER ERROR:', e);
    }
    console.log(params)
    console.log(data.params)
    return(data)
  }

export default function () {
    const data = useLoaderData();
    return (
      <ProductCard data={data} />
    )
  }