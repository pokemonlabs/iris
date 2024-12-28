import { Avatar, Button, Flex, Form, Input, message, Popconfirm } from 'antd'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { User } from '@prisma/client'
import { useEffect } from 'react'

export default function OrganizationSettingsPage() {
  const {
    organization,
    refetchOrganization,
    refetchOrganizations,
    checkOrganizationRole,
  } = useUserContext()

  const { mutateAsync: updateOrganization, isLoading: isLoadingUpdate } =
    Api.organization.update.useMutation()

  const { mutateAsync: deleteOrganization, isLoading: isLoadingDelete } =
    Api.organization.delete.useMutation()

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(organization)
  }, [organization])

  const handleSubmit = async (values: Partial<User>) => {
    try {
      await updateOrganization({
        where: { id: organization.id },
        data: {
          name: values.name,
          pictureUrl: values.pictureUrl,
        },
      })

      refetchOrganization()
      refetchOrganizations()
    } catch (error) {
      message.error(`Could not save user: ${error.message}`)
    }
  }

  const handleClickDelete = async () => {
    await deleteOrganization({ where: { id: organization.id } })

    window.location.replace('/home')
  }

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="center" style={{ marginBottom: '30px' }}>
        <Avatar
          shape="square"
          size={120}
          src={organization.pictureUrl}
          style={{ fontSize: '120px' }}
        >
          {Utility.stringToInitials(organization.name)[0]}
        </Avatar>
      </Flex>

      <Form
        form={form}
        initialValues={organization}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Picture" name="pictureUrl">
          <Input />
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit" loading={isLoadingUpdate}>
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>

      {checkOrganizationRole('owner') && (
        <Flex justify="end" style={{ paddingTop: '100px' }}>
          <Popconfirm
            title="Are you sure?"
            okText="Yes, delete"
            cancelText="Cancel"
            placement="topRight"
            okButtonProps={{ danger: true, loading: isLoadingDelete }}
            onConfirm={handleClickDelete}
          >
            <Button type="text" size="small" danger loading={isLoadingDelete}>
              Delete Organization
            </Button>
          </Popconfirm>
        </Flex>
      )}
    </PageLayout>
  )
}
