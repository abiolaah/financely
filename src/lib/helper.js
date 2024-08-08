import { doc, getDoc, setDoc } from 'firebase/firestore'
import {db} from '../firebase'

import { toast } from 'sonner'
import moment from 'moment'

//function to create user in db
export const createuserDocument = async user => {
    if (!user) return

    const userRef = doc(db, 'users', user.uid)
    const userData = await getDoc(userRef)

    //check if the user exist
    if (!userData.exists()) {
      const { displayName, email, photoURL } = user
      const createdAt = new Date()

      //statement to execute
      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : '',
          createdAt
        })
        toast.success('User created successfully')
      } catch (error) {
        toast.error(error)
        console.log('Error creating user document: ', error)
      }
    } else {
      toast.error('User already exist')
    }
  }


  export const formattedCurrency = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  })


  export  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  //processChartData function
  export const processChartData = (transactions) => {
    const balanceData = [];
    const spendingData = {};
    const incomeData = {};

    transactions.forEach((transaction) => {
      const monthYear = moment(transaction.date).format("MM YYYY");
      const tag = transaction.tag;

      if(transaction.type === 'income') {
        if (balanceData.some((data) => data.month === monthYear)) {
          balanceData.find((data) => data.month === monthYear).balance += transaction.amount;
        } else {
          balanceData.push({ month:monthYear, balance: transaction.amount })
        }
        if (incomeData[tag]) {
          incomeData[tag] += transaction.amount;
        } else {
          incomeData[tag] = transaction.amount;
        }
      } else {
        if (balanceData.some((data) => data.month === monthYear)) {
          balanceData.find((data) => data.month === monthYear).balance -= transaction.amount;
        } else {
          balanceData.push({ month:monthYear, balance: -transaction.amount })
        }

        if(spendingData[tag]) {
          spendingData[tag] += transaction.amount;
        }
        else {
          spendingData[tag] = transaction.amount;
        }
      }
    });

    const spendingDataArray = Object.keys(spendingData).map((key) => ({
      category: key,
      value: spendingData[key],
    }))

    const incomeDataArray = Object.keys(incomeData).map((key) => ({
      category: key,
      value: incomeData[key],
    }))

    return { balanceData, spendingDataArray, incomeDataArray};
  }