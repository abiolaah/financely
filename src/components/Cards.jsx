//Cards.jsx
/* eslint-disable react/prop-types */

import { formattedCurrency } from '@/lib/helper'
import { Card, Row } from 'antd'

const Cards = ({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  reset
}) => {
  return (
    <div>
      <Row className='flex gap-2 justify-evenly lg: flex-row lg:gap-2'>
        <Card
          bordered={true}
          className='shadow-xl m-4 rounded-lg flex-1 lg:m-8 min-w-[350px]'
        >
          <h2>Current Balance</h2>
          <p>{formattedCurrency.format(currentBalance)}</p>
          <div
            className='bg-blue-600 text-center w-full my-2 mx-0 m-0 p-2 text-white border border-solid border-blue-600 rounded cursor-pointer flex items-center justify-center h-auto hover:bg-white hover:text-blue-600'
            onClick={reset}
          >
            Reset Balance
          </div>
        </Card>
        <Card
          bordered={true}
          className='shadow-xl m-4 rounded-lg flex-1 lg:m-8 min-w-[350px]'
        >
          <h2>Total Income</h2>
          <p>{formattedCurrency.format(income)}</p>
          <div
            className='bg-blue-600 text-center w-full my-2 mx-0 m-0 p-2 text-white border border-solid border-blue-600 rounded cursor-pointer flex items-center justify-center h-auto hover:bg-white hover:text-blue-600'
            onClick={showIncomeModal}
          >
            Add Income
          </div>
        </Card>
        <Card
          bordered={true}
          className='shadow-xl m-4 rounded-lg flex-1 lg:m-8 min-w-[350px]'
        >
          <h2>Total Expense</h2>
          <p>{formattedCurrency.format(expenses)}</p>
          <div
            className='bg-blue-600 text-center w-full my-2 mx-0 m-0 p-2 text-white border border-solid border-blue-600 rounded cursor-pointer flex items-center justify-center h-auto hover:bg-white hover:text-blue-600'
            onClick={showExpenseModal}
          >
            Add Expense
          </div>
        </Card>
      </Row>
    </div>
  )
}

export default Cards
