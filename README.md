# TechnoQuiz Backend

[TechnoQuiz Backend](https://technoquiz-env.eba-33dpsiuk.ap-south-1.elasticbeanstalk.com) 


## How to run this project

- Clone Repo 
```git clone https://github.com/liitcode/TechnoQuiz_Backend```

- Install NPM packages
```npm install```

- Add .env file 
```Env
USERNAME_MONGODB = 
PASSWORD_MONGODB = 
CLUSTER_MONGODB = 
DATABASE_MONGODB = 
AUTH_TOKEN_SECRET = 
QAPI_TOKEN = 
QAPI_BASE = 
RAZORPAY_KEY_ID = 
RAZORPAY_KEY_SECRET = 
ENCRYPTION_SALT = 
```

- Run the Project
```npm start```

- You can set the port in index.js file or default will be http://localhost:8000


## System Architecture

![Backend Architecture](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Backend_Architecture_muzJ4bpg5.jpg)


## Schema Design

![Schema](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Schema_Design.jpg)


## CI/CD & Deployment

### Deployment [AWS EC2 Instance (Elasticbeanstalk)](https://technoquiz-env.eba-33dpsiuk.ap-south-1.elasticbeanstalk.com)

![dashboard](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Screenshot_2021-06-26_at_6.16.52_PM.png)

### CI/CD AWS CodePipeline (code Build,code Deploy)

![CiCD](https://ik.imagekit.io/16zqnfdfuhh/TQ_Backend/Screenshot_2021-06-26_at_6.17.34_PM.png)

- with  Jira and Slack Integration 

|Jira Ticket|Slack Integration|
|-----|-----|
|![Jira](https://ik.imagekit.io/16zqnfdfuhh/TQ_Frontend/Frontend_Ticket_1_qLCfMiwD9.png)|![Slack](https://ik.imagekit.io/16zqnfdfuhh/TQ_Frontend/AWS_chat_jTb09m5FV.png)


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


## Contact

- Divyanshu Verma [divyanshuverma2396@gmail.com](divyanshuverma2396@gmail.com)
- Prashant Parashar [prashantparashardt@gmail.com](prashantparashardt@gmail.com)
