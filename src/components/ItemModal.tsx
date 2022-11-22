import { ShoppingItem } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
}

export const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [input, setInput] = useState<string>("");
  const { mutate: addItem } = trpc.item.addItem.useMutation({
    onSuccess: (shoppingItem) => {
      setItems((prev) => [...prev, shoppingItem]);
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 rounded-md bg-gray-300 p-4">
        <h3 className="text-xl font-medium">Name of Item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-100 px-4 py-2 shadow-sm focus:border-violet-300"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-md bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
            }}
            className="rounded-md bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
