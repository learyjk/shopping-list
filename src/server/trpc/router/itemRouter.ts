import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const itemRouter = router({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.shoppingItem.create({
        data: {
          name: input.name,
        },
      });
      return item;
      // why not try/catch with error handling?
      // https://trpc.io/docs/error-handling
    }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.shoppingItem.findMany();
    return items;
  }),
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.shoppingItem.delete({
        where: {
          id: input.id,
        },
      });
      return item;
    }),
  toggleChecked: publicProcedure
    .input(z.object({ id: z.string(), checked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.shoppingItem.update({
        where: {
          id: input.id,
        },
        data: {
          checked: input.checked,
        },
      });
      return item;
    }),
});
