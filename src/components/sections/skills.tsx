'use client';

import QaCard from '@/components/ui/qa-card';
import { TestTube2, Bot, BarChart3, ShieldCheck } from 'lucide-react'; // Or FlaskConical, Cog, PieChart, Lock

const skillsData = [
  {
    icon: TestTube2,
    title: 'Testing',
    description: 'Comprehensive manual and exploratory testing to ensure functional correctness and user experience.',
    modalContent: {
      title: 'Deep Dive into Testing',
      description: (
        <>
          <p>Our testing methodologies cover a wide spectrum, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Functional Testing: Verifying each function of the software operates in conformance with the requirement specifications.</li>
            <li>Usability Testing: Assessing how easy user interfaces are to use.</li>
            <li>Exploratory Testing: Simultaneous learning, test design, and test execution.</li>
            <li>Regression Testing: Ensuring that new code changes do not adversely affect existing features.</li>
          </ul>
        </>
      ),
    },
  },
  {
    icon: Bot,
    title: 'Automation',
    description: 'Developing and maintaining automated test suites for efficiency and extensive coverage.',
    modalContent: {
      title: 'The Power of Automation',
      description: (
        <>
          <p>Automation is key to modern QA, enabling:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Faster Feedback Cycles: Integrating automated tests into CI/CD pipelines for rapid defect detection.</li>
            <li>Increased Test Coverage: Executing a broader range of tests more frequently than manual testing allows.</li>
            <li>Reduced Human Error: Minimizing inconsistencies inherent in manual testing.</li>
            <li>Reusable Test Scripts: Creating robust and maintainable scripts for long-term value.</li>
          </ul>
        </>
      ),
    },
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Utilizing data and metrics to track quality, identify trends, and drive continuous improvement.',
    modalContent: {
      title: 'Insights through Analytics',
      description: (
        <>
          <p>Data-driven QA involves:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Defect Trend Analysis: Identifying patterns in defects to address root causes.</li>
            <li>Performance Metrics: Monitoring application speed, stability, and resource usage.</li>
            <li>Test Coverage Reports: Visualizing the extent of testing and identifying gaps.</li>
            <li>Quality Dashboards: Providing stakeholders with a clear view of the product's quality status.</li>
          </ul>
        </>
      ),
    },
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Implementing security testing practices to identify and mitigate vulnerabilities proactively.',
    modalContent: {
      title: 'Ensuring Software Security',
      description: (
        <>
          <p>Security is paramount. Our approach includes:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Vulnerability Scanning: Using automated tools to detect known security weaknesses.</li>
            <li>Penetration Testing: Simulating attacks to identify exploitable vulnerabilities.</li>
            <li>Security Code Reviews: Analyzing source code for security flaws.</li>
            <li>Compliance Checks: Ensuring software adheres to relevant security standards and regulations.</li>
          </ul>
        </>
      ),
    },
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Key QA Specializations</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Exploring the diverse facets of Quality Assurance that drive software excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((skill) => (
            <QaCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              modalContent={skill.modalContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
