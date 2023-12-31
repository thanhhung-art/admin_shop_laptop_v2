"use client";
import {
  Box,
  Button,
  Container,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import EnhancedTable from "@/components/orders/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, updateOrder } from "@/utils/fetch";
import { useMemo, useState } from "react";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import { IOrder, IOrderUpdate } from "@/types/order";
import Details from "@/components/orders/Details";
import ListProducts from "@/components/orders/ListProducts";

const Orders = () => {
  const { data, isLoading } = useQuery(["getOrders"], () => getOrders());
  const [open, setOpen] = useState(false);
  const [currOrderId, setCurrOrderId] = useState("");

  const updateOrderMutation = useMutation((data: IOrderUpdate<IOrder>) => {
    return updateOrder(currOrderId, data)
  })

  const currOrder: IOrder | null = useMemo(() => {
    if (data?.data) {
      const indexOrder = data.data.findIndex((order: IOrder) => order._id === currOrderId);
      return data.data[indexOrder]
    }
    return null
  }, [data, currOrderId]);

  const handleCloseDrawer = () => setOpen(false);
  const handleToggleDrawer = (thisOrderId: string) => {
    if (open && thisOrderId === currOrderId) {
      setOpen(false);
      return
    }
    setOpen(true)
  };

  const handleApproveOrder = () => {
    updateOrderMutation.mutate({ status: 'shipped' });
  }

  const handleRejectOrder = () => {
    updateOrderMutation.mutate({ status: 'cancelled'});
  }

  if (isLoading) return <div>loading</div>

  if (!data) return <div>loading</div>;
  
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Orders
        </Typography>
        <EnhancedTable
          orders={data.data}
          handleToggleDrawer={handleToggleDrawer}
          setCurrOrderId={setCurrOrderId}
        />
      </Container>
      <Drawer
        sx={{
          top: 0,
          width: 400,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 400,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box sx={{ px: 1, pt: 12, pb: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2" sx={{ fontSize: "16px" }}>
              {currOrderId}
            </Typography>
            <SvgIcon
              fontSize="medium"
              style={{ cursor: "pointer" }}
              onClick={handleCloseDrawer}
            >
              <CloseIcon />
            </SvgIcon>
          </Stack>
          {currOrder && (
            <Details
              id={currOrderId}
              customerName={currOrder.username}
              date={currOrder.createdAt}
              totalAmount={currOrder.totalPrice}
              status={currOrder.status}
              payment={currOrder.payment}
              phone={currOrder.phone}
              address={currOrder.address}
              address2={currOrder.address2}
              note={currOrder.note}
              email={currOrder.email}
            />
          )}

          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={handleApproveOrder} color="primary" variant="contained" sx={{ mr: 2, borderRadius: 10 }}>Approve</Button>
            <Button onClick={handleRejectOrder} color="secondary" variant="outlined" sx={{ borderRadius: 10 }}>Reject</Button>
          </Stack>
          { open && currOrderId && currOrder !== null && <ListProducts products={currOrder.products} />}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Orders;
