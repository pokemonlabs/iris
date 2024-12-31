import { useUserContext } from '@/core/context';
import { Api } from '@/core/trpc';
import { PageLayout } from '@/designSystem';
import { DiscordOutlined, GithubOutlined, LineChartOutlined, SlackOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Row, Typography } from 'antd';
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

  // Helper for showing integration buttons
  const IntegrationCard = ({ title, description, onAuthenticate, onFetch, icon, disabled }) => (
    <Card style={{ marginBottom: '24px' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col style={{ fontSize: '24px' }}>{icon}</Col>
        <Col flex="auto">
          <Title level={3}>{title}</Title>
          <Paragraph>{description}</Paragraph>
          <Button
            type="primary"
            onClick={onAuthenticate}
            loading={isLoading}
          >
            Connect
          </Button>
          <Button
            style={{ marginLeft: '8px' }}
            onClick={onFetch}
            disabled={disabled}
          >
            Fetch Data
          </Button>
        </Col>
      </Row>
    </Card>
  );

  // GitHub Integration
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

  // Slack Integration
  const authenticateSlack = async () => {
    try {
      await nango.auth('slack', user?.id);
      message.success('Slack integration linked successfully.');
      refetch();
    } catch (error) {
      message.error('Error linking Slack integration');
      console.error(error);
    }
  };

  const fetchSlackData = async () => {
    const config = {
      method: 'GET',
      endpoint: 'https://slack.com/api/team.info',
      providerConfigKey: 'slack',
      connectionId: user?.id,
    };

    try {
      const { data } = await nangoProxy(config);
      message.success('Slack data fetched successfully');
      console.log(data);
    } catch (error) {
      message.error('Failed to fetch Slack data');
      console.error(error);
    }
  };

  // Linear Integration
  const authenticateLinear = async () => {
    try {
      await nango.auth('linear', user?.id);
      message.success('Linear integration linked successfully.');
      refetch();
    } catch (error) {
      message.error('Error linking Linear integration');
      console.error(error);
    }
  };

  const fetchLinearData = async () => {
    const config = {
      method: 'GET',
      endpoint: 'https://api.linear.app/graphql',
      providerConfigKey: 'linear',
      connectionId: user?.id,
    };

    try {
      const { data } = await nangoProxy(config);
      message.success('Linear data fetched successfully');
      console.log(data);
    } catch (error) {
      message.error('Failed to fetch Linear data');
      console.error(error);
    }
  };

  // Discord Integration
  const authenticateDiscord = async () => {
    try {
      await nango.auth('discord', user?.id);
      message.success('Discord integration linked successfully.');
      refetch();
    } catch (error) {
      message.error('Error linking Discord integration');
      console.error(error);
    }
  };

  const fetchDiscordData = async () => {
    const config = {
      method: 'GET',
      endpoint: 'https://discord.com/api/users/@me',
      providerConfigKey: 'discord',
      connectionId: user?.id,
    };

    try {
      const { data } = await nangoProxy(config);
      message.success('Discord data fetched successfully');
      console.log(data);
    } catch (error) {
      message.error('Failed to fetch Discord data');
      console.error(error);
    }
  };

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Integrations
        </Title>
        <IntegrationCard
          title="GitHub Integration"
          description="Connect your GitHub account to access repositories and other GitHub features."
          onAuthenticate={authenticateGithub}
          onFetch={fetchGithubData}
          icon={<GithubOutlined />}
          disabled={!integrations?.some(i => i.type === 'github')}
        />
        <IntegrationCard
          title="Slack Integration"
          description="Connect your Slack workspace to access team information and communication features."
          onAuthenticate={authenticateSlack}
          onFetch={fetchSlackData}
          icon={<SlackOutlined />}
          disabled={!integrations?.some(i => i.type === 'slack')}
        />
        <IntegrationCard
          title="Linear Integration"
          description="Connect your Linear account to manage issues and project workflows."
          onAuthenticate={authenticateLinear}
          onFetch={fetchLinearData}
          icon={<LineChartOutlined />}
          disabled={!integrations?.some(i => i.type === 'linear')}
        />
        <IntegrationCard
          title="Discord Integration"
          description="Connect your Discord account to access user information and communication features."
          onAuthenticate={authenticateDiscord}
          onFetch={fetchDiscordData}
          icon={<DiscordOutlined />}
          disabled={!integrations?.some(i => i.type === 'discord')}
        />
      </div>
    </PageLayout>
  );
}
