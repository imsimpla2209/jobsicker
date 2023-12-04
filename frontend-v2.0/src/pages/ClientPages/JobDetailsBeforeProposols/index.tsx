import { ExclamationCircleFilled } from '@ant-design/icons'
import { Badge, Button, Card, Col, Modal, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import ClientJobDetails from 'src/Components/ClientComponents/ClientJobDetails'
import SimilarJobsOnJobSickers from 'src/Components/FreelancerComponents/SimilarJobsOnJobSickers'
import { clientStore } from 'src/Store/user.store'
import { getContracts } from 'src/api/contract-apis'
import { deleteJob, getJob } from 'src/api/job-apis'
import { useSubscription } from 'src/libs/global-state-hook'
import Loader from '../../../Components/SharedComponents/Loader/Loader'
import { EStatus } from 'src/utils/enum'

const { confirm } = Modal

export const { Title, Paragraph, Text } = Typography

export default function JobDetailsBeforeProposals() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [jobData, setJobData] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const client = useSubscription(clientStore).state
  const [contracts, setContracts] = useState([])
  console.log('😘contracts', contracts)
  useEffect(() => {
    getJob(id).then(res => {
      setJobData(res.data)
    })
    getContracts({
      client: client._id || client.id,
      job: id,
      currentStatus: EStatus.ACCEPTED,
    }).then(res => setContracts(res.data.results))
  }, [id])

  const { t } = useTranslation(['main'])

  const handleDeleteJob = async () => {
    setDeleting(true)
    await deleteJob(id).then(res => {
      setDeleting(false)
      navigate('/')
    })
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this posted job?',
      icon: <ExclamationCircleFilled />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        handleDeleteJob()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const isCurrentClientJob = (client.id || client?._id) === jobData?.client?._id
  return (
    <>
      {jobData !== null ? (
        <div className="container-md container-fluid-sm py-xs-5 px-md-5">
          <div className="d-lg-block">
            <Row align={'middle'} style={{ padding: '20px 0px', justifyContent: 'space-between' }}>
              <Title style={{ margin: 0 }}>{t('Job details')}</Title>
              {isCurrentClientJob ? (
                <Space>
                  <Button type="primary">Edit</Button>
                  <Button type="primary" danger onClick={showDeleteConfirm} loading={deleting}>
                    Delete
                  </Button>
                </Space>
              ) : null}
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={18}>
                <ClientJobDetails job={jobData} />
              </Col>
              <Col span={6}>
                <Card>
                  <h5 className="fw-bold " style={{ margin: 0 }}>
                    {t('Activity on this job')}
                  </h5>

                  <Paragraph className="mt-3" style={{ color: 'black' }}>
                    <ul>
                      <li>
                        <span style={{ marginRight: 10 }}>{t('Current status')}:</span>
                        <Badge
                          className="text-capitalize"
                          status={
                            jobData?.currentStatus === 'open' || jobData?.currentStatus === 'pending'
                              ? 'processing'
                              : 'default'
                          }
                          text={jobData?.currentStatus}
                        />
                      </li>
                      <li>
                        <span style={{ marginRight: 10 }}>{t('NumberofProposals')}:</span>
                        <strong>{jobData?.proposals?.length || 0}</strong>
                      </li>
                    </ul>
                  </Paragraph>

                  <Row>
                    {isCurrentClientJob && jobData?.proposals?.length ? (
                      <Button block>
                        <Link to={`/all-proposals/${jobData?._id}`}>{t('View all proposals')}</Link>
                      </Button>
                    ) : null}
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="row  me-md-1">
            <div className="col-lg-12 col-xs-12">
              <SimilarJobsOnJobSickers id={jobData?._id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
          <Loader />
        </div>
      )}
    </>
  )
}
