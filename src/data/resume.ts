/**
 * The authoritative content of the October 2026 résumé.
 *
 * Every date, title, number, school, credential, and tool on the rendered page
 * comes from `Evan Zellner Resume 102026.pdf`. The page does not add
 * accomplishments. `scripts/check-resume.mjs` cross-checks the rendered output
 * and the downloadable PDF against the source document.
 */

export interface ResumeRole {
  title: string;
  dates: string;
}

export interface ResumeJob {
  organization: string;
  location?: string;
  roles: ResumeRole[];
  bullets: string[];
  clients?: string;
  technicalHiring?: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  active?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface VolunteerRole {
  organization: string;
  role: string;
  dates: string;
}

import { href } from '../lib/paths';

export const resume = {
  name: 'Evan Zellner',
  headline: 'Human Resources | Talent Acquisition | Technical Recruiting',
  location: 'Wichita Falls, Texas',
  email: 'evanzellner@outlook.com',
  linkedin: 'https://www.linkedin.com/in/evanzellner',
  linkedinLabel: 'linkedin.com/in/evanzellner',
  updated: 'October 2026',
  pdfPath: href('/downloads/evan-zellner-resume-october-2026.pdf'),
  summary: [
    'Human resources and talent acquisition professional with a Master of Science in Human Resource Management, active PHR and SHRM-CP credentials, and six years of full-cycle recruiting experience.',
    'Combines enterprise technical hiring and agency recruiting with hands-on employee relations, performance coaching, training, workforce operations, and HR systems implementation. Generated $2.6 million in annual recruiting revenue, personally hired and onboarded more than 500 field technicians, and led an ATS evaluation and migration. Known for profitable placements, high-touch candidate support, data-informed sourcing, and structured process improvement. Open to relocating for the right opportunity.',
  ],
  competencies: [
    'Full-Cycle Technical and Corporate Recruiting',
    'Hiring Manager Intake and Stakeholder Partnership',
    'Technical Candidate Screening',
    'Sourcing and Pipeline Development',
    'Pay Negotiation and Offer Presentation',
    'Contractor Support',
    'Employee Relations',
    'Performance Coaching and Discipline',
    'Employee Training',
    'ATS Evaluation, Migration and Workflow Design',
    'Scheduling, Timekeeping and Payroll Review',
    'Onboarding Coordination',
  ],
  experience: [
    {
      organization: "Marco's Pizza",
      location: 'Wichita Falls, TX',
      roles: [{ title: 'Shift Lead and Certified Trainer', dates: 'June 2026 – Present' }],
      bullets: [
        'Selected for advancement into shift leadership within the first two weeks of employment based on performance, reliability, and leadership capability.',
        'Train new employees through explanation, demonstration, observed practice, and corrective feedback using established company procedures and preparation standards.',
        'Address employee complaints, workplace conflicts, and performance concerns; contribute to coaching, write-ups, disciplinary discussions, and termination recommendations to management.',
        'Own weekly inventory receiving and stock-control activities, including reconciling deliveries, applying Prep Wizard date labels, maintaining FIFO rotation, removing expired products, and reorganizing back-of-house storage.',
      ],
    },
    {
      organization: 'Experis',
      location: 'Remote',
      roles: [
        { title: 'Senior Technical Recruiter', dates: 'March 2023 – June 2025' },
        { title: 'Technical Recruiter', dates: 'August 2020 – March 2023' },
      ],
      bullets: [
        'Generated $1.3 million in revenue and $356,000 in gross profit in FY2021 and $2.6 million in revenue and $696,000 in gross profit in FY2022, maintaining average gross margins of 26% and 26.6%, respectively.',
        'Earned promotion to Senior Technical Recruiter after sustaining average weekly gross profit of at least $13,000 for 12 consecutive months; reached a high of $17,500 during FY2022.',
        'Typically delivered approximately 2–4 candidate starts per month, with project-based months reaching approximately 10 starts; tied for first in monthly hires among all Experis recruiters supporting the Charles Schwab account in January 2022.',
        'Managed approximately 8–12 concurrent technical requisitions for primarily 3–18-month contract assignments and selected contract-to-hire opportunities, working directly with hiring managers or through account managers based on the client relationship.',
        'Conducted hiring-manager intake discussions, sourced and screened candidates, negotiated candidate pay, presented offers, coordinated interviews, and guided selected candidates through third-party employment-verification, background-screening, and onboarding workflows.',
        'Evaluated technical candidates through detailed project discussions, separating individual hands-on responsibilities from general team exposure and validating the consistency of stated experience. Clients conducted formal technical interviews and any required technical assessments.',
        'Built proactive pipelines using Boolean search, talent mapping, LinkedIn Recruiter, SeekOut, internal databases, and searchable Excel records.',
        'Used A/B testing to refine LinkedIn Recruiter subject lines and outreach messaging, with targeted campaigns of approximately 100 prospects typically generating open rates of approximately 40%.',
        'Maintained ongoing contact with contractors to resolve pay and assignment concerns, coordinate extensions, and identify subsequent placement opportunities; received an Experis-reported 9.9/10 Net Promoter Score from post-hire candidate surveys.',
        'Mentored four newly hired recruiters through weekly early-tenure meetings, translating formal training into practical sourcing, organization, candidate-management, and requisition-management methods.',
      ],
      clients:
        'Dell, EMC, Charles Schwab, TD Ameritrade, Fidelity Investments, Indeed, John Deere, Supercuts.',
      technicalHiring: [
        'Software Engineering (.NET, Java, Full Stack, Angular, React)',
        'Cloud and Infrastructure (DevOps, Site Reliability Engineering, Cloud Engineering, Intune and Autopilot)',
        'Data and Systems (SQL and Oracle Database Administration, Oracle and PL/SQL Development, Storage Engineering)',
        'Business and Product Support (Content Management, UX Research, Program Leadership)',
        'IT Support and Networking (Deployment, Help Desk, Network Engineering, SharePoint Administration)',
      ],
    },
    {
      organization: 'SMARTECH & Associates, LP',
      location: 'Austin, TX',
      roles: [{ title: 'Technical Recruiter', dates: 'June 2019 – August 2020' }],
      bullets: [
        'Served as the company’s sole recruiter, managing full-cycle technical recruiting and onboarding across the United States and Canada with authority to make hiring selections within established client pay structures.',
        'Managed 10–30 concurrent requisitions and partnered directly with the CEO and Resource Manager to prioritize client requirements, identify workforce gaps, and maintain candidate pipelines for urgent and difficult-to-fill positions.',
        'Conducted structured candidate screenings that distinguished direct, hands-on technical experience from general project or team exposure while identifying inconsistencies and potentially misrepresented qualifications.',
        'Selected, placed, and onboarded 500+ individual field technicians over 14 months, coordinating onboarding documentation, required Dell certifications, repeat assignments, and final handoff to the Resource Manager for dispatch.',
        'Evaluated five to six replacement ATS platforms and led the migration from Google Hire to Comeet, including vendor demonstrations, data mapping, workflow design, implementation coordination, and user training.',
        'Built the recruiting workflow from requisition intake through sourcing, screening, interviewing, selection, onboarding, certification, and hire while connecting sourcing and job-distribution channels including Indeed, Monster, Broadbean, AppCast, and Betterteam.',
      ],
      clients: 'Dell, Unisys, Crowley Maritime, Purolator, DISYS.',
      technicalHiring: [
        'Deskside and Desktop Support, Help Desk, Server Maintenance, Hardware and Software Installation, System Migrations, Field Deployment Technicians',
      ],
    },
    {
      organization: 'J.Crew',
      location: 'Oklahoma City, OK',
      roles: [{ title: 'Assistant Store Manager', dates: 'August 2015 – October 2017' }],
      bullets: [
        'Supervised, trained, and coached approximately 6–20 associates; participated in hiring interviews and addressed employee complaints, workplace conflicts, performance reviews, coaching plans, write-ups, and disciplinary conversations.',
        'Documented performance concerns and consulted with the General Manager and upper management regarding disciplinary action and termination recommendations.',
        'Prepared employee schedules, corrected timekeeping discrepancies, and frequently audited weekly labor and payroll records before submission using Ceridian Dayforce.',
        'Explained workplace policies and guided employees to the appropriate HR resources for benefits, leave, pay, and other employment-related questions.',
        'Received and reconciled weekly shipments of approximately 150–250 boxes depending on season, delegated replenishment work, rotated back stock, and returned overlooked clearance merchandise to the sales floor.',
        'Reduced after-hours physical inventory counting from six hours to three by completing labeling and grouping before closing, training associates on scanner use, and implementing a defined counting process.',
        'Generated $2.4 million in personal sales from Q3 2015 through Q3 2017.',
        'Planned, promoted, set up, and ran a school fundraising event that generated approximately $10,000 in donations for a local STEM program.',
      ],
    },
    {
      organization: 'Independent Contractor',
      roles: [{ title: 'Rideshare and Delivery Services', dates: 'July 2015 – Present' }],
      bullets: [
        'Sustained full-time income through independent rideshare and delivery work while completing a Bachelor of Science in Business Management and preparing to transition into HR and technical staffing.',
        'Completed more than 5,000 passenger and delivery transactions across Lyft, Uber, DoorDash, Shipt, Postmates, and Roadie while maintaining an average customer rating of 4.98/5.',
      ],
    },
  ] satisfies ResumeJob[],
  education: [
    {
      degree: 'Master of Science, Human Resource Management',
      school: 'Capella University',
      year: '2025',
    },
    {
      degree: 'Bachelor of Science, Business Management',
      school: 'Western Governors University',
      year: '2019',
    },
    {
      degree: 'Associate of Arts, Management',
      school: 'American Public University',
      year: '2015',
    },
  ] satisfies EducationEntry[],
  certifications: [
    { name: 'SHRM Certified Professional (SHRM-CP)', issuer: 'SHRM', active: true },
    { name: 'Professional in Human Resources (PHR)', issuer: 'HRCI', active: true },
    { name: 'Getting Talent Back to Work', issuer: 'SHRM' },
    { name: 'Veterans at Work', issuer: 'SHRM' },
    { name: 'CompTIA Project+' },
    { name: 'Six Sigma Green Belt', issuer: 'Management and Strategy Institute' },
    { name: 'Lean Process Management', issuer: 'Management and Strategy Institute' },
    { name: 'Certified Staffing Professional (CSP)', issuer: 'American Staffing Association' },
    { name: 'Technical Services Certified (TSC)', issuer: 'American Staffing Association' },
    { name: 'Tech Recruitment Certified Professional', issuer: 'DevSkiller/SkillPanel' },
  ] satisfies Certification[],
  skills: [
    {
      label: 'ATS, HRIS, and VMS',
      items: [
        'Bullhorn',
        'Workday',
        'ADP',
        'SAP Fieldglass',
        'Beeline',
        'Google Hire',
        'Comeet',
      ],
    },
    {
      label: 'Recruiting and sourcing platforms',
      items: [
        'LinkedIn Recruiter',
        'SeekOut',
        'Indeed',
        'Monster',
        'Dice',
        'Broadbean',
        'AppCast',
        'Betterteam',
        'Internal candidate databases',
      ],
    },
    {
      label: 'Workforce and scheduling systems',
      items: ['Ceridian Dayforce', 'Calendly'],
    },
    {
      label: 'Business productivity tools',
      items: ['Microsoft Excel'],
    },
  ] satisfies SkillGroup[],
  volunteer: [
    {
      organization: 'CodePath.org',
      role: 'Resume & Behavioral Interview Coach',
      dates: '2020 – 2024',
    },
    {
      organization: 'Human Rights Campaign',
      role: 'Campaign Volunteer',
      dates: '2020',
    },
  ] satisfies VolunteerRole[],
  credentialNote:
    'Active status for SHRM-CP and PHR is as stated on the October 2026 résumé. Confirm currency with the issuing organizations before relying on it.',
  skillsNote:
    'Grouped by use for readability. Every tool listed appears in the October 2026 résumé.',
  phoneOmittedNote:
    'The downloadable PDF is the original October 2026 document and includes the phone number printed on it. The web page omits the phone number; email and LinkedIn are the public contact routes.',
} as const;
