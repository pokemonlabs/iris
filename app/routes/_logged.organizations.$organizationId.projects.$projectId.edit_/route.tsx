import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import { Button, Card, Col, Input, Row, Space, Switch, Tag, Typography, message } from 'antd'
import { useCallback, useState } from 'react'

const { Title, Text } = Typography

interface KeyValuePair {
  key: string
  value: string
  error?: string
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export default function EditProjectPage() {
  const { projectId, organizationId } = useParams()
  const navigate = useNavigate()

  // State for form fields
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [useUserDataDirectory, setUseUserDataDirectory] = useState(false)
  const [cookies, setCookies] = useState<KeyValuePair[]>([])
  const [session, setSession] = useState<KeyValuePair[]>([])
  const [localStorageData, setLocalStorageData] = useState<KeyValuePair[]>([])

  const { data: project, isLoading } = Api.project.findFirst.useQuery(
    {
      where: { id: projectId },
    },
    {
      onSuccess: (data) => {
        setName(data?.name ?? '')
        setDescription(data?.description ?? '')
        setUseUserDataDirectory(data.useUserDataDirectory ?? false)
        setCookies(Object.entries(data?.cookies ?? {}).map(([key, value]) => ({ key, value })))
        setSession(Object.entries(data?.session ?? {}).map(([key, value]) => ({ key, value })))
        setLocalStorageData(Object.entries(data?.localStorage ?? {}).map(([key, value]) => ({ key, value })))
      },
    }
  )

  // Validation functions
  const validateCookieKey = (key: string): string | undefined => {
    if (!key.trim()) return 'Key cannot be empty'
    if (!/^[\w\-\.]+$/.test(key)) return 'Cookie key can only contain letters, numbers, hyphens, underscores, and dots'
    return undefined
  }

  const validateCookieValue = (value: string): string | undefined => {
    if (!value.trim()) return 'Value cannot be empty'
    // RFC 6265 compliant validation
    if (/[\s;,]/.test(value)) return 'Cookie value cannot contain whitespace, semicolons, or commas'
    return undefined
  }

  const validateStorageKey = (key: string): string | undefined => {
    if (!key.trim()) return 'Key cannot be empty'
    return undefined
  }

  const validateData = (data: KeyValuePair[], type: 'cookies' | 'session' | 'localStorage'): ValidationResult => {
    const errors: string[] = []
    const isValid = data.every((pair) => {
      if (type === 'cookies') {
        const keyError = validateCookieKey(pair.key)
        const valueError = validateCookieValue(pair.value)
        if (keyError) errors.push(`Invalid cookie key "${pair.key}": ${keyError}`)
        if (valueError) errors.push(`Invalid cookie value for "${pair.key}": ${valueError}`)
        return !keyError && !valueError
      } else {
        const keyError = validateStorageKey(pair.key)
        if (keyError) errors.push(`Invalid ${type} key "${pair.key}": ${keyError}`)
        return !keyError
      }
    })
    return { isValid, errors }
  }

  // Mutation to update the project
  const { mutateAsync: updateProject } = Api.project.update.useMutation()

  // Handle form submission with validation
  const handleSubmit = async () => {
    // Validate all data
    const cookieValidation = validateData(cookies, 'cookies')
    const sessionValidation = validateData(session, 'session')
    const localStorageValidation = validateData(localStorageData, 'localStorage')

    const allErrors = [
      ...cookieValidation.errors,
      ...sessionValidation.errors,
      ...localStorageValidation.errors,
    ]

    if (allErrors.length > 0) {
      message.error(
        <div>
          <p>Please fix the following errors:</p>
          <ul>
            {allErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )
      return
    }

    try {
      // Clean and transform data before saving
      const cleanedCookies = cookies.reduce((acc, { key, value }) => ({
        ...acc,
        [key.trim()]: value.trim(),
      }), {})

      const cleanedSession = session.reduce((acc, { key, value }) => ({
        ...acc,
        [key.trim()]: value.trim(),
      }), {})

      const cleanedLocalStorage = localStorageData.reduce((acc, { key, value }) => ({
        ...acc,
        [key.trim()]: value.trim(),
      }), {})

      await updateProject({
        where: { id: projectId },
        data: {
          name: name.trim(),
          description: description.trim(),
          cookies: cleanedCookies,
          session: cleanedSession,
          localStorage: cleanedLocalStorage,
          useUserDataDirectory: useUserDataDirectory
        },
      })
      message.success('Project updated successfully!')
      navigate(`/organizations/${organizationId}/projects`)
    } catch (error) {
      message.error('Failed to update project. Please try again.')
    }
  }

  const renderKeyValuePairs = useCallback((
    title: string,
    data: KeyValuePair[],
    setData: (data: KeyValuePair[]) => void,
    type: 'cookies' | 'session' | 'localStorage'
  ) => (
    <Card title={title} size="small" className="mb-4">
      {data.map((pair, index) => {
        const keyError = type === 'cookies'
          ? validateCookieKey(pair.key)
          : validateStorageKey(pair.key)
        const valueError = type === 'cookies' ? validateCookieValue(pair.value) : undefined

        return (
          <div key={index} className="flex gap-2 mb-2">
            <div className="flex-1">
              <Input
                status={keyError ? 'error' : undefined}
                placeholder="Key"
                value={pair.key}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index].key = e.target.value
                  setData(newData)
                }}
              />
              {keyError && <Text type="danger" className="text-xs">{keyError}</Text>}
            </div>
            <div className="flex-1">
              <Input
                status={valueError ? 'error' : undefined}
                placeholder="Value"
                value={pair.value}
                onChange={(e) => {
                  const newData = [...data]
                  newData[index].value = e.target.value
                  setData(newData)
                }}
              />
              {valueError && <Text type="danger" className="text-xs">{valueError}</Text>}
            </div>
            <Button
              danger
              onClick={() => setData(data.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        )
      })}
      <Button
        type="dashed"
        onClick={() => setData([...data, { key: '', value: '' }])}
      >
        Add {title.toLowerCase()}
      </Button>
    </Card>
  ), [])

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div className="max-w-[1200px] mx-auto p-6">
          <Title level={2}>Loading...</Title>
        </div>
      </PageLayout>
    )
  }

  if (!project) {
    return (
      <PageLayout layout="full-width">
        <div className="max-w-[1200px] mx-auto p-6">
          <Title level={2}>Project not found</Title>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div className="max-w-[1200px] mx-auto p-6">
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-between items-center">
            <div>
              <Title level={2}>
                <i className="las la-edit" /> Edit Project
              </Title>
              <Text type="secondary">Update project details</Text>
            </div>
            <Button
              type="default"
              onClick={() => navigate(`/organizations/${organizationId}/projects`)}
            >
              Back to Projects
            </Button>
          </div>

          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div className="flex flex-col gap-2">
                  <Text strong>Project Name</Text>
                  <Input
                    placeholder="Enter project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Col>
              <Col xs={24}>
                <div className="flex flex-col gap-2">
                  <Text strong>Description</Text>
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </Col>
              <Col xs={24}>
            <div className="flex flex-col gap-2">
              <Text strong>Use User Data Directory</Text>
              <Space>
                <Switch
                  checked={useUserDataDirectory}
                  onChange={(checked) => setUseUserDataDirectory(checked)}
                />
                {useUserDataDirectory ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="default">Inactive</Tag>
                )}
              </Space>
            </div>
        </Col>
            </Row>
          </Card>

          {renderKeyValuePairs('Cookies', cookies, setCookies, 'cookies')}
          {renderKeyValuePairs('Session', session, setSession, 'session')}
          {renderKeyValuePairs('Local Storage', localStorageData, setLocalStorageData, 'localStorage')}

          <div className="flex justify-end">
            <Button type="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </Space>
      </div>
    </PageLayout>
  )
}