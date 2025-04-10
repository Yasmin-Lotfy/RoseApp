"use client";

import { Button } from "@/components/ui/button";
import { addProductAction } from "@/lib/actions/product.action";
import { useForm } from "react-hook-form";

export default function AddProductForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      category: "66f03d9c7568fc552ce495ee",
      subCategory: "6700135d843ecd5131dd6d15",
      brand: "670010d7a11c2dc482a5e873",
      price: 2,
      stock: 1,
      translations: [
        {
          language: "en",
          data: {
            name: "product name 3",
            overview: "product overview",
          },
        },
        {
          language: "ar",
          data: {
            name: "منتج 3",
            overview: "product overview",
          },
        },
      ],
    },
  });

  const onSubmit = async (values: { [key: string]: unknown }) => {
    console.log(values);

    const response = await addProductAction(values);

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 [&_input]:border max-w-96">
      <input type="text" placeholder="category" {...register("category")} />
      <input type="text" placeholder="sub-category" {...register("subCategory")} />
      <input type="text" placeholder="brand" {...register("brand")} />
      <input type="text" placeholder="price" {...register("price")} />
      <input type="text" placeholder="stock" {...register("stock")} />

      <input type="text" placeholder="language" {...register("translations.0.language")} />
      <input type="text" placeholder="name" {...register("translations.0.data.name")} />
      <input type="text" placeholder="overview" {...register("translations.0.data.overview")} />

      <input type="text" placeholder="language" {...register("translations.1.language")} />
      <input type="text" placeholder="name" {...register("translations.1.data.name")} />
      <input type="text" placeholder="overview" {...register("translations.1.data.overview")} />

      <Button>Submit</Button>
    </form>
  );
}
