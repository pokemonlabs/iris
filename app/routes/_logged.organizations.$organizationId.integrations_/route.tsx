import { useUserContext } from '@/core/context';
import { Api } from '@/core/trpc';
import { PageLayout } from '@/designSystem';
import { GithubOutlined } from '@ant-design/icons';
import { Button, Typography, message } from 'antd';
import { useNango } from '~/plugins/nango/client';

const { Title, Paragraph } = Typography;

export default function IntegrationsPage() {
  const { user } = useUserContext();
  const nango = useNango();

  const {
    data: integrations,
    isLoading,
    refetch,
  } = Api.integration.findMany.useQuery();

  const { mutateAsync: nangoProxy } = Api.nango.proxy.useMutation();

  const authenticateGithub = async () => {
    try {
      await nango.auth('github-app-oauth', user?.id);
      message.success('GitHub integration linked successfully.');
      refetch();
    } catch (error) {
      message.error('Error linking GitHub integration');
      console.error(error);
    }
  };

  const fetchGithubData = async () => {
    const config = {
      method: 'GET',
      endpoint: 'https://api.github.com/user/repos',
      providerConfigKey: 'github',
      connectionId: user?.id,
    };

    try {
      const { data } = await nangoProxy(config);
      message.success('GitHub data fetched successfully');
      console.log(data);
    } catch (error) {
      message.error('Failed to fetch GitHub data');
      console.error(error);
    }
  };

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>GitHub Integration</Title>
        <Paragraph>Connect your GitHub account to access repositories and other GitHub features.</Paragraph>

        <div style={{ marginBottom: '16px' }}>
          <Button
            icon={<GithubOutlined />}
            onClick={authenticateGithub}
            loading={isLoading}
          >
            Connect to GitHub
          </Button>

          <Button
            style={{ marginLeft: '8px' }}
            onClick={fetchGithubData}
            disabled={!integrations?.some(i => i.type === 'github')}
          >
            Fetch GitHub Data
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}