
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { prisma } from '~/db';
import ProductCard from "~/components/productCard";

export const loader = async({params}) => {
  const data = {};
    data.params = params
    try {
        const catalog = await prisma.catalog.findMany({
          where: {
            category: {equals: data.params.categoryId},
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

    return(data)
  }

export default function () {
  const data = useLoaderData();
  return (
    <ProductCard data={data} />
  )
}