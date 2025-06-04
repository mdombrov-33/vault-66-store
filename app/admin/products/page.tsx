import EmptyList from "@/components/global/EmptyList";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

async function AdminProductsPage() {
  const items = await fetchAdminProducts();
  if (items.length === 0) return <EmptyList />;
  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total products: {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">Product Name</TableHead>
            <TableHead className="text-xl">Company</TableHead>
            <TableHead className="text-xl">Price</TableHead>
            <TableHead className="text-xl">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="underline text-muted-foreground tracking-wide capitalize text-lg"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell className="text-lg">{company}</TableCell>
                <TableCell className="text-lg">{price} Caps</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function DeleteProduct({ productId }: { productId: string }) {
  //* We bind the productId directly into the action function using .bind().
  //* This creates a new version of deleteProductAction where productId is already included.
  //* So when the form is submitted, Next.js passes that { productId } as prevState to the action.
  //* This avoids using a hidden input field to send the ID manually.
  const deleteProduct = deleteProductAction.bind(null, { productId });

  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default AdminProductsPage;
