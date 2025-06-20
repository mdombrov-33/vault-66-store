import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { fetchUserOrders } from '@/utils/actions/order'
import SectionTitle from '@/components/global/SectionTitle'
import { formatDate } from '@/utils/format'

async function OrdersPage() {
  const orders = await fetchUserOrders()
  if (!orders || orders.length === 0) {
    return <SectionTitle text=":: TRANSACTION LOG EMPTY ::" />
  }

  return (
    <>
      <SectionTitle text="TRANSACTION LOG" />
      <Table>
        <TableCaption className="text-md md:text-xl">
          Logged Transactions: {orders.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl md:text-2xl xl:text-3xl">Items</TableHead>
            <TableHead className="text-xl md:text-2xl xl:text-3xl">Total Caps Spent</TableHead>
            <TableHead className="text-xl md:text-2xl xl:text-3xl">Scavenger&#39;s Tax</TableHead>
            <TableHead className="text-xl md:text-2xl xl:text-3xl">Courier Fee</TableHead>
            <TableHead className="text-xl md:text-2xl xl:text-3xl">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { id, products, orderTotal, shipping, tax, createdAt } = order
            return (
              <TableRow key={id}>
                <TableCell className="text-lg md:text-2xl xl:text-3xl">{products}</TableCell>
                <TableCell className="text-lg md:text-2xl xl:text-3xl">{orderTotal} Caps</TableCell>
                <TableCell className="text-lg md:text-2xl xl:text-3xl">{tax} Caps</TableCell>
                <TableCell className="text-lg md:text-2xl xl:text-3xl">{shipping} Caps</TableCell>
                <TableCell className="text-lg md:text-2xl xl:text-3xl">
                  {formatDate(createdAt)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default OrdersPage
