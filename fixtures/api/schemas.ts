import { z } from 'zod';



export const ProductsListResponseSchema = z.object({
    products: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            price: z.string(),
            brand: z.string(),
            category: z.object({
                usertype: z.object({
                    usertype: z.string(),
                }),
                category: z.string(),
            }),
        })
    ).nonempty(), // ensures array is not empty
});

