import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin.admin@gmail.com' },
    update: {},
    create: {
      username: 'admin.admin@gmail.com',
      password: await hash('Zaxscd#123', await genSalt(10)),
      firstname: 'Shomas',
      lastname: 'Thelby',
      role: 'Admin'
    }
  });
  console.log('admin', admin);
  const companies = await prisma.company.createMany({
    data: [
      {
        name: 'Beetroot Academy',
        preview: 'Beetroot Academy is a Swedish-Ukrainian social enterprise, on a mission to help people have great careers in the digital economy. We believe that in the 21st century, everyone deserves access to professional education and development, no matter who they are or where they are from.'
      },
      {
        name: 'QArea',
        preview: 'As a software outsourcing company with 21 years of experience in delivering complex, custom solutions, we’ve built strong expertise in reliable architecture, efficient development practices, and transparent communication with clients. Our software engineers have a proven track record of creating successful digital products and services from simple websites to feature-rich mobile apps to powerful CMS and ERP tools.'
      },
      {
        name: 'IT-TRANSIT LLC',
        preview: 'IT-TRANSIT LLC  specializes in designing, development and implementation of corporate automated information systems of fuel and energy complex enterprises, transport and municipality management, as well as the performance of topographic, geodesic, cadastre, cartography and engineering research, providing consulting and expert services in the field of information technology and geodetic works.'
      },
      {
        name: 'ITOP 1000',
        preview: 'We are a strong team of professionals, who are innovative, energetic and highly creative. Create Web App from a scratch and more. Use next technologies: Angular 2+ (4-10), NgRx(Redux), IONIC, Node.js, RxJS, JQuery, MongoDB, Sass/Scss, Bootstrap, Angular Material.'
      },
      {
        name: 'CyberBionic Systematics',
        preview: 'CyberBionic Systematics information technology training center was established in 2007 and for a long time specialized in training .NET and web developers. CyberBionic Systematics has developed its own comprehensive training system, which incorporates the best traditions and approaches in training of the Microsoft company, which we have been a partner of since 2012.'
      }
    ],
    skipDuplicates: true
  });
  console.log('companies', companies);
  const experiences = await prisma.$transaction(async () => {
    const experiences = [
      {
        data: {
          position: 'Front-end Teacher',
          start: 'Mar 2023',
          end: 'Present'
        },
        accomplishments: [
          'Teach a group of students of the academy front-end development',
          'Study the best practices of teaching and mentoring on the materials of academy',
          'Learn and practice with basic and advanced topics of React'
        ]
      },
      {
        data: {
          position: 'Fullstack Developer',
          start: 'Mar 2022',
          end: 'Oct 2022',
        },
        accomplishments: [
          'Delimited the functionality of the application based on authentication',
          'Developed a module of modal dialogs that was used in conjunction with authentication throughout application',
          'Created Walmart shopping cart module on client side of app'
        ]
      },
      {
        data: {
          position: 'Front-end Developer',
          start: 'Mar 2021',
          end: 'Jan 2022'
        },
        accomplishments: [
          'Created a system user management module for administrators',
          'Developed a module for delimiting user access rights to system objects for administrators',
          'Implemented a module for reporting on work performed on system objects'
        ]
      },
      {
        data: {
          position: 'Front-end Developer',
          start: 'Mar 2021',
          end: 'Jan 2022'
        },
        accomplishments: [
          `Worked in team of front-end developers on integrating Jira and Github to user workspace`,
          'Developed team workspace functionality for managing members, restrictions and integrations like Github',
          `Implemented auth workflow inside team workspace`
        ]
      },
      {
        data: {
          position: 'Front-end Developer',
          start: 'Oct 2019',
          end: 'Aug 2020'
        },
        accomplishments: [
          'Collaborated with a team of front-end developers to migrate different features with Angular',
          'Developed user personal account module with Angular that allows students manage data such as active curses, lectures material, passed tests etc',
          'Worked on new features with Razor Pages'
        ]
      }
    ]
    const companies = await prisma.company.findMany();
    for (let i = 0; i < companies.length; i++) {
      const experience = await prisma.experience.create({
        data: {
          ...experiences[i].data,
          companyId: companies[i].id
        }
      });
      for (let j = 0; j < experiences[i].accomplishments.length; j++) {
        await prisma.accomplishment.create({
          data: {
            content: experiences[i].accomplishments[j],
            experienceId: experience.id
          }
        });
      }
    }
    return { experiences: await prisma.experience.findMany(), accomplishments: await prisma.accomplishment.findMany() };
  });

  console.log('experiences ', experiences);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
