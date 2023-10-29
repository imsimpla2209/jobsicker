
import { TeamOutlined } from "@ant-design/icons";
import { Badge, Button, Collapse, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Progress from "src/Components/SharedComponents/Progress";
import { locationStore } from "src/Store/commom.store";
import { useSubscription } from "src/libs/global-state-hook";
import { EComplexityGet } from "src/utils/enum";
import { currencyFormatter, pickName, randomDate } from "src/utils/helperFuncs";


export default function JobDescriptionJobDetails({ job }) {
  const { t, i18n } = useTranslation(['main']);
  const lang = i18n.language;
  const locations = useSubscription(locationStore).state

  return (
    <div className="col-lg-9 col-xs-12  mt-lg-0 d-flex flex-column" style={{ borderRadius: 10 }}>
      <div className="bg-white py-lg-4 px-4 border border-1 justify-content-sm-between d-flex py-sm-3 mt-lg-0 mt-sm-3 py-xs-5 py-2">
        <h4 style={{ color: '#6f17bd', fontWeight: 500 }}>{job?.title}</h4>
        <Badge className="text-capitalize" status={job?.currentStatus === 'open' || job?.currentStatus === 'pending' ? 'processing' : 'default'} text={job?.currentStatus} />
      </div>
      <div className="bg-white py-lg-4 px-4 border border-1 row py-sm-3 py-2">
        <Space size={'middle'} wrap>
          {
            job?.categories?.map(c => (
              <Link to="#" key={c?.name} className="advanced-search-link" style={{ fontWeight: 600, fontSize: 16 }}>
                {c?.name}
              </Link>
            ))
          }
        </Space>

        <p className="text-muted">
          {
            job?.createdAt ? new Date(`${job?.createdAt}`).toLocaleString()
              : randomDate(new Date(2022, 0, 1), new Date()).toLocaleString()
          }
        </p>
        <Space size={'small'} wrap>
          <i className="fas fa-street-view" style={{ color: "#14bff4" }}>
            {" "}
          </i>{" "}
          <Space size={'small'} wrap style={{ display: 'flex', }}>
            {
              job?.preferences?.locations?.map(l => (
                <div key={l}>
                  {locations[Number(l)].name} |
                </div>
              ))
            }
          </Space>
        </Space >
      </div>
      <div className="bg-white py-lg-4 px-4 border border-1 row py-xs-5 py-4">
        <p>{job?.description}</p>
      </div>
      <ul className="bg-white py-lg-4 px-4 border border-1 row list-group list-group-horizontal py-sm-3 py-xs-5">
        {/**/}
        {/**/}
        <li className="col list-group-item border-0">
          <div className="header">
            <span className="icon up-icon" data-cy="fixed-price">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                aria-hidden="true"
                role="img"
                width="15px"
              >
                <path d="M13.688.311L8.666 0 0 8.665 5.334 14 14 5.332 13.688.311zm-2.354 1.528a.827.827 0 11-.002 1.654.827.827 0 01.002-1.654zM6.441 9.892c-.384-.016-.761-.168-1.128-.455l-.73.729-.579-.578.73-.729a3.612 3.612 0 01-.498-.872 3.186 3.186 0 01-.223-.934l.965-.331c.018.339.094.672.229 1.002.133.325.297.586.488.777.164.164.32.264.473.295s.287-.009.4-.123a.422.422 0 00.131-.315c-.004-.123-.035-.249-.094-.381s-.146-.308-.27-.52a6.892 6.892 0 01-.39-.793 1.501 1.501 0 01-.086-.7c.028-.248.157-.486.383-.714.275-.273.596-.408.971-.402.369.008.74.149 1.109.423l.682-.682.578.577-.676.677c.176.224.326.461.446.707.121.25.205.495.252.734l-.965.354a3.638 3.638 0 00-.314-.84 2.369 2.369 0 00-.419-.616.863.863 0 00-.404-.253.344.344 0 00-.342.1.438.438 0 00-.109.458c.049.18.162.427.332.739.172.31.299.582.383.807.086.226.113.465.084.714-.03.252-.161.493-.393.723-.295.297-.635.436-1.016.422z"></path>
              </svg>
            </span>{" "}
            <strong>{currencyFormatter(job?.payment?.amount)}</strong>
          </div>{" "}
          <small className="text-muted">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t(`${job?.payment?.type}`)}
          </small>
        </li>
        {/**/}
        <li className="col list-group-item border-0">
          <div className="header">
            <span className="icon up-icon" data-cy="expertise">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                aria-hidden="true"
                role="img"
                width="15px"
              >
                <path d="M12.8 8.4l-1.3-2.3v-.8C11.6 2.4 9.2 0 6.3 0S1.1 2.4 1.1 5.3c0 1.4.5 2.6 1.4 3.5v4.5c0 .4.3.7.7.7h5.3c.4 0 .7-.3.7-.7v-1h1.7c.4 0 .7-.3.7-.7V9h.9c.4 0 .5-.3.3-.6zM8.7 5.3v.4l.7.4c-.2.5-.4.9-.8 1.3L7.9 7c-.2.2-.5.3-.8.4v.8c-.2.1-.5.1-.8.1-.3 0-.5 0-.8-.1v-.8c-.2-.1-.5-.2-.7-.4l-.7.4c-.4-.4-.7-.8-.8-1.3l.7-.4v-.9l-.7-.4c.1-.5.4-1 .8-1.3l.7.4c.2-.2.5-.3.7-.4v-.8c.3-.1.5-.1.8-.1.3 0 .5 0 .8.1v.8c.3.1.5.2.8.4l.7-.4c.4.4.6.8.8 1.3l-.7.4v.5z"></path>
                <circle cx="6.3" cy="5.3" r=".9" />
              </svg>
            </span>{" "}
            <strong>{t(EComplexityGet[Number(job?.scope?.complexity)])}</strong>
          </div>{" "}
          <small className="text-muted">
            <span className="d-none d-lg-inline">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("Experience Level")}
            </span>{" "}
          </small>
        </li>

        <li className="col list-group-item border-0">
          <div className="header">
            <span className="icon up-icon" data-cy="local">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
            </span>{" "}
            <strong>{job?.scope?.duration} {t('days')}</strong>
          </div>
          <small className="text-muted">
            <span className="d-none d-lg-inline">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("Job Duration")}
            </span>{" "}
          </small>
        </li>
        <li className="col list-group-item border-0">
          <div className="header">
            <span className="icon up-icon" data-cy="fixed-price">
              <TeamOutlined />
            </span>{" "}
            <strong>{job?.preferences?.nOEmployee}</strong>
          </div>{" "}
          <small className="text-muted">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t(`Freelancersneeded`)}
          </small>
        </li>
      </ul>
      <div className="bg-white py-lg-4 px-4 border border-1 row py-sm-3 py-xs-5">
        <span className="fw-bold">
          {t("Project type")}: <span className="fw-normal">{job?.jobType || t('Unknown')}</span>
        </span>
      </div>
      <div className="bg-white py-lg-4 px-4 border border-1 row pb-sm-3 py-xs-5">
        <h5 className="fw-bold my-4">{t("Skills and experties")}</h5>
        <div className="col">
          {job?.reqSkills?.map((skill, index) => (
            <Space key={index} size={1} className="me-sm-5 " wrap={true}>
              <Button
                key={index}
                className="btn text-light btn-sm rounded-pill cats mx-1 my-1"
              >
                {pickName(skill?.skill, lang)}:
              </Button>
              <Progress done={skill?.level} />
            </Space>
          ))}
        </div>
      </div>
      <div className="bg-white py-lg-4 px-4 border border-1 row pb-sm-3 py-xs-5">
        <h5 className="fw-bold my-4">{t("Attachments")}</h5>
        {
          job?.attachments?.length > 0 &&
          <div className="bg-white py-lg-4 px-4 border border-1 row pb-sm-3 py-xs-5">
            <h5 className="fw-bold my-4">Images</h5>
            <div className="col">
              {job?.jobImages?.map((img, index) => (
                <p key={index}><a
                  target="_blank"
                  href={img}
                  className=" mx-1"
                  // style={{ backgroundColor: "#9b9d9f" }}
                  key={index} rel="noreferrer"
                >
                  {img}
                </a></p>
              ))}
            </div>
          </div>}
      </div>
      <div className="bg-white py-lg-4 px-4 border border-1 row pb-sm-3 py-xs-5">
        <h5 className="fw-bold my-4">{t("Check Lists")}</h5>
        {
          job?.checkLists?.length ? <Collapse
            style={{ background: '#d0bfff' }}
            // expandIcon={<ThunderboltOutlined />}
            size="small"
            items={job?.checkLists?.map((c, i) => ({
              key: i,
              label: `${t("Check Lists")} (${i + 1})`,
              children: <p>{c}</p>,
            }))}
          /> : <p className="mx-1">{t('Unknown')}</p>
        }
      </div>
      <div className="bg-white py-lg-2 py-md-4 px-4 border border-1 row py-xs-5 h-100">
        <h5 className="fw-bold my-4">{t("Activity on this job")}</h5>
        <div className="pb-5">
          <p className="my-lg-1">
            {t('NumberofProposals')}: {job?.proposals?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
