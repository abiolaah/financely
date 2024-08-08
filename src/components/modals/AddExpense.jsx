/* eslint-disable react/prop-types */

import { useState } from 'react'

import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { capitalizeFirstLetter } from '@/lib/helper'

const AddExpense = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish
}) => {
  const [form] = Form.useForm()

  const [tags, setTags] = useState([
    'Food',
    'Education',
    'Office',
    'Miscelleanous'
  ])

  //function to add more tags from users input
  const handleAddTag = value => {
    const newTags = value.filter(tag => !tags.includes(tag))
    setTags([...tags, ...newTags])
  }

  return (
    <Modal
      className='font-semibold'
      title='Add Expense'
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={values => {
          onFinish(values, 'expenses')
          form.resetFields()
        }}
      >
        <FormItem
          className='font-semibold'
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please provide the name of the transaction!'
            }
          ]}
        >
          <Input
            type='text'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 focus-visible:ring-px -mt-4'
          />
        </FormItem>

        <FormItem
          className='font-semibold'
          label='Amount'
          name='amount'
          rules={[
            {
              required: true,
              message: 'Please provide the amount of the transaction!'
            }
          ]}
        >
          <Input
            type='number'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 focus-visible:ring-px -mt-4'
          />
        </FormItem>

        <FormItem
          className='font-semibold'
          label='Date'
          name='date'
          rules={[
            {
              required: true,
              message: 'Please provide the date of the transaction!'
            }
          ]}
        >
          <DatePicker
            format='YYYY-MM-DD'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 focus-visible:ring-px -mt-4 w-full'
          />
        </FormItem>

        <FormItem
          className='font-semibold'
          label='Tag'
          name='tag'
          rules={[
            {
              required: true,
              message: 'Please select a tag!'
            }
          ]}
        >
          <Select
            mode='tags'
            type='text'
            className='border-0 border-b-2 border-white'
            onChange={handleAddTag}
          >
            {tags.map(tag => (
              <Select.Option key={tag} value={tag}>
                {capitalizeFirstLetter(tag)}
              </Select.Option>
            ))}
          </Select>
        </FormItem>

        <FormItem>
          <Button
            type='primary'
            className='bg-blue-600 text-center w-full my-2 mx-0 m-0 p-2 text-white border border-solid border-blue-600 rounded cursor-pointer flex items-center justify-center h-auto hover:bg-white hover:text-blue-600'
            htmlType='submit'
          >
            Add Expense
          </Button>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default AddExpense
