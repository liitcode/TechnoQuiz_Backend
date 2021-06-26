# TechnoQuiz Backend

[TechnoQuiz Backend](https://technoquiz-env.eba-33dpsiuk.ap-south-1.elasticbeanstalk.com) 


## How to run this project

- Run `git clone https://github.com/liitcode/TechnoQuiz_Backend`
- Run Express server
- You can set the port in index.js file or default will be http://localhost:8000


## System Architecture

![Backend Architecture](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Backend_Architecture_BTrDxC9p4.jpg)


## Schema Design

![Schema](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Backend_Architecture.jpg)


## CI/CD & Deployment

### Deployment [AWS EC2 Instance (Elasticbeanstalk)](https://technoquiz-env.eba-33dpsiuk.ap-south-1.elasticbeanstalk.com)

![dashboard](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Screenshot_2021-06-26_at_6.16.52_PM.png)

    ### CI/CD AWS CodePipeline (code Build,code Deploy)

![CiCD](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Screenshot_2021-06-26_at_6.17.34_PM.png)


## Error Monitoring and Logs

- Application Monitoring and Error Tracking through [Sentry](https://sentry.io/organizations/divyanshu-verma/projects/technoquiz_backend/?project=5831144) 

## Security

- Domainless dynamic SSl bound to EC2 instance via nginx. For more details check folders '.ebextensions' and '.platform' under project directory.

![ssl](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/ss__UE-Blv4-8.jpg)


## Scalability

- AWS Elasticbeanstalk comes bundled with load balancer which can be enabled to sustain high user load as per demand.


## High Level Architecture

![HLA](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/HLA_Update_dhq1FPVE9.png)

## Tech Stack

- NodeJS
- Express JS
- MongoDb Cloud




