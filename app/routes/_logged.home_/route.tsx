import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Button, Collapse } from 'antd'
import { useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { theme } from 'antd' // Access your Ant Design theme

const { Panel } = Collapse

export default function WelcomePage() {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const [run, setRun] = useState(false) // Toggle for running the tour
  /* Mahi: todo externalize tour*/
  const steps = [
    {
      target: '#leftbar-welcome',
      content:
        'Welcome to the platform! This is the first step to getting started.',
      disableBeacon: true,
    },
    {
      target: '#leftbar-org-home',
      content:
        'This is the Home tab, where you can find an overview of your organization.',
      disableBeacon: true,
    },
    {
      target: '#leftbar-org-projects',
      content:
        'Projects help you organize all test cases for your product. Think of them as a store for your tests.',
      disableBeacon: true,
    },
    {
      target: '#leftbar-org-pricing',
      content:
        'This is the Pricing tab, where you can manage your subscription and costs.',
      disableBeacon: true,
    },
    {
      target: '#leftbar-org-integrations',
      content:
        'Integrate with various apps for task tracking and other functionalities here.',
      disableBeacon: true,
    },
    {
      target: '#leftbar-org-agent',
      content:
        'Agents perform actions for you. Create one to get started with automating tasks.',
      disableBeacon: true,
    },
    {
      target: '#leftbar-org-vnc',
      content:
        'This is the VNC tab, where you can monitor what your agents are doing in real-time.',
      disableBeacon: true,
    },
  ]
  const customStyles = {
    options: {
      arrowColor: token.colorPrimary, // Match the primary color
      backgroundColor: token.colorBgContainer, // Container background
      overlayColor: 'rgba(0, 0, 0, 0.5)', // Overlay with transparency
      primaryColor: token.colorPrimary, // Primary color for buttons
      textColor: token.colorText, // Text color
      zIndex: 1050, // Ensure it appears above other elements
    },
    tooltip: {
      borderRadius: token.borderRadius, // Match Ant Design's border radius
      boxShadow: token.boxShadowSecondary, // Use Ant Design's shadow
      padding: '16px', // Add some padding
    },
    buttonNext: {
      backgroundColor: token.colorPrimary, // Match the primary color
      color: token.colorTextLightSolid, // Text color for contrast
    },
    buttonBack: {
      marginRight: '8px',
      color: token.colorTextDescription, // Secondary text color
    },
    buttonSkip: {
      color: token.colorTextSecondary, // Muted text color
    },
  }

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')
    if (!hasVisitedBefore) {
      setRun(true)
      // localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            fontSize: '2.5rem',
            fontWeight: 'bold',
          }}
        >
          Welcome to Iris
        </h1>

        {/* YouTube Video */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <iframe
            src="https://www.youtube.com/embed/ve-GK7goPAM"
            title="YouTube video player"
            style={{
              width: '560px',
              height: '315px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Known Issues & Community Section */}
        <div style={{ marginTop: '48px' }}>
          {/* Known Issues */}
          <div
            style={{
              marginBottom: '24px',
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              Known Issues
            </h3>
            <ul
              style={{
                listStyleType: 'disc',
                paddingLeft: '24px',
                marginBottom: '16px',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <strong>Issue #1:</strong> VNC connection may be unstable in
                certain browsers.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Issue #2:</strong> Test execution might delay in
                high-load scenarios.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Issue #3:</strong> If you signed up using Google and
                cannot see your projects, go to the top and create/select an
                organization.
              </li>
            </ul>
            <Button
              type="primary"
              onClick={() =>
                window.open('https://github.com/pokemonlabs/irisdocs', '_blank')
              }
            >
              Report Issues on GitHub
            </Button>
          </div>

          {/* Community Links */}
          <div
            style={{
              marginBottom: '24px',
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              Join Our Community
            </h3>
            <p style={{ marginBottom: '16px' }}>
              Get help, share ideas, and connect with other users in our
              community!
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button
                type="primary"
                onClick={() =>
                  window.open('https://discord.gg/ycBA47aK', '_blank')
                }
              >
                Join Discord
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  window.open(
                    'https://github.com/pokemonlabs/irisdocs',
                    '_blank',
                  )
                }
              >
                Visit GitHub
              </Button>
            </div>
          </div>

          {/* FAQs Section */}
          <div
            style={{
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              FAQs
            </h3>
            <Collapse accordion>
              <Panel header="How do I create a new project?" key="1">
                <p>
                  To create a new project, navigate to the "Projects" tab and
                  click on the "Create Project" button. Follow the prompts to
                  set up your project.
                </p>
              </Panel>
              <Panel header="How do I integrate with third-party apps?" key="2">
                <p>
                  Go to the "Integrations" tab and select the app you want to
                  integrate with. Follow the instructions to complete the
                  integration.
                </p>
              </Panel>
              <Panel
                header="What should I do if I can't see my projects?"
                key="3"
              >
                <p>
                  If you signed up using Google and cannot see your projects,
                  ensure you have created or selected an organization. Go to the
                  top of the page and click on "Create/Select Organization."
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>

        {/* Tour button */}
        {/* <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Button type="primary" onClick={handleStartTour}>
            Start Tour
          </Button>
        </div> */}

        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          styles={customStyles}
          callback={data => {
            if (data.status === 'finished' || data.status === 'skipped') {
              setRun(false) // End the tour on finish or skip
              localStorage.setItem('hasVisitedBefore', 'true')
            }
          }}
        />
      </div>
    </PageLayout>
  )
}
