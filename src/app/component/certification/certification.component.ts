import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
})
export class CertificationComponent implements OnInit {
  certifications = [
    {
      name: 'AngularJS Course for Beginners to Advanced',
      organization: 'Udemy',
      credential_id: 'UC-ae3d643b-f778-4c3c-a0f7-d8727b367d6a',
      credential_url:
        'https://www.udemy.com/certificate/UC-ae3d643b-f778-4c3c-a0f7-d8727b367d6a/',
      issue_date: 'January 2019',
      skills: ['Java', 'DSA', 'oops'],
      image_url:
        './../../../assets/images/certification/UC-ae3d643b-f778-4c3c-a0f7-d8727b367d6a.jpg',
    },
    {
      name: 'CSS Complete Course For Beginners',
      organization: 'Udemy',
      credential_id: 'UC-25e2db72-6b27-4aef-bc6e-0bcc50294b3a',
      credential_url:
        'https://www.udemy.com/certificate/UC-25e2db72-6b27-4aef-bc6e-0bcc50294b3a/',
      issue_date: 'January 2019',
      skills: ['Java', 'DSA', 'oops'],
      image_url:
        './../../../assets/images/certification/UC-25e2db72-6b27-4aef-bc6e-0bcc50294b3a.jpg',
    },
    {
      name: 'Back End | Web development with Node.js',
      organization: 'Coding Ninjas India',
      credential_id: '0d3ba75124315642',
      credential_url:
        'https://ninjasfiles.s3.amazonaws.com/certificate268882fc3fb0daf818c98b28d7b30748f36e44.pdf',
      issue_date: 'January 2019',
      skills: ['Java', 'DSA', 'oops'],
      image_url:
        './../../../assets/images/certification/backend_0d3ba75124315642.jpg',
    },
    {
      name: 'Front End | Web development with Node.js',
      organization: 'Coding Ninjas India',
      credential_id: '81ec5b63dbf17b4e',
      credential_url:
        'https://ninjasfiles.s3.amazonaws.com/certificate26888380bd48343dc7bf43df1f5d10e5ea92b0.pdf',
      issue_date: 'September 2019',
      skills: ['Java', 'DSA', 'oops'],
      image_url:
        './../../../assets/images/certification/frontend_81ec5b63dbf17b4e.jpg',
    },
    {
      name: 'Java Foundations with data structure',
      organization: 'Coding Ninjas India',
      credential_id: '26466c018bc8d2b8be2e1afa',
      credential_url:
        'https://ninjasfiles.s3.amazonaws.com/certificate26466c018bc8d2b8be2e1afa4bed9e0e37346.pdf',
      issue_date: 'July 2018',
      skills: ['Java', 'DSA', 'oops'],
      image_url:
        './../../../assets/images/certification/dsa_26466c018bc8d2b8be2e1afa4bed9e0e37346.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
