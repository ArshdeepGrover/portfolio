import { ICertificate } from '@models/certificate.model';

export const certificates: ICertificate[] = [
  {
    id: 1,
    title: 'Java Foundations with Data Structures',
    issuer: 'Coding Ninjas',
    date: 'Jul 2018',
    description:
      'Java programming fundamentals with focus on data structures, algorithms, and object-oriented programming.',
    image: '/certificates/cn_java.jpg',
    credentialUrl:
      'https://ninjasfiles.s3.amazonaws.com/certificate26466c018bc8d2b8be2e1afa4bed9e0e37346.pdf',
  },
  {
    id: 2,
    title: 'Front End | Full Stack Web Development',
    issuer: 'Coding Ninjas',
    date: 'Jun 2019 - Sep 2019',
    description:
      'Frontend development certification covering HTML, CSS, JavaScript, and modern frontend frameworks.',
    image: '/certificates/cn_frontend.jpg',
    credentialUrl:
      'https://ninjasfiles.s3.amazonaws.com/certificate26888380bd48343dc7bf43df1f5d10e5ea92b0.pdf',
  },
  {
    id: 3,
    title: 'Back End | Full Stack Web Development',
    issuer: 'Coding Ninjas',
    date: 'Jun 2019 - Jan 2020',
    description:
      'Comprehensive backend development course covering Node.js, databases, MongoDB, and server-side programming.',
    image: '/certificates/cn_backend.jpg',
    credentialUrl:
      'https://ninjasfiles.s3.amazonaws.com/certificate268882fc3fb0daf818c98b28d7b30748f36e44.pdf',
  },
  {
    id: 4,
    title: 'SQL Basics',
    issuer: 'HackerRank',
    date: 'May 2025',
    description: 'It includes simple queries, relationships, and aggregators.',
    image: '/certificates/sql_basic.jpg',
    credentialUrl: 'https://www.hackerrank.com/certificates/c593edd20867',
  },
  {
    id: 5,
    title: 'Angular Basics',
    issuer: 'HackerRank',
    date: 'May 2025',
    description:
      'It covers topics like MVC Frameworks, Components (Angular, Dynamic, Styling), TypeScript, Two Way Binding and Form Validation',
    image: '/certificates/angular_basic.jpg',
    credentialUrl: 'https://www.hackerrank.com/certificates/e087914985b6',
  },
  {
    id: 6,
    title: 'JavaScript Basics',
    issuer: 'HackerRank',
    date: 'May 2025',
    description:
      'It covers topics like functions, currying, hoisting, scope, inheritance, events and error handling.',
    image: '/certificates/javascript_basic.jpg',
    credentialUrl: 'https://www.hackerrank.com/certificates/bc19ebd388e9',
  },
];
