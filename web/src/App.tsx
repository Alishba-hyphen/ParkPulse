import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Landing } from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import MapPage from "@/pages/MapPage";
import LotsList from "@/pages/LotsList";
import LotDetail from "@/pages/LotDetail";
import SavedLots from "@/pages/SavedLots";
import { ParkingProvider } from "@/context/ParkingContext";
import { PrototypeMobile } from "@/pages/PrototypeMobile";
import { Comparison } from "@/pages/Comparison";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/map" component={MapPage} />
      <Route path="/lots" component={LotsList} />
      <Route path="/lots/:id" component={LotDetail} />
      <Route path="/saved" component={SavedLots} />
      <Route path="/prototype" component={PrototypeMobile} />
      <Route path="/compare" component={Comparison} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ParkingProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </ParkingProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
