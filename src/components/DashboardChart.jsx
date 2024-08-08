//DashboardChart.jsx
/* eslint-disable react/prop-types */
import { Row, Card } from 'antd'
import { Line, Pie } from '@ant-design/charts'

const DashboardChart = ({
  balanceConfig,
  spendingConfig,
  incomeConfig,
  balanceData,
  spendingDataArray,
  incomeDataArray
}) => {
  return (
    <div>
      
        <Card
          bordered={true}
          className='shadow-xl m-8 rounded-lg min-w-[400px] flex-1'
        >
          <h2>Financial Stats</h2>
          <Line {...{ ...balanceConfig, data: balanceData }} />
        </Card>
        <Row gutter={16}>
          <Card
            bordered={true}
            className='shadow-xl m-8 rounded-lg min-w-[400px] flex-1'
          >
            <h2>Total Expense</h2>
            {spendingDataArray.length == 0 ? (
              <p>Seems like you have not spent anything till now</p>
            ) : (
              <Pie {...{ ...spendingConfig, data: spendingDataArray }} />
            )}
          </Card>

          <Card
            bordered={true}
            className='shadow-xl m-8 rounded-lg min-w-[400px] flex-1'
          >
            <h2>Total Income</h2>
            {incomeDataArray.length == 0 ? (
              <p>Seems like you have not earned anything till now</p>
            ) : (
              <Pie {...{ ...incomeConfig, data: incomeDataArray }} />
            )}
          </Card>
      </Row>
    </div>
  )
}

export default DashboardChart
