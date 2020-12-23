export const projects = [
  {
    id: 'p1',
    name: 'Project 1',
    description: 'Description',
    tools: 'HTML/CSS',
    phase: 'Production',
    status: 'On-Time',
    startDate: '12/10/2020',
    owner: 'dionisggr',
    collaboration: false,
    collaborators: [],
    github: 'github.com'
  },
  {
    id: 'p2',
    name: 'Project 2',
    description: 'Description',
    tools: 'React',
    phase: 'Development',
    status: 'Delayed',
    startDate: '12/13/2020',
    owner: 'dionisggr',
    collaboration: false,
    collaborators: [],
    github: 'github.com'
  }  
];

export const issues = [
  {
    id: 'i1',
    name: 'Issue 1',
    projectID: 'p1',
    description: 'Description',
    tools: 'HTML/CSS',
    phase: 'Backlog',
    status: 'Pending',
    startDate: '12/10/2020',
    owner: 'dionisggr',
    collaboration: false,
    collaborators: [],
    github: 'github.com'
  },
  {
    id: 'i2',
    name: 'Issue 2',
    projectID: 'p2',
    description: 'Description',
    tools: 'React',
    phase: 'Development',
    status: 'On-Time',
    startDate: '12/13/2020',
    owner: 'dionisggr',
    collaboration: false,
    collaborators: [],
    github: 'github.com'
  }  
];

export const post = [
  {
    id: 'p1i1',
    message: 'Post message',
    user: 'dionisggr',
    date: Date().toString(),
  },

];