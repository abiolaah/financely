/* eslint-disable react/prop-types */
import { useState } from 'react'
// import { useRef } from 'react'
import { parse, unparse } from 'papaparse'

import { Table, Select, Radio } from 'antd'
import { Option } from 'antd/es/mentions'
import { columns } from '@/lib/columnData'
import { toast } from 'sonner'

const TransactionSearch = ({
  transactions,
  addTransaction,
  fetchTransactions
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [sortKey, setSortKey] = useState('')
  // const fileInput = useRef()

  const filteredTransactions = transactions.filter(transaction => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    const tagMatch = selectedTag ? transaction.tags.includes(selectedTag) : true
    const typeMatch = typeFilter ? transaction.type === typeFilter : true

    return searchMatch && tagMatch && typeMatch
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date)
    } else if (sortKey === 'amount') {
      return a.amount - b.amount
    } else {
      return 0
    }
  })

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction
  }))

  const exportToCSV = () => {
    const csv = unparse(transactions, {
      fields: ['name', 'type', 'date', 'amount', 'tag']
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'transactions.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const importFromCSV = event => {
    event.preventDefault()
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async results => {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log('Transactions', transaction)
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount)
            }
            await addTransaction(newTransaction, true)
          }
        }
      })
      toast.success('All Transaction Added')
      fetchTransactions()
      event.target.value = null
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full py-0 px-8'>
      <div className='flex justify-between gap-4 items-center mb-4'>
        <div className='flex justify-start items-center gap-2 w-full rounded-sm py-0 px-2 '>
          <img src='/search.svg' width='16' />
          <input
            placeholder='Search by Name'
            onChange={e => setSearchTerm(e.target.value)}
            className='w-full p-2 border-0 focus:outline-none shadow-xl'
          />
        </div>

        <Select
          className='w-[30%] mr-[10] flex items-center rounded-sm py-1 px-2 shadow-xl'
          onChange={value => setTypeFilter(value)}
          value={typeFilter}
          allowClear
        >
          <Option value=''>All</Option>
          <Option value='income'>Income</Option>
          <Option value='expense'>Expense</Option>
        </Select>
      </div>

      <div className='rounded-sm p-8 mb-16 shadow-lg'>
        <div className='flex justify-between items-center w-full mb-4'>
          <h2>My Transactions </h2>

          <Radio.Group
            className='input-radio'
            onChange={e => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value=''>No Sort</Radio.Button>
            <Radio.Button value='date'>Sort By Date</Radio.Button>
            <Radio.Button value='amount'>Sort By Amount</Radio.Button>
          </Radio.Group>

          <div className='flex justify-center gap-4 w-[400px]'>
            <button
              className='items-center bg-white rounded border-2 border-solid border-blue-600 font-light text-blue-400 hover:bg-blue-600 hover:text-white w-full h-auto'
              onClick={exportToCSV}
            >
              Export to CSV
            </button>
            <label
              htmlFor='file-csv'
              className='items-center rounded border-2 border-solid border-blue-600 text-white font-light bg-blue-600 hover:bg-white hover:text-blue-400 w-full h-auto text-center'
            >
              Import from CSV
            </label>
            <input
              type='file'
              id='file-csv'
              onChange={importFromCSV}
              accept='.csv'
              required
              className='hidden'
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  )
}

export default TransactionSearch
