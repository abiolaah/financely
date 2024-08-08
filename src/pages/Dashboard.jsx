/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
//Dashboard.jsx
import { Suspense, useEffect, useState } from 'react'
import moment from 'moment'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import {
  addDoc,
  collection,
  getDocs,
  query,
  writeBatch
} from 'firebase/firestore'

import Cards from '@/components/Cards'
import Header from '@/components/Header'
import AddExpense from '@/components/modals/AddExpense'
import AddIncome from '@/components/modals/AddIncome'

// import { sampleTransactions } from '@/lib/testData'
import DashboardSkeleton from '@/components/DashboardSkeleton'
import NoTransactions from '@/components/NoTransactions'
import TransactionSearch from '@/components/TransactionSearch'
import { processChartData } from '@/lib/helper'
import DashboardChart from '@/components/DashboardChart'
import { toast } from 'sonner'

const Dashboard = () => {
  //get user that is signed in
  const [user] = useAuthState(auth)

  //declare the states needed
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true)
  }

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true)
  }

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false)
  }

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false)
  }

  const reset = async () => {
    console.log('resetting....')
    try {
      // Fetch all transactions from the user's collection
      const q = query(collection(db, `users/${user.uid}/transactions`))
      const querySnapshot = await getDocs(q)

      // Delete each transaction
      const batch = writeBatch(db) // Create a batch for efficient deletion
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref)
      })

      await batch.commit() // Commit the batch deletion

      // Reset the states
      setTransactions([])
      setIncome(0)
      setExpenses(0)
      setCurrentBalance(0)

      toast.success('Balance and transactions reset successfully!')
    } catch (error) {
      console.error('Error resetting transactions: ', error)
      toast.error('Failed to reset transactions')
    }
  }

  const onFinish = (values, type) => {
    // console.log('On Finish', values, type)
    const newTransaction = {
      type: type,
      date: moment(values.date).format('YYYY-MM-DD'),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
    }

    addTransaction(newTransaction)
    setIsExpenseModalVisible(false)
    setIsIncomeModalVisible(false)
    calculateBalance()
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  //calculate balance
  const calculateBalance = () => {
    let incomeTotal = 0
    let expenseTotal = 0

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.amount
      } else {
        expenseTotal += transaction.amount
      }
    })

    setIncome(incomeTotal)
    setExpenses(expenseTotal)
    setCurrentBalance(incomeTotal - expenseTotal)
  }

  //calculate the initial balance, income and expense
  useEffect(() => {
    calculateBalance()
  }, [transactions])

  async function addTransaction (transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      )
      console.log('Document written with ID: ', docRef.id)
      toast.success('All Transactions Added!')
      if (!many) {
        toast.success('Transaction Added!')
      }
    } catch (e) {
      console.error('Error adding document: ', e)
      toast.error("Couldn't add transactions")
      if (!many) {
        toast.success('Transaction Added!')
      }
    }
  }

  async function fetchTransactions () {
    setLoading(true)
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`))
      const querySnapshot = await getDocs(q)
      let transactionsArray = []
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data())
      })
      setTransactions(transactionsArray)
      toast.success('Transactions Fetched!')
    }
    setLoading(false)
  }

  const { balanceData, spendingDataArray, incomeDataArray } =
    processChartData(transactions)

  const balanceConfig = {
    data: balanceData,
    xField: 'month',
    yField: 'balance'
  }

  const spendingConfig = {
    data: spendingDataArray,
    angleField: 'value',
    colorField: 'category'
  }

  const incomeConfig = {
    data: incomeDataArray,
    angleField: 'value',
    colorField: 'category'
  }

  return (
    <div>
      <Header />
      <Suspense fallback={<DashboardSkeleton />}>
        <Cards
          currentBalance={currentBalance}
          income={income}
          expenses={expenses}
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
          reset={reset}
        />

        <AddExpense
          isExpenseModalVisible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenseCancel}
          onFinish={onFinish}
        />

        <AddIncome
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}
        />

        {transactions.length === 0 ? (
          <NoTransactions />
        ) : (
          <>
            <DashboardChart
              balanceData={balanceData}
              balanceConfig={balanceConfig}
              spendingConfig={spendingConfig}
              incomeConfig={incomeConfig}
              spendingDataArray={spendingDataArray}
              incomeDataArray={incomeDataArray}
            />
            <TransactionSearch
              transactions={transactions}
              addTransaction={addTransaction}
              fetchTransactions={fetchTransactions}
            />
          </>
        )}
      </Suspense>
    </div>
  )
}

export default Dashboard
