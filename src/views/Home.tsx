import OverViewLatestProducts from "@/components/overviews/OverViewLatestProducts";
import OverviewBudget from "@/components/overviews/OverviewBudget";
import { OverviewLatestOrders } from "@/components/overviews/OverviewLatestOrders";
import OverviewSales from "@/components/overviews/OverviewSales";
import OverviewTasksProgress from "@/components/overviews/OverviewTasksProgress";
import OverviewTotalCustomers from "@/components/overviews/OverviewTotalCustomers";
import OverviewTotalProfit from "@/components/overviews/OverviewTotalProfit";
import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Overview | Admin Page</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="$24k"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid item xs={12}>
              <OverviewSales sx={{ height: "100%" }} data={{}} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OverViewLatestProducts
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <OverviewLatestOrders 
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
