import { theme } from 'antd'

export const Theme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Colors
    colorPrimary: 'black',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: 'black',
    colorLink: 'black',
    colorBgBase: 'white',
    colorBgContainer: 'white',
    colorBorder: '#d4d4d8',
    colorBorderSecondary: '#e4e4e7',
    colorSplit: 'rgba(24, 24, 27, 0.07)',
    // Typography
    // fontFamily: `${interFont.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    //Form
    controlItemBgActive: '#f4f4f5',
    controlOutline: 'rgba(24, 24, 27, 0.1)',
    controlHeight: 36,
    controlHeightSM: 32,

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: false,
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },

    Layout: {
      headerBg: 'white', // topBar background color
      footerBg: 'white', // footer background color
      siderBg: 'white', // leftBar background color
      siderBorderRight: '1px solid #e4e4e7', // leftBar border right
      headerBorderBottom: '1px solid #e4e4e7', // topBar border bottom
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      //topbar menu items
      horizontalItemSelectedColor: 'black',
      horizontalItemSelectedBg: 'transparent',
      //leftbar menu items
      itemSelectedColor: 'black',
      itemSelectedBg: 'transparent',
      itemActiveBg: 'transparent',
      //topbar and leftbar menu items
      itemHoverColor: 'black',
      itemHoverBg: 'transparent',
      itemColor: '#909090',
      itemBg: 'transparent',
      iconMarginInlineEnd: 8,
      iconSize: 16,
    },
    Button: {
      paddingInlineSM: 11,
      fontWeight: 500,
    },
  },
}


/* export const Theme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Colors
    colorPrimary: '#1a1a1a', // Darker primary for better readability
    colorError: '#f5222d', // More vibrant error color
    colorInfo: '#1890ff', // Standardized blue for info
    colorSuccess: '#52c41a', // Standard green for success
    colorWarning: '#faad14', // Bright orange for warnings
    colorTextBase: '#212121', // Slightly lighter text for better contrast
    colorLink: '#096dd9', // Blue links for better visibility
    colorBgBase: '#f7f7f7', // Light grey for softer backgrounds
    colorBgContainer: '#ffffff', // Pure white for containers
    colorBorder: '#d9d9d9', // Neutral border color
    colorBorderSecondary: '#e8e8e8', // Lighter border for secondary elements
    colorSplit: 'rgba(0, 0, 0, 0.06)', // Softer split lines

    // Typography
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14, // Base font size
    fontSizeHeading1: 40, // Larger heading size
    fontSizeHeading2: 32,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    // Form
    controlItemBgActive: '#e6f7ff', // Subtle active background
    controlOutline: '#91d5ff', // Outline color for focus
    controlHeight: 38, // Slightly increased for better touch targets
    controlHeightSM: 34, // For smaller controls

    // Layout
    padding: 20, // Larger padding for better spacing
    boxShadow:
      '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.08)', // Softer shadows
    borderRadius: 8, // Rounded corners for a modern look
    lineType: 'solid',
    lineWidth: 1,
    motion: true, // Enable motion for smoother transitions
  },
  components: {
    Form: {
      itemMarginBottom: '24px', // Increased margin for better spacing
    },

    Layout: {
      headerBg: '#ffffff', // Pure white for headers
      footerBg: '#f0f2f5', // Subtle grey for footers
      siderBg: '#ffffff', // Keep sidebar white
      siderBorderRight: '1px solid #e8e8e8', // Softer border
      headerBorderBottom: '1px solid #d9d9d9', // Neutral header border
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 36, // Increased height for better usability
      // Topbar menu items
      horizontalItemSelectedColor: '#1890ff', // Highlighted blue for selected
      horizontalItemSelectedBg: 'rgba(24, 144, 255, 0.1)', // Subtle highlight
      // Sidebar menu items
      itemSelectedColor: '#1890ff', // Match topbar color
      itemSelectedBg: 'rgba(24, 144, 255, 0.1)', // Subtle background for selected
      itemActiveBg: 'rgba(24, 144, 255, 0.05)', // Active hover effect
      // Menu items
      itemHoverColor: '#096dd9', // Slightly darker hover color
      itemHoverBg: 'rgba(24, 144, 255, 0.05)', // Hover background
      itemColor: '#595959', // Neutral grey for menu items
      itemBg: 'transparent', // Transparent by default
      iconMarginInlineEnd: 10, // Increased spacing for better visuals
      iconSize: 18, // Slightly larger icons
    },
    Button: {
      paddingInlineSM: 12, // Increased padding for better click area
      fontWeight: 600, // Bolder font for buttons
    },
  },
}; */

export const DarkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: '#1d4ed8', // Blue primary color
    colorError: '#f87171', // Vibrant red for errors
    colorInfo: '#60a5fa', // Softer blue for information
    colorSuccess: '#4ade80', // Bright green for success
    colorWarning: '#facc15', // Bright yellow for warnings
    colorTextBase: '#e5e7eb', // Light text for dark backgrounds
    colorLink: '#3b82f6', // Slightly vibrant blue for links
    colorBgBase: '#1f2937', // Dark base background
    colorBgContainer: '#374151', // Slightly lighter background for containers
    colorBorder: '#4b5563', // Neutral dark borders
    colorBorderSecondary: '#6b7280', // Softer secondary borders
    colorSplit: 'rgba(255, 255, 255, 0.12)', // Subtle split lines

    // Typography
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14, // Base font size
    fontSizeHeading1: 40, // Large headings for dark mode
    fontSizeHeading2: 32,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    // Form
    controlItemBgActive: '#4b5563', // Active background for form controls
    controlOutline: '#93c5fd', // Focused control outline
    controlHeight: 38, // Larger controls for usability
    controlHeightSM: 34, // Smaller control size

    // Layout
    padding: 20, // Consistent padding for dark mode
    boxShadow:
      '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)', // Softer shadows for dark mode
    borderRadius: 8, // Rounded corners for modern look
    lineType: 'solid',
    lineWidth: 1,
    motion: true, // Enable smooth animations
  },
  components: {
    Form: {
      itemMarginBottom: '24px', // Increased spacing between form items
    },

    Layout: {
      headerBg: '#1f2937', // Dark header background
      footerBg: '#111827', // Slightly darker footer
      siderBg: '#1f2937', // Sidebar background
      siderBorderRight: '1px solid #4b5563', // Neutral sidebar border
      headerBorderBottom: '1px solid #4b5563', // Header border for separation
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 36, // Increased item height for better touch targets
      // Topbar menu items
      horizontalItemSelectedColor: '#e5e7eb', // Light text for active items
      horizontalItemSelectedBg: '#374151', // Subtle highlight for selected
      // Sidebar menu items
      itemSelectedColor: '#e5e7eb', // Light text for selected items
      itemSelectedBg: '#374151', // Subtle selected background
      itemActiveBg: '#4b5563', // Active hover background
      // Menu items
      itemHoverColor: '#ffffff', // Light hover text
      itemHoverBg: '#4b5563', // Hover background
      itemColor: '#9ca3af', // Neutral grey for menu items
      itemBg: 'transparent', // Transparent default background
      iconMarginInlineEnd: 10, // Spacing for icons
      iconSize: 18, // Slightly larger icons
    },
    Button: {
      paddingInlineSM: 12, // Better padding for touch targets
      fontWeight: 600, // Stronger font weight for emphasis
    },
  },
};