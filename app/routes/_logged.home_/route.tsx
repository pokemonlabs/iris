import { PageLayout } from '@/designSystem';
import { useNavigate } from "@remix-run/react";
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react'; // Import useState
import Joyride from "react-joyride";
const { Title, Paragraph } = Typography;

export default function WelcomePage() {
  const navigate = useNavigate();

  const [run, setRun] = useState(false); // Toggle for running the tour
  const steps = [
    {
      target: "#leftbar-welcome", // CSS selector for the element to highlight
      content: "Welcome to the platform! This is the first step to getting started.",
      disableBeacon: true, // Disable the beacon for this step
    },
    {
      target: "#leftbar-org-home", // CSS selector for the element to highlight
      content: "This is the Home tab, where you can find an overview of your organization.",
      disableBeacon: true, // Disable the beacon for this step
    },
    {
      target: "#leftbar-org-projects", // CSS selector for the element to highlight
      content: "Projects help you organize all test cases for your product. Think of them as a store for your tests.",
      disableBeacon: true, // Disable the beacon for this step
    },
    {
      target: "#leftbar-org-pricing", // CSS selector for the element to highlight
      content: "This is the Pricing tab, where you can manage your subscription and costs.",
      disableBeacon: true, // Disable the beacon for this step
    },
    {
      target: "#leftbar-org-integrations", // CSS selector for the element to highlight
      content: "Integrate with various apps for task tracking and other functionalities here.",
      disableBeacon: true, // Disable the beacon for this step
    },
    {
      target: "#leftbar-org-agent", // CSS selector for the element to highlight
      content: "Agents perform actions for you. Create one to get started with automating tasks.",
      disableBeacon: true, // Disable the beacon for this step
    },
    {
      target: "#leftbar-org-vnc", // CSS selector for the element to highlight
      content: "This is the VNC tab, where you can monitor what your agents are doing in real-time.",
      disableBeacon: true, // Disable the beacon for this step
    }
  ];

  useEffect(() => {
    // Check if the user has visited before
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    console.log({ hasVisitedBefore })
    if (!hasVisitedBefore) {
      setRun(true); // Start the tour if it's the first visit
      localStorage.setItem('hasVisitedBefore', 'true'); // Mark as visited
    }
  }, []);

  const handleStartTour = () => {
    setRun(true); // Set run to true to start the tour
  };

  return (
    <PageLayout layout="full-width">
      <Joyride
        steps={steps}
        run={run} // Controls whether the tour is running
        continuous // Automatically moves to the next step
        scrollToFirstStep // Scrolls to the first step if not in view
        showProgress={true} // Hide step progress
        showSkipButton={true} // Hide the skip button
        disableOverlayClose // Prevent closing the tour by clicking outside
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={1} style={{ textAlign: 'center', marginBottom: 48 }}>
          Welcome to Test Automation Platform
        </Title>

        <Paragraph
          style={{ fontSize: 18, textAlign: 'center', marginBottom: 48 }}
        >
          Streamline your testing process with our powerful automation tools.
          Here's how to get started:
        </Paragraph>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} lg={8}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <i
                  className="las la-project-diagram"
                  style={{ fontSize: 48, color: '#1890ff' }}
                ></i>
                <Title level={4}>Create Projects</Title>
                <Paragraph>
                  Organize your tests by creating projects. Group related tests
                  together for better management and collaboration.
                </Paragraph>
                <Button
                  type="primary"
                  onClick={() => navigate('/organizations/create')}
                >
                  Create Project
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <i
                  className="las la-vial"
                  style={{ fontSize: 48, color: '#52c41a' }}
                ></i>
                <Title level={4}>Design Tests</Title>
                <Paragraph>
                  Create automated tests using our intuitive interface. Define
                  test steps, expected results, and conditions.
                </Paragraph>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <i
                  className="las la-play-circle"
                  style={{ fontSize: 48, color: '#722ed1' }}
                ></i>
                <Title level={4}>Run Tests</Title>
                <Paragraph>
                  Execute tests with a single click. Monitor progress in
                  real-time and get detailed reports of test results.
                </Paragraph>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <i
                  className="las la-users"
                  style={{ fontSize: 48, color: '#fa8c16' }}
                ></i>
                <Title level={4}>Collaborate</Title>
                <Paragraph>
                  Share tests with team members, assign roles, and work together
                  to improve test coverage.
                </Paragraph>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <i
                  className="las la-chart-bar"
                  style={{ fontSize: 48, color: '#eb2f96' }}
                ></i>
                <Title level={4}>Track Results</Title>
                <Paragraph>
                  View comprehensive test reports, analyze trends, and identify
                  areas for improvement.
                </Paragraph>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <i
                  className="las la-bell"
                  style={{ fontSize: 48, color: '#f5222d' }}
                ></i>
                <Title level={4}>Stay Updated</Title>
                <Paragraph>
                  Receive notifications about test results, team activities, and
                  important updates.
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Add a button to start the tour */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Button type="primary" onClick={handleStartTour}>
            Start Tour
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}