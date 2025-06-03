import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchAdminOrders } from "@/utils/actions";
import { formatDate } from "@/utils/format";

async function SalesPage() {
  const orders = await fetchAdminOrders();

  if (!orders || orders.length === 0) {
    return <SectionTitle text="sales data is not available" />;
  }

  return (
    <Table>
      <TableCaption className="text-md md:text-xl">
        Total Orders: {orders.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg md:text-2xl xl:text-3xl">
            Email
          </TableHead>
          <TableHead className="text-lg md:text-2xl xl:text-3xl">
            Products
          </TableHead>
          <TableHead className="text-lg md:text-2xl xl:text-3xl">
            Order Total
          </TableHead>
          <TableHead className="text-lg md:text-2xl xl:text-3xl">Tax</TableHead>
          <TableHead className="text-lg md:text-2xl xl:text-3xl">
            Shipping
          </TableHead>
          <TableHead className="text-lg md:text-2xl xl:text-3xl">
            Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const { id, products, orderTotal, shipping, tax, createdAt, email } =
            order;
          return (
            <TableRow key={id}>
              <TableCell className="text-lg md:text-2xl xl:text-3xl">
                {email}
              </TableCell>
              <TableCell className="text-lg md:text-2xl xl:text-3xl">
                {products}
              </TableCell>
              <TableCell className="text-lg md:text-2xl xl:text-3xl">
                {orderTotal} Caps
              </TableCell>
              <TableCell className="text-lg md:text-2xl xl:text-3xl">
                {tax} Caps
              </TableCell>
              <TableCell className="text-lg md:text-2xl xl:text-3xl">
                {shipping} Caps
              </TableCell>
              <TableCell className="text-lg md:text-2xl xl:text-3xl">
                {formatDate(createdAt)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default SalesPage;
