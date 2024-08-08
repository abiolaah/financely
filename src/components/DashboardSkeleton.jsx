// import React from 'react'

import { Skeleton } from './ui/skeleton'
import { Card, Row, Col } from 'antd'

const DashboardSkeleton = () => {
  return (
    <div>
      <Skeleton.Button active={true} size="large" shape="round" className="mb-6" />
      <Row gutter={16}>
        {/* Cards Skeleton */}
        <Col span={8}>
          <Card className="shadow-xl m-4 rounded-lg min-w-[400px]">
            <Skeleton active={true} paragraph={{ rows: 1 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-xl m-4 rounded-lg min-w-[400px]">
            <Skeleton active={true} paragraph={{ rows: 1 }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-xl m-4 rounded-lg min-w-[400px]">
            <Skeleton active={true} paragraph={{ rows: 1 }} />
          </Card>
        </Col>
      </Row>

      {/* Line Chart Skeleton */}
      <Card className="shadow-xl m-8 rounded-lg min-w-[400px] flex-1">
        <Skeleton active={true} title={false} paragraph={{ rows: 4 }} />
      </Card>

      {/* Pie Charts Skeleton */}
      <Row gutter={16}>
        <Col span={12}>
          <Card className="shadow-xl m-8 rounded-lg min-w-[400px] flex-1">
            <Skeleton active={true} title={false} paragraph={{ rows: 4 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="shadow-xl m-8 rounded-lg min-w-[400px] flex-1">
            <Skeleton active={true} title={false} paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardSkeleton
