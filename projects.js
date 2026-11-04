/* ============================================================
   PORTFOLIO DATA — one entry per project.
   Cards (#projectGrid), the detail dialog and the résumé's
   "Key projects" list are all rendered from this array.

   To add photographs / videos later, drop files in
   assets/projects/<id>/ and fill in `cover` and `media`, e.g.

     cover: 'assets/projects/expressways/cover.jpg',
     media: [
       { type: 'image', src: 'assets/projects/expressways/site-01.jpg', alt: 'Alignment survey', caption: 'Optional caption' },
       { type: 'video', src: 'assets/projects/expressways/flythrough.mp4', poster: 'assets/projects/expressways/poster.jpg' }
     ]
   ============================================================ */
window.PROJECTS = [
  {
    id: 'expressways',
    featured: true,
    sector: 'Greenfield Expressway',
    title: 'Greenfield Expressways — Gujarat',
    subtitle: 'Packages 1, 3 & 6',
    formal: 'Consultancy Services for Feasibility Study and Preparation of Detailed Project Report for Development of Expressways for Package 1, Package 3 and Package 6',
    status: 'Ongoing',
    period: 'Sep 2025 – Ongoing',
    location: 'Gujarat, India',
    client: 'Gujarat State Road Development Corporation Ltd. (GSRDC)',
    role: 'Highway Engineer',
    figs: [['539 km', 'Total length'], ['3', 'Packages (1, 3 & 6)'], ['Greenfield', 'Corridor type']],
    summary: 'Feasibility analysis and DPRs for new greenfield expressway corridors — identifying optimal alignments to enhance high-speed regional connectivity across Gujarat.',
    features: 'Feasibility analysis and preparation of Detailed Project Reports for new greenfield expressway corridors across Gujarat, delivered in six packages — three of which (Packages 1, 3 and 6) are assigned to the team. The objective is to identify optimal alignments and develop technically viable expressway corridors that enhance high-speed regional connectivity, reduce travel time and support economic growth across key regions of the state.',
    did: [
      'Part of the design and planning team for greenfield alignment design and development in Autodesk Civil 3D, and for pavement design across the packages.',
      'Prepared and evaluated horizontal alignments for the proposed corridors, considering terrain conditions, settlement avoidance and integration with existing transportation networks.',
      'Contributed to the inception report and prepared the draft alignment options reports — compiling and analysing geographical features, land use, environmental constraints and existing infrastructure along the corridor.',
      'Identified and documented cross-drainage structures, road crossings, railway crossings and other engineering structures along the proposed alignments.',
      'Prepared technical datasets, maps and alignment analysis supporting feasibility assessment and DPR preparation.'
    ],
    takeaway: 'Experience in greenfield corridor planning, expressway alignment design, feasibility assessment and technical documentation for large-scale highway infrastructure.',
    cover: '',
    media: []
  },
  {
    id: 'rbd-ppu',
    sector: 'Policy & Monitoring',
    title: 'Technical Assistance to the Policy & Planning Unit, R&BD',
    formal: 'Technical Assistance to the Policy and Planning Unit, Roads and Buildings Department, GoG (R&BD)',
    status: 'Ongoing',
    period: 'May 2025 – Ongoing',
    location: 'Gujarat, India',
    client: 'Roads and Buildings Department, Government of Gujarat (R&BD)',
    role: 'Highway Engineer',
    figs: [['1,100 km', 'Garvi Gujarat corridor'], ['173', 'Damaged bridges tracked'], ['Web-based', 'Monitoring system']],
    summary: 'Strengthening planning, monitoring and reporting for the state’s major road schemes — from a web-based monitoring system to daily tracking of damaged bridges.',
    features: 'Strengthening the Policy and Planning Unit (PPU) and supporting the Roads & Buildings Department in project planning, monitoring and reporting for major road infrastructure schemes across the state. The assignment improves institutional capacity to monitor ongoing highway and bridge projects, develops standardised reporting systems, prepares departmental reports and supports the evaluation and tracking of flagship schemes — including structured data systems for real-time monitoring of works by the department’s field divisions.',
    did: [
      'Provided technical assistance to the PPU in monitoring the progress of infrastructure works across Gujarat.',
      'Contributed to the Annual Report of the Roads & Buildings Department for FY 2024-25 — compilation, analysis and coordination with divisions for data collection.',
      'Developed structured data-collection formats and monitoring templates, managed Google Sheets-based tracking systems, and developed a web-based monitoring system.',
      'Supported monitoring of the 1,100 km Garvi Gujarat High-Speed Corridor — preparing review formats and consolidating progress from multiple divisions.',
      'Prepared Superintending Engineer (SE) review presentations summarising performance indicators and key monitoring observations.',
      'After the Gambhira bridge incident, carried out daily monitoring of 158 and later 173 damaged bridges across the state, and developed automated monitoring abstracts for reporting to senior officials.',
      'Played a key role in monitoring the Tourist Connecting Roads Scheme, the Core Road Network, the White Topping Scheme and the PBMC/STMC scheme.'
    ],
    takeaway: 'Experience in infrastructure project monitoring, institutional reporting systems, highway programme management and coordination with government officials for large-scale road development programmes.',
    cover: '',
    media: []
  },
  {
    id: 'ch0-junction',
    sector: 'Junction Design',
    title: 'Traffic Management Concept Plan — Ch-0 Intersection, Gandhinagar',
    formal: 'Concept Plan for Traffic Management at Ch-0 Intersection in Gandhinagar on NH-147 and SH-71',
    period: 'Jun 2025 – Feb 2026',
    location: 'Gujarat, India',
    client: 'Capital Project Division 3, Roads and Buildings Department, Government of Gujarat',
    role: 'Highway Engineer',
    figs: [['NH-147 × SH-71', 'Intersecting corridors'], ['Concept', 'Design stage'], ['Civil 3D', 'Design tool']],
    summary: 'A concept-level traffic management and geometric improvement plan to improve flow, safety and capacity at a key Gandhinagar intersection.',
    features: 'Preparation of a concept-level traffic management and geometric improvement plan for the Ch-0 intersection in Gandhinagar. The assignment evaluated existing traffic conditions, identified operational issues and developed an optimised intersection layout to improve traffic flow, enhance safety and accommodate future traffic demand.',
    did: [
      'Participated as part of the design team in preparing the concept plan for the Ch-0 intersection improvement.',
      'Designed the proposed intersection layout — horizontal alignments and vertical profiles in Autodesk Civil 3D — and prepared cross-sections.',
      'Assisted in the conceptual geometric design, focusing on safe traffic movements, improved turning radii and better operational efficiency.',
      'Prepared design drawings and drafted and compiled the report.',
      'Coordinated with team members to integrate technical inputs into the final project documentation.'
    ],
    takeaway: 'Hands-on experience in grade-separated junction design, traffic-flow improvement planning, geometric design development and technical reporting for intersection improvement projects.',
    cover: '',
    media: []
  },
  {
    id: 'ahmedabad-mehsana',
    sector: 'DPR & PPP Procurement',
    title: 'Ahmedabad–Mehsana (SH-41) — 8‑Lane Upgradation',
    formal: 'Detailed Project Report Preparatory (DPR) and Procurement Services for Ahmedabad-Mehsana (4L) Toll Road SH-41',
    period: 'Jul 2025 – Feb 2026',
    location: 'Gujarat, India',
    client: 'GRICL and Roads and Buildings Department, Government of Gujarat',
    role: 'Highway Engineer',
    figs: [['49 km', 'Length'], ['8-lane', 'Upgraded from 4-lane'], ['₹2,617 Cr', 'Project cost']],
    summary: 'DPR and procurement services to upgrade a 49 km state highway from 4 to 8 lanes with service roads and grade separators under the DBFOMT model.',
    features: 'Project preparatory (DPR) and procurement services for upgradation and strengthening of the Ahmedabad–Mehsana corridor (SH-41) from 4 lanes to 8 lanes with service roads and grade separators, under the DBFOMT model on a modified annuity basis. The scope includes geometric improvements, pavement strengthening, service-road development, intersection improvements, forest clearance, and the DPR and detailed engineering inputs required for contract documentation and implementation.',
    did: [
      'Prepared contract-schedule documentation and engineering inputs — Schedules A, B and C — defining the scope of works, project assets and maintenance obligations under the DBFOMT framework.',
      'Supported design review and finalisation of road profiles, including elevated corridors, grade separators and ramps.',
      'Prepared cross-sections and design inputs for the main carriageway and service-road profiles.',
      'Extracted and compiled existing ground levels and roadside feature data for service roads and adjoining infrastructure.',
      'Assisted in preparing the design drawings required for the DPR and contract documentation.'
    ],
    takeaway: 'Contributed to highway design refinement, contract schedules, geometric design updates and documentation for a state highway project under a PPP-based model.',
    cover: '',
    media: []
  },
  {
    id: 'amaravati',
    sector: 'Greenfield Roads & Interchange',
    title: 'Amaravati Trunk Roads to NH-16 — Trumpet Interchange',
    formal: 'Consultancy Services for Preparation of Detailed Project Report (DPR) for Connecting Amaravati Trunk Infrastructure Roads – E5, E11, E13 and E15 to NH-16 in Amaravati, Capital City of Andhra Pradesh, India',
    period: 'Dec 2024 – Mar 2025',
    location: 'Amaravati Capital City Region, Andhra Pradesh, India',
    client: 'Amaravati Development Corporation Limited (ADCL) and APCRDA — Andhra Pradesh Capital Region Development Authority',
    role: 'Highway Engineer',
    figs: [['12 km', 'Length'], ['4/6-lane', 'Greenfield trunk roads'], ['Trumpet', 'Interchange with NH-16']],
    summary: 'Greenfield 4/6-lane trunk roads linking Amaravati’s E5, E11, E13 and E15 corridors to NH-16, including a full-fledged trumpet interchange.',
    features: 'Development of 4/6-lane greenfield trunk roads connecting Amaravati’s proposed E5, E11, E13 and E15 corridors with NH-16 — including geometric design, grade-separated interchange planning, feasibility and DPR preparation, hill cutting and limited right-of-way in forest.',
    did: [
      'Prepared vertical profiles for the finalised alignment and cross-sections for the proposed greenfield corridors in Autodesk Civil 3D.',
      'Carried out surface data analysis and terrain modification — cleaning survey data, correcting surface points and modelling the existing hill.',
      'Extracted rail-top levels and relevant data for the General Arrangement Drawings of the ROB.',
      'Responsible for the geometric design of a trumpet interchange connecting the proposed E13 corridor with NH-16, and supported preparation of design drawings and layout plans.',
      'Modelled the corridor, calculated cut and fill quantities, assisted in developing engineering drawings and compiled technical inputs for the DPR.'
    ],
    takeaway: 'Extensive experience in greenfield highway design, interchange design, terrain data processing, corridor modelling, quantity estimation and DPR preparation for major urban connectivity projects.',
    cover: '',
    media: []
  },
  {
    id: 'shantipura-khoraj',
    sector: 'DPR & Traffic Surveys',
    title: 'Shantipura–Khoraj GIDC (SH-17) — 6‑Lane DPR',
    formal: 'Preparation of Detailed Project Report (DPR) for Shantipura Circle to Khoraj GIDC Junction, section of Ahmedabad-Viramgam-Maliya State Highway',
    period: 'Jul 2024 – Dec 2024',
    location: 'Gujarat, India',
    client: 'Gujarat State Road Development Corporation (GSRDC)',
    role: 'Intern / Highway Engineer',
    figs: [['28.87 km', 'Length'], ['6-lane', 'Upgraded section'], ['SH-17', 'Ahmedabad–Maliya toll road']],
    summary: 'DPR for upgrading a 28.87 km section of State Highway-17 to six lanes — from traffic surveys and drawings to RFP and technical schedules.',
    features: 'Detailed Project Report for upgrading Shantipura to Khoraj on State Highway-17, a section of the Ahmedabad–Maliya toll road. Length: 28.87 km, 6 lanes.',
    did: [
      'Performed and managed traffic surveys and site reconnaissance surveys to understand existing traffic, roadway conditions and surrounding development along the corridor.',
      'Compiled and analysed survey data to support traffic assessment and design considerations for the DPR.',
      'Worked in the design and drafting team — road signage plans, encroachment plans and cross-section drawings.',
      'Prepared and compiled DPR documentation, including drafting report sections, integrating design drawings and coordinating with other technical teams.',
      'Prepared technical schedules and the RFP, and assisted in the preparation and review of the concessionaire agreement.'
    ],
    takeaway: 'Practical experience in traffic data collection, highway widening design support, preparation of engineering drawings and DPR documentation for state highway capacity augmentation projects.',
    cover: '',
    media: []
  },
  {
    id: 'hpltrdp',
    featured: true,
    sector: 'Network Assessment',
    title: 'High-Priority Long-Term Road Development Program',
    formal: 'Consultancy Services for “Formulation of High Priority – Long Term Road Development Program”',
    period: 'Feb 2024 – Jan 2025',
    location: 'Gujarat, India',
    client: 'Roads and Buildings Department, Government of Gujarat',
    role: 'Intern',
    figs: [['17,668 km', 'Road network assessed'], ['~150', 'OD survey locations'], ['~75', 'Axle load locations']],
    summary: 'Condition assessment of Gujarat’s road network to formulate a theme-based, phased long-term development programme for multilateral funding.',
    features: 'Formulation of a theme-based long-term road development programme for the state, supporting R&BD in appraisal of projects to the Government of India for multilateral funding and preparing a phased financing and roll-out plan. Network covered: 17,668 km — 6-lane 1,078 km, 4-lane 4,670 km, 2-lane 10,455 km, intermediate-lane 726 km and single-lane 740 km.',
    did: [
      'Participated in the programme’s condition assessment of approximately 17,668 km of road network across Gujarat.',
      'Conducted field investigations in South Gujarat and parts of Saurashtra covering pavement condition, road geometry, bridges, culverts, roadside features and speed–delay studies.',
      'Contributed to processing and analysis of Origin–Destination surveys at around 150 locations and axle load surveys at approximately 75 locations.',
      'Compiled survey data and prepared supporting information for the final project report.'
    ],
    takeaway: '',
    cover: '',
    media: []
  }
];
