import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Natural Language Testing`,
      description: `Create and execute test cases using plain English - no coding required. Our AI understands your intent and handles the technical details.`,
      icon: <i className="las la-comments"></i>,
    },
    {
      heading: `AI-Powered Test Generation`,
      description: `Our intelligent agents automatically generate comprehensive test scenarios that cover critical user paths and edge cases.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Real User Simulation`,
      description: `AI agents that think and act like real users, testing your application under authentic conditions and scenarios.`,
      icon: <i className="las la-user-astronaut"></i>,
    },
    {
      heading: `Automated Maintenance`,
      description: `Tests that self-heal and adapt as your application evolves, eliminating maintenance headaches and reducing costs.`,
      icon: <i className="las la-tools"></i>,
    },
    {
      heading: `Detailed Analytics`,
      description: `Get actionable insights with comprehensive test reports, coverage metrics, and trend analysis.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Enterprise Integration`,
      description: `Seamlessly integrate with your existing tools and workflows - from CI/CD pipelines to bug tracking systems.`,
      icon: <i className="las la-plug"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `QA Lead at TechCorp`,
      content: `We reduced our testing time by 65% while improving coverage. The natural language interface means our whole team can contribute to testing, not just engineers.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `CTO at StartupX`,
      content: `This platform transformed how we approach testing. We're catching critical issues earlier and shipping with more confidence than ever before.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Watson`,
      designation: `Product Manager at Enterprise Co`,
      content: `The ROI was immediate - we cut testing costs by 40% in the first month while dramatically improving our test coverage and reliability.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Startup`,
      description: `Perfect for growing teams getting started with AI testing`,
      monthly: 299,
      yearly: 2990,
      features: [
        `Up to 1000 test runs/month`,
        `3 team members`,
        `Basic analytics`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `For teams serious about quality and efficiency`,
      monthly: 699,
      yearly: 6990,
      features: [
        `Unlimited test runs`,
        `10 team members`,
        `Advanced analytics`,
        `Priority support`,
        `Custom integrations`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 1499,
      yearly: 14990,
      features: [
        `Unlimited everything`,
        `Custom team size`,
        `Dedicated support`,
        `On-premise deployment`,
        `SLA guarantee`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the AI understand what to test?`,
      answer: `Our AI is trained to understand natural language descriptions of test scenarios and convert them into executable test cases. Simply describe what you want to test in plain English, and our platform handles the rest.`,
    },
    {
      question: `Do I need coding experience to use the platform?`,
      answer: `No coding experience required! Our platform is designed to be used by anyone on your team, from QA specialists to product managers. The natural language interface makes it accessible to all.`,
    },
    {
      question: `How does it handle application changes?`,
      answer: `Our AI automatically adapts to changes in your application's UI and structure. Tests self-heal and maintain themselves, dramatically reducing maintenance overhead.`,
    },
    {
      question: `Can it integrate with our existing tools?`,
      answer: `Yes! We offer seamless integration with popular CI/CD platforms, bug tracking systems, and development tools. Our API allows for custom integrations as needed.`,
    },
  ]

  const steps = [
    {
      heading: `Describe Your Test`,
      description: `Write test scenarios in plain English, just like you'd explain them to a team member.`,
    },
    {
      heading: `AI Generation`,
      description: `Our AI converts your descriptions into comprehensive test cases and generates additional edge cases.`,
    },
    {
      heading: `Automated Execution`,
      description: `Tests run automatically across your application, simulating real user behavior.`,
    },
    {
      heading: `Actionable Results`,
      description: `Get detailed reports and insights to improve your application quality.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Spending countless hours writing and maintaining test scripts`,
    },
    {
      emoji: `💸`,
      title: `Watching testing costs eat up your development budget`,
    },
    {
      emoji: `😱`,
      title: `Missing critical bugs despite extensive testing`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Testing from a Burden into a Breakthrough`}
        subtitle={`Create, run, and maintain tests 60% faster with AI that understands your application like a human tester.`}
        buttonText={`Start Testing Smarter`}
        pictureUrl={`https://iris-dashboard-api--production-public.s3.us-west-1.amazonaws.com/SiTkPX-Iris-IZEk`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy testing teams`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Teams`} />
      <LandingPainPoints
        title={`Companies spend 35% of development budgets on testing - and still miss critical bugs`}
        painPoints={painPoints}
      />
      <LandingHowItWorks title={`Testing Made Simple`} steps={steps} />
      <LandingFeatures
        id="features"
        title={`Everything You Need for Confident Testing`}
        subtitle={`Powerful features that transform how you approach quality assurance`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories from Teams Like Yours`}
        subtitle={`See how organizations are revolutionizing their testing process`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Quality, Not Complexity`}
        subtitle={`Choose the plan that fits your testing needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions`}
        subtitle={`Everything you need to know about our AI testing platform`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Testing?`}
        subtitle={`Join thousands of teams already testing smarter with AI`}
        buttonText={`Start Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
