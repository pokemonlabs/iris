import { Button, Layout, Select } from 'antd'; // Assuming you are using Ant Design
import { useState } from 'react';
import { PageLayout } from '~/designSystem';

const { Content } = Layout;
const { Option } = Select;

export default function JobsPage() {
  const [viewOnly, setViewOnly] = useState(true);
  const [selectedSession, setSelectedSession] = useState('session1'); // Default session
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleViewOnly = () => {
    setViewOnly(!viewOnly);
  };

  const toggleFullScreen = () => {
    const iframe = document.getElementById('vnc');
    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const vncSessions = {
    session1: 'http://176.34.156.226:6081/vnc.html?&resize=scale&autoconnect=1&view_only=1&reconnect=1&reconnect_delay=2000',
    session2: 'http://176.34.156.226:6082/vnc.html?&resize=scale&autoconnect=1&view_only=1&reconnect=1&reconnect_delay=2000',
    session3: 'http://176.34.156.226:6083/vnc.html?&resize=scale&autoconnect=1&view_only=1&reconnect=1&reconnect_delay=2000',
    session4: 'http://176.34.156.226:6084/vnc.html?&resize=scale&autoconnect=1&view_only=1&reconnect=1&reconnect_delay=2000',
    // Add more sessions as needed
  };

  const vncUrl = vncSessions[selectedSession].replace('view_only=1', `view_only=${viewOnly ? 1 : 0}`);

  return (
    <PageLayout>
      <Layout style={{ height: '100vh' }}>
        <Content style={{ display: 'flex', height: '100%' }}>
          <iframe
            id="vnc"
            src={vncUrl}
            style={{ flex: 1, border: 'none', height: '100%' }}
            allowFullScreen
          />
        </Content>
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, display: 'flex', gap: '10px' }}>
          <Select
            value={selectedSession}
            onChange={(value) => setSelectedSession(value)}
            style={{ width: 120 }}
          >
            {Object.keys(vncSessions).map((session) => (
              <Option key={session} value={session}>
                {session}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={toggleViewOnly}
          >
            Toggle Screen Control ({viewOnly ? 'Off' : 'On'})
          </Button>
          <Button
            type="primary"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </Layout>
    </PageLayout>
  );
}