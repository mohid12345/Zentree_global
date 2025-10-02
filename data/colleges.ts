export interface College {
  id: string;
  name: string;
  location: string;
  country: string;
  type: 'local' | 'international';
  description: string;
  tuitionFee: string;
  programs: string[];
  rating: number;
  image: string;
  established: number;
  accreditation: string[];
}

export const localColleges: College[] = [
  {
    id: '1',
    name: 'University of Technology',
    location: 'Karachi',
    country: 'Pakistan',
    type: 'local',
    description: 'Leading technology university with excellent engineering and computer science programs.',
    tuitionFee: 'PKR 200,000/year',
    programs: ['Computer Science', 'Software Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200/2563eb/ffffff?text=UoT',
    established: 1995,
    accreditation: ['HEC', 'PEC']
  },
  {
    id: '2',
    name: 'National College of Business',
    location: 'Lahore',
    country: 'Pakistan',
    type: 'local',
    description: 'Premier business school offering world-class MBA and undergraduate business programs.',
    tuitionFee: 'PKR 300,000/year',
    programs: ['MBA', 'BBA', 'Finance', 'Marketing', 'Human Resources'],
    rating: 4.3,
    image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=NCB',
    established: 1988,
    accreditation: ['HEC', 'AACSB']
  },
  {
    id: '3',
    name: 'Medical University of Punjab',
    location: 'Lahore',
    country: 'Pakistan',
    type: 'local',
    description: 'Top medical university with state-of-the-art facilities and experienced faculty.',
    tuitionFee: 'PKR 500,000/year',
    programs: ['MBBS', 'BDS', 'Pharmacy', 'Nursing', 'Medical Technology'],
    rating: 4.7,
    image: 'https://via.placeholder.com/300x200/dc2626/ffffff?text=MUP',
    established: 1960,
    accreditation: ['PMDC', 'HEC']
  },
  {
    id: '4',
    name: 'Institute of Arts & Design',
    location: 'Islamabad',
    country: 'Pakistan',
    type: 'local',
    description: 'Creative hub for aspiring artists and designers with modern studios and workshops.',
    tuitionFee: 'PKR 150,000/year',
    programs: ['Fine Arts', 'Graphic Design', 'Interior Design', 'Fashion Design'],
    rating: 4.2,
    image: 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=IAD',
    established: 2005,
    accreditation: ['HEC']
  }
];

export const internationalColleges: College[] = [
  {
    id: '5',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    country: 'United States',
    type: 'international',
    description: 'World-renowned Ivy League university with exceptional academic programs and research facilities.',
    tuitionFee: '$54,000/year',
    programs: ['Law', 'Medicine', 'Business', 'Engineering', 'Liberal Arts'],
    rating: 4.9,
    image: 'https://via.placeholder.com/300x200/8b0000/ffffff?text=Harvard',
    established: 1636,
    accreditation: ['NEASC', 'AACSB', 'LCME']
  },
  {
    id: '6',
    name: 'University of Oxford',
    location: 'Oxford',
    country: 'United Kingdom',
    type: 'international',
    description: 'Historic university with centuries of academic excellence and prestigious alumni.',
    tuitionFee: '£30,000/year',
    programs: ['Philosophy', 'Politics', 'Economics', 'Medicine', 'Law'],
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200/003366/ffffff?text=Oxford',
    established: 1096,
    accreditation: ['QAA', 'GMC']
  },
  {
    id: '7',
    name: 'University of Toronto',
    location: 'Toronto, ON',
    country: 'Canada',
    type: 'international',
    description: 'Leading Canadian research university with diverse programs and multicultural environment.',
    tuitionFee: 'CAD $58,000/year',
    programs: ['Computer Science', 'Medicine', 'Engineering', 'Business', 'Arts & Science'],
    rating: 4.6,
    image: 'https://via.placeholder.com/300x200/003f7f/ffffff?text=UofT',
    established: 1827,
    accreditation: ['AUCC', 'AACSB']
  },
  {
    id: '8',
    name: 'Australian National University',
    location: 'Canberra, ACT',
    country: 'Australia',
    type: 'international',
    description: 'Premier research university in Australia with strong focus on innovation and discovery.',
    tuitionFee: 'AUD $45,000/year',
    programs: ['International Relations', 'Economics', 'Science', 'Engineering', 'Law'],
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200/ff6600/ffffff?text=ANU',
    established: 1946,
    accreditation: ['TEQSA', 'AACSB']
  },
  {
    id: '9',
    name: 'Technical University of Munich',
    location: 'Munich',
    country: 'Germany',
    type: 'international',
    description: 'Top technical university in Europe with cutting-edge research and industry partnerships.',
    tuitionFee: '€3,000/year',
    programs: ['Engineering', 'Computer Science', 'Natural Sciences', 'Medicine', 'Management'],
    rating: 4.4,
    image: 'https://via.placeholder.com/300x200/0065bd/ffffff?text=TUM',
    established: 1868,
    accreditation: ['AQAS', 'FIBAA']
  }
];

export const getAllColleges = (): College[] => {
  return [...localColleges, ...internationalColleges];
};

