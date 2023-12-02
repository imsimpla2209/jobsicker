import ReactApexChart from 'react-apexcharts'
import { Row, Col, Typography } from 'antd'
import eChart from './configs/eChart'
import { ApexOptions } from 'apexcharts'

function EChart() {
  const { Title, Paragraph } = Typography

  const items = [
    {
      Title: '3,6K',
      user: 'Users',
    },
    {
      Title: '2m',
      user: 'Clicks',
    },
    {
      Title: '$772',
      user: 'Sales',
    },
    {
      Title: '82',
      user: 'Items',
    },
  ]

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options as ApexOptions}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Revenue</Title>
        <Paragraph className="lastweek">{/* than last week <span className="bnb2">+30%</span> */}</Paragraph>
        <Paragraph className="lastweek">
        </Paragraph>
        {/* <Row>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row> */}
      </div>
    </>
  )
}

export default EChart
