import { Fragment } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/productCard";

export const loader = async({params}) => {

  
  const data = {};
  let subCategory = []
  let subCat = {}
  data.params = params
  /*
  СДЕЛАТЬ КАЖДЫЙ index.js ПО СТРУКТУРЕ 
      {свой loader} + <компонент карточки /> + <прочие товары />
          (логика отсеивания есть в книжке Порселлы)
  ДОПИЛИТЬ ЛОГИКУ ОПРЕДЕЛЕНИЯ категория-ТОВАР / категория-ПОДКАТЕГОРИЯ
  ДОБАВИТЬ ЛОГИКУ ВЫБОРА ТОВАРА ПО УМОЛЧАНИЮ
  ДОБАВИТЬ ФИЛЬТРЫ
  */
 try { // Проверяем запрашивается ПОДкатегория или товар
  subCategory = await prisma.catalog.findMany({
    where: {
      category: {equals: data.params.subCategoryId}
    },
    select: {
      category: true
    },
  })
  subCat = subCategory[0].category
  } catch(e) {
    console.log('33-LOADER ERROR:', e);  
  } 
  try { // Загружаем товары категории
      const catalog = await prisma.catalog.findMany({
        where: {
          category: {equals: !(subCat && Object.keys(subCat).length === 0 && Object.getPrototypeOf(subCat) === Object.prototype)?data.params.subCategoryId:data.params.categoryId}
        },
        select: !(subCat && Object.keys(subCat).length === 0 && Object.getPrototypeOf(subCat) === Object.prototype)?{
          subcat: {
            select: {
              name: true,
              title: true,
              picture: true,
              content: true,
              hidden: true,
              filter: true
            }
          },
        }:{
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
      if (!(subCat && Object.keys(subCat).length === 0 && Object.getPrototypeOf(subCat) === Object.prototype)) {
        const [first, ...others] = !(subCat && Object.keys(subCat).length === 0 && Object.getPrototypeOf(subCat) === Object.prototype)?catalog[0].subcat:catalog[0].cat;
        data.product = first
        data.products = others
      }
  } catch(e) {
      console.log('62-LOADER ERROR:', e);
  }
  if (subCat && Object.keys(subCat).length === 0 && Object.getPrototypeOf(subCat) === Object.prototype) {
    try {
        const product = await prisma.catalog.findMany({
          where: {
            category: {equals: data.params.categoryId},
          },
          select: {
            cat: {
              where: {
                name: {equals: data.params.subCategoryId}
              },
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
        const products = await prisma.catalog.findMany({
          where: {
            category: {equals: data.params.categoryId},
          },
          select: {
            cat: {
              where: {
                name: {not: data.params.subCategoryId}
              },
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
        data.product = product[0].cat[0]
        data.products = products[0].cat
    } catch(e) {
        console.log('85-LOADER ERROR:', e);
    }
  }
  

  return(data)
}
export default function () {
  const data = useLoaderData();
  return (
    <ProductCard data={data} />
  )
}