/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-script-url */

import { Pagination } from "antd";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { clientStore, userStore } from "src/Store/user.store";
import { getJobs } from "src/api/job-apis";
import { useSubscription } from "src/libs/global-state-hook";
import s1 from "../../../assets/img/jobslide1.jpg";
import { default as s2, default as s3 } from "../../../assets/img/jobslide2.jpg";
import j1 from "../../../assets/svg/jobs1.svg";
import j2 from "../../../assets/svg/jobs2.svg";
import j3 from "../../../assets/svg/jobs3.svg";
import j4 from "../../../assets/svg/jobs4.svg";
import Loader from "../../SharedComponents/Loader/Loader";
import ClientJobCard from "../ClientJobCard";
import "./HomeLayout.css";

export default function HomeLayout() {
  const { t, i18n } = useTranslation(['main']);
  const lang = i18n.language;
  const client = useSubscription(clientStore).state
  const user = useSubscription(userStore).state;
  const [jobs, setJobs] = useState<any>([]);
  const [proposals, setProposals] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    if (client?._id || client?.id) {
      handleGetData();
    }
  }, [client]);

  const handleGetData = (p?: number | undefined, ps?: number | undefined) => {
    setLoading(true);
    return getJobs({ client: client?._id || client?.id, page: p || page, limit: ps || pageSize }).then((res) => {
      setJobs(res?.data?.results)
      setTotal(res?.data?.totalResults)
    }).catch(err => {
      toast.error('something went wrong, ', err)
    }).finally(() => setLoading(false));
  }

  const handleChangePageJob = useCallback((p: number) => {
    if (p === page) return
    setPage(p)
    handleGetData(p)
  }, [handleGetData, page])

  const handleChangePageSizeJob = useCallback((ps: number) => {
    if (ps === pageSize) return
    setPageSize(ps)
    handleGetData(undefined, ps)
  }, [handleGetData, pageSize])

  return (
    <>
      {
        user?.name
          ?
          <div className="container container-fluid-sm my-lg-4">
            <div className="row px-5 my-5">
              <div className="col-lg-8 col-xs-12">
                <div className="row my-3">
                  <div className="col-4">
                    <h4>{user.name}</h4>
                  </div>
                </div>
                <div className="list-group-item py-lg-4 mb-2">
                  <h4 className="d-inline-block">{t("My Job Postings")} {`(${total})`}</h4>
                  <Link to="/all-job-posts" className="float-sm-end mt-0">
                    {t("All Job Posts")}
                  </Link>
                </div>
                {jobs ? (
                  <div className="border p-2">
                    {
                      !loading
                        ? jobs?.map((item, index) => (
                          <div key={index}>
                            <ClientJobCard item={item} client={client} lang={lang} />
                          </div>
                        ))
                        : <div className="d-flex justify-content-center align-items-center" style={{ height: "10vh" }}>
                          <Loader />
                        </div>
                    }

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <Pagination
                        className="mt-5"
                        total={total}
                        pageSize={pageSize}
                        current={page}
                        showSizeChanger
                        showQuickJumper
                        responsive
                        onChange={(p) => handleChangePageJob(p)}
                        onShowSizeChange={(_, s) => handleChangePageSizeJob(s)}
                        showTotal={(total) => `Total ${total} items`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col-lg-9 p-lg-3">No posts yet</div>
                    </div>
                  </div>
                )}

                <div className="card mt-5">
                  <div className="card-body">
                    <h5 className="card-title">{t("How it works")}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex">
                      <div className="col-4">
                        <img src={j1} width="150em" />
                      </div>
                      <div className="col-6">
                        <div className="media-body">
                          <h4 className="m-0-top-bottom">
                            {t("1. Post a job to get free quotes")}
                          </h4>
                          <p className="m-xs-top-bottom">
                            {t(
                              "Write a clear, detailed description of your job to share with qualified freelancers. Start receiving proposals in less than 24 hours"
                            )}
                            .
                          </p>
                          <a
                            href="https://www.upwork.com/hiring/writing-an-awesome-job-post/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("View great job post examples")}
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item d-flex">
                      <div className="col-4">
                        <img src={j2} width="150em" />
                      </div>
                      <div className="col-6">
                        <div className="media-body">
                          <h4 className="m-0-top-bottom">
                            {t("2. Evaluate freelancers and hire")}
                          </h4>
                          <p className="m-xs-top-bottom">
                            {t(
                              "Review proposals or invite qualified freelancers to your project. Quickly chat live or video call with favorites, and offer a contract to the best match."
                            )}
                          </p>
                          <a
                            href="https://www.upwork.com/hiring/education/how-to-hire-freelancers/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("Review tips on finding freelancer")}
                          </a>
                          <br />
                          <a
                            href="https://www.upwork.com/hiring/startup/how-to-choose-and-interview-freelancer/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("Prepare to interview freelancers")}
                          </a>
                          <div className="ng-hide">
                            <a href="#">{t("Contact your Freelancer Specialist")}</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item d-flex">
                      <div className="col-4">
                        <img src={j3} width="150em" />
                      </div>
                      <div className="col-6">
                        <div className="media-body">
                          <h4 className="m-0-top-bottom">
                            {t("3. Work together")}
                          </h4>
                          <p className="m-xs-top-bottom">
                            {t("Use")}{" "}
                            <a
                              href="https://www.upwork.com/hiring/for-clients/upwork-messages-your-one-stop-collaboration-tool/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {t("JobSickers Messages")}
                            </a>{" "}
                            {t(
                              "to securely chat, share files, and collaborate on projects. View progress against project goals with the"
                            )}
                            <a
                              href="https://www.upwork.com/hiring/for-clients/whats-the-work-diary-and-why-to-use-it/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {" "}
                              {t("Work Diary")}
                            </a>{" "}
                            {t("tool")} .
                          </p>
                          <a
                            href="https://www.upwork.com/i/trust-safety-mission//#/clients"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("See tips for staying safe on JobSickers")}
                          </a>
                        </div>
                      </div>
                    </li>{" "}
                    <li className="list-group-item d-flex">
                      <div className="col-4">
                        <img src={j4} width="150em" />
                      </div>
                      <div className="col-6">
                        <div className="media-body">
                          <h4 className="m-0-top-bottom">
                            {t("4. Pay and invoice through JobSickers")}
                          </h4>
                          <p className="m-xs-top-bottom">
                            {t(
                              "Get invoices and make payments after reviewing time billed or approving milestones. With"
                            )}
                            <a
                              href="https://www.upwork.com/hiring/for-clients/how-to-manage-your-first-project-with-upwork-payment-protection/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {t("JobSickers Payment Protection")}
                            </a>
                            , {t("only pay for work you authorize")} .
                          </p>
                          <a
                            href="https://www.upwork.com/i/pricing/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("Learn about JobSickers pricing")}
                          </a>
                          <br />
                          <a
                            href="https://www.upwork.com/hiring/startup/how-much-to-pay-freelancer/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("Determine how much to pay freelancers")}
                          </a>
                        </div>
                      </div>
                    </li>{" "}
                  </ul>
                  <div className="card-body">
                    <h4 className="card-link">{t("Question?")}</h4>
                    <p>
                      {t("Visit")} <a className="card-link">{t("help center")}</a>{" "}
                      {t("to contact")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col d-none d-lg-block">
                <div className="my-lg-1">
                  <Link to="/post-job" style={{
                    padding: 4, color: "white",
                    background: 'linear-gradient(92.88deg, #455eb5 9.16%, #5643cc 43.89%, #673fd7 64.72%)'
                  }} className="btn bg-upwork">
                    {t("Post a job")}
                  </Link>
                </div>

                <div className="my-3 mt-4">
                  <div className="card">
                    <div className="">
                      <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img src={s1} className="d-block w-100" alt="..." />
                          </div>
                          <div className="carousel-item">
                            <img src={s2} className="d-block w-100" alt="..." />
                          </div>
                          <div className="carousel-item">
                            <img src={s3} className="d-block w-100" alt="..." />
                          </div>
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">{t("Previous")}</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">{t("Next")}</span>
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{t("Web Design")}</h5>
                      <p className="card-text">
                        {t("You think you might like help")}
                      </p>
                      <a href="#" className="btn bg-upwork ">
                        {t("learn More")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <Loader />
          </div>
      }
    </>
  );
}


