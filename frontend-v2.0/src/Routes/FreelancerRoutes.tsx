import Footer from "Components/BeforeLoginComponents/Footer";
import Header from "Components/BeforeLoginComponents/Header";
import ReviewProposalsCard from "Components/ClientComponents/ReviewProposalsCard";
import { SearchContextProvider } from "Context/SearchContext";
import AllContracts from "pages/ClientPages/AllContract";
import Reports from "pages/ClientPages/Reports";
import EmailVerified from "pages/EmailVerification/EmailVerified";
import PleaseVerifiy from "pages/EmailVerification/PleaseVerifiy";
import Contract from "pages/FreelancerPages/Contract";
import CreateProfile from "pages/FreelancerPages/CreateProfile";
import HomeFreelancer from "pages/FreelancerPages/HomeFreelancer";
import JobAppliedDetails from "pages/FreelancerPages/JobAppliedDetails";
import JobDetailsFreelancer from "pages/FreelancerPages/JobDetailsFreelancer";
import MyJobs from "pages/FreelancerPages/MyJobs";
import MyStats from "pages/FreelancerPages/MyStats";
import Offers from "pages/FreelancerPages/Offers";
import Profile from "pages/FreelancerPages/Profile";
import Proposals from "pages/FreelancerPages/Proposals";
import BuyConnects from "pages/FreelancerPages/Reports/BuyConnects";
import OverviewReports from "pages/FreelancerPages/Reports/OverviewReports";
import BillingByClients from "pages/FreelancerPages/Reports/billingbyclient";
import ConnectsHistory from "pages/FreelancerPages/Reports/connectshistory";
import SavedJobs from "pages/FreelancerPages/SavedJobs";
import Search from "pages/FreelancerPages/Search";
import Messages from "pages/Messages";
import Notifications from "pages/Notifications";
import PageNotFound from "pages/PageNotFound";
import SubmitProposal from "pages/Submit Proposal";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

export default function FreelancerRoutes() {
  const [arr, setarr] = useState([]);
  const [itemSearchList, setitemSearchList] = useState("");
  const [searchList, setsearchList] = useState([]);
  const [switchJobs, setswitchJobs] = useState("")
  // const { pathname } = useLocation();
  // pathname === "/" && navigate("/find-work");
  return (
    <>
      <SearchContextProvider
        value={{ arr, setarr, itemSearchList, setitemSearchList, searchList, setsearchList, switchJobs, setswitchJobs }}
      >
        <Header />
        <div>
          <Routes>
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/find-work" element={<HomeFreelancer />} />
            <Route path="/" element={<HomeFreelancer />} />
            <Route path="/Search/:searchValue" element={<Search />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/job/" element={<JobDetailsFreelancer />} />
            <Route path="/job/:id" element={<JobDetailsFreelancer />} />
            <Route path="/job/apply/:id" element={<SubmitProposal />} />
            <Route
              path="/job/review-proposal/:id"
            
              element={<ReviewProposalsCard />}
            />
            <Route path="/job/applied/:id" element={<JobAppliedDetails />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/email-verification" element={<EmailVerified />} />
            <Route
              path="/sign-up/please-verify"
            
              element={<PleaseVerifiy />}
            />
            <Route path="/my-stats" element={<MyStats />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/all-contract" element={<AllContracts />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/overview" element={<OverviewReports />} />
            <Route path="/my-reports" element={<Reports />} />
            <Route path="/life-time-billing" element={<BillingByClients />} />
            <Route path="/connects-history" element={<ConnectsHistory />} />
            <Route path="/buyconnects" element={<BuyConnects />} />
            {/* <Route
              path="/transaction-history"
            
              element={<TransactionHistory />}
            /> */}
            <Route path="/messages" element={<Messages location={undefined} />} />
            <Route path="/contract" element={<Contract location={undefined} />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="**" element={<PageNotFound />} />
          </Routes>
        </div>
      </SearchContextProvider>
      <Footer />
    </>
  );
}