import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"

import { getOrders } from "@/api/get-orders"
import { Pagination } from "@/components/pagination"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { OrderTableFilters } from "./order-table-filters"
import { OrderTableRow } from "./order-table-row"
import { OrderTableSkeleton } from "./order-table-skeleton"

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get("orderId")
  const customerName = searchParams.get("customerName")
  const status = searchParams.get("status")

  const pageIndex = z.coerce
    .number()
    .transform(page => page - 1)
    .parse(searchParams.get("page") ?? 1)

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams(prev => {
      prev.set("page", (pageIndex + 1).toString())

      return prev
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16" />
                  <TableHead className="w-36">Identificador</TableHead>
                  <TableHead className="w-44">Realizado há</TableHead>
                  <TableHead className="w-44">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-36">Total do pedido</TableHead>
                  <TableHead className="w-40" />
                  <TableHead className="w-32" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoadingOrders && <OrderTableSkeleton />}

                {result?.orders?.map(order => (
                  <OrderTableRow
                    key={order.orderId}
                    order={order}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
