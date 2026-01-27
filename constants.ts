import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "ERIK PEDRAZA GARCÍA",
  en: {
    role: "SOFTWARE ASSOCIATE II @ BBVA | COMPUTER ENGINEER | FOUNDER OF DATA CHOMPS",
    metrics: {
      projects: "MULTIPLE DEPLOYMENTS",
      certs: "5+ SPECIALIZATIONS",
      years: "4+ IN TECH"
    },
    sections: {
      about: "IDENTITY",
      highlights: "KEY ACHIEVEMENTS",
      experience: "PROFESSIONAL PATH",
      education: "ACADEMIC BACKGROUND",
      projects: "PROJECTS",
      contact: "CONTACT",
      skills: "TECH STACK",
      company: "DATA CHOMPS",
      labs: "LABS // EXPERIMENTAL_NODE"
    },
    aboutText: "I am a Computer Engineer with specialized experience in Insurance, Corporate Banking, and CIB (Corporate & Investment Banking). My focus is on intelligent analysis—not just fixing issues, but understanding systems deeply to implement structural improvements and resolve critical incidents. I am highly adaptable and experienced in managing high-stakes situations that require strict SLAs and coordination across multiple teams.",
    personalBio: "I am passionate about technology and the challenge of turning ideas into technical realities. I enjoy collaborating to bring ideas to life, constantly learning, and helping others grow. My goal is to materialize projects that solve real problems, applying my experience in development and support to create tools that truly help people and foster collective growth.",
    highlights: [
      "Led the strategic mapping and prioritization for a system migration initiative over a 5-month period at Inbursa.",
      "Successfully delivered urgent, full-cycle software solutions at Inbursa in under 2 weeks to meet critical deadlines.",
      "Unblocked and successfully completed a stalled DBLink removal project at Inbursa within a 2-month timeline.",
      "Optimized a critical ETL process at Inbursa, drastically reducing execution time from 2 hours to just 10 minutes.",
      "Permanently resolved 3 recurring critical incidents and patched vulnerabilities in 4 core banking applications at BBVA.",
      "Reduced incident response times at BBVA to under one hour (minutes for internal cases), minimizing operational impact.",
      "Designing a scalable CI/CD framework and an automated documentation engine for Data Chomps.",
      "Leveraging AI tools at Data Chomps to reduce coding time by 50% while improving documentation quality."
    ],

    companyHighlight: {
      name: "DATA CHOMPS [VISION]",
      role: "Lead Architect & Founder",
      mission: "Data Chomps was born as a foundation to develop ideas that truly help people. My mission is to bridge the gap between imagination and execution, helping to materialize projects so they don't get stuck as just 'ideas'. I am currently looking to support others in this process and, along the way, connect with passionate people who want to develop, collaborate, and bring impactful projects to life.",
      website: "datachomps.tech"
    },
    experience: [
      {
        year: "Apr 2024 - Present",
        title: "Software Associate II (OPS Team)",
        company: "BBVA",
        desc: "Part of the Operations team dedicated to CIB. I provide support for critical applications, focusing on incident resolution, system stability, and managing vulnerabilities or obsolescence. I manage communication and coordination with internal and external teams—at a global scale—to ensure operational continuity under strict financial SLAs."
      },
      {
        year: "Sept 2022 - Apr 2024",
        title: "Systems Analyst (Developer)",
        company: "Inbursa",
        desc: "Developer for Insurance and Corporate Banking projects. I managed the full lifecycle: requirement analysis, database modeling, and development of microservices, monoliths, and ETL processes. I concluded my tenure by leading the technical migration project from SOAP web services to REST microservices."
      }
    ],
    academicExperience: [
      {
        year: "2018 - 2022",
        title: "Computer Engineering",
        company: "ESIME Culhuacán",
        desc: "Solid technical foundation in systems engineering, focused on practical architecture and team leadership for complex computational projects."
      }
    ],
    technicalSkills: {
      backend: [
        { name: "JAVA (MICROSERVICES / JEE)", level: 95, experience: "Advanced command of microservices and JEE enterprise applications. Capable of navigating thousands of lines of legacy code to implement new, well-structured features and resolve complex architectural incidents." },
        { name: "PYTHON (DATA & AI)", level: 92, experience: "Scripts for document analysis and transformation to generate metrics. Implementing automations for repetitive OS tasks and automated documentation from PRs/commits." },
        { name: "OS & SHELL", level: 90, experience: "Hosting environment configuration (Unix, Linux, Windows). Expert in incident diagnosis, communication analysis, and shell scripting for process automation." }
      ],
      data: [
        { name: "ORACLE / SYBASE / MYSQL", level: 92, experience: "Advanced management of relational databases, including Stored Procedures (SPs), modeling, and performance analysis. Experienced in high-concurrency environments." },
        { name: "NOSQL / ASP / C", level: 85, experience: "Knowledge of MongoDB and Firebase. Intermediate proficiency in ASP and C for legacy maintenance." }
      ]
    },
    education: [
      { degree: "B.S. Computer Engineering", school: "ESIME Culhuacán, IPN", year: "2022" }
    ],
    certs: [
      { name: "Anti-Money Laundering (ABM)", url: "https://drive.google.com/file/d/1L_gIf5hiZQpkp3YeJd69mfS7g1HzWIjZ/view?usp=sharing" },
      { name: "SCRUM Fundamentals", url: "/pdfs/scrum_fundamentals.pdf" },
      { name: "OOP Master (Carso)", url: "/pdfs/oop_master.pdf" },
      { name: "Generative AI for Software Dev", url: "https://cert.link/gen-ai-url" }, // También funcionan links externos
      { name: "IT Security & Vulnerability Mgmt", url: null } // Este no tendrá link por ahora
    ],
    contactLabels: {
      email: "erik563399@gmail.com",
      location: "CDMX, México"
    },
    gameLabels: {
      init: "START SYSTEM",
      score: "STABILIZED",
      highScore: "MAX_EFFICIENCY",
      stability: "CORE_STABILITY",
      breach: "OVERFLOW_DETECTED",
      restart: "HOT_SWAP_CORE",
      desc: "Architecting solid data structures. Clear lines to stabilize the environment. Do not let the stack overflow."
    }
  },
  es: {
    role: "SOFTWARE ASSOCIATE II @ BBVA | INGENIERO EN COMPUTACIÓN | FUNDADOR DE DATA CHOMPS",
    metrics: {
      projects: "MÚLTIPLES DESPLIEGUES",
      certs: "5+ ESPECIALIDADES",
      years: "4+ EN TECH"
    },
    sections: {
      about: "IDENTIDAD",
      highlights: "DESTACABLES",
      experience: "TRAYECTORIA PROFESIONAL",
      education: "FORMACIÓN ACADÉMICA",
      projects: "PROYECTOS",
      contact: "CONTACTO",
      skills: "NÚCLEO TÉCNICO",
      company: "DATA CHOMPS",
      labs: "LABORATORIO // NODO_EXPERIMENTAL"
    },
    aboutText: "Ingeniero en Computación con experiencia especializada en Seguros, Banca Empresarial y CIB (Corporate & Investment Banking). Mi enfoque es el análisis inteligente: no solo resuelvo problemas, sino que entiendo los sistemas para implementar mejoras y resolver incidentes críticos bajo SLAs estrictos y coordinación multidisciplinaria.",
    personalBio: "Me apasiona la tecnología y enfrentar nuevos retos. Disfruto colaborar para hacer realidad ideas, aprender constantemente y ayudar a otros a crecer. Mi objetivo es materializar proyectos que resuelvan problemas reales, traduciendo mi experiencia en desarrollo y soporte en herramientas que realmente ayuden a las personas y al crecimiento colectivo.",

    highlights: [
      "Lideré en Inbursa el mapeo estratégico y la priorización de una migración de sistemas durante 5 meses.",
      "Entregué en Inbursa desarrollos urgentes de ciclo completo en menos de 2 semanas, cumpliendo con plazos críticos.",
      "Reactivé y finalicé con éxito en Inbursa un proyecto de eliminación de DBLinks que estaba estancado, completándolo en 2 meses.",
      "Optimicé un proceso ETL crítico en Inbursa, reduciendo su tiempo de ejecución de 2 horas a solo 10 minutos.",
      "Resolví permanentemente 3 incidentes críticos recurrentes y solventé vulnerabilidades en 4 aplicativos core en BBVA.",
      "Reduje en BBVA los tiempos de respuesta a incidentes a menos de una hora (minutos para casos internos) optimizando la coordinación operativa.",
      "Arquitectando un framework de CI/CD escalable y un motor de documentación automática para Data Chomps.",
      "Uso de IA en Data Chomps para reducir tiempos de codificación al 50% y elevar la calidad de la documentación técnica."
    ],

    companyHighlight: {
      name: "DATA CHOMPS [VISIÓN]",
      role: "Arquitecto Líder y Fundador",
      mission: "Data Chomps nace como una base para la creación y desarrollo de ideas que ayuden realmente a las personas. Mi misión es cerrar la brecha entre la imaginación y la ejecución, ayudando a materializar proyectos para que no se queden estancados solo como 'ideas'. Actualmente busco apoyar a otros en este proceso y, en el camino, conectar con personas apasionadas que quieran desarrollar, colaborar y dar vida a proyectos con impacto real.",
      website: "datachomps.tech"
    },
    experience: [
      {
        year: "Abr 2024 - Presente",
        title: "Software Associate II (Equipo OPS)",
        company: "BBVA",
        desc: "Integrante del equipo de Operaciones dedicado a CIB. Brindo soporte de alto nivel a aplicaciones críticas para el negocio, enfocándome en el análisis inteligente para la resolución de incidentes y estabilidad del sistema. Gestiono la comunicación con equipos internos, externos y globales para garantizar la continuidad operativa bajo SLAs financieros estrictos."
      },
      {
        year: "Sept 2022 - Abr 2024",
        title: "Analista de Sistemas (Desarrollador)",
        company: "Inbursa",
        desc: "Desarrollador para proyectos de Seguros y Banca Empresarial. Gestioné el ciclo de vida completo: análisis de requerimientos, modelado de bases de datos y desarrollo de microservicios, monolitos y procesos ETL. Finalicé mi gestión liderando el proyecto de migración técnica de servicios web SOAP a microservicios REST."
      }
    ],
    academicExperience: [
      {
        year: "2018 - 2022",
        title: "Ingeniería en Computación",
        company: "ESIME Culhuacán",
        desc: "Sólida base técnica en ingeniería de sistemas, enfocada en arquitectura práctica y liderazgo de equipos en proyectos computacionales complejos."
      }
    ],
    technicalSkills: {
      backend: [
        { name: "JAVA (MICROSERVICIOS / JEE)", level: 95, experience: "Especialista en microservicios y aplicaciones JEE. Alta capacidad para navegar en código legacy complejo y diseñar nuevas aplicaciones con mejor estructura. Enfoque analítico para implementaciones y resolución de incidentes." },
        { name: "PYTHON (DATOS & IA)", level: 92, experience: "Scripts para análisis y transformación de documentos para obtención de métricas operativas. Automatizaciones de tareas de sistema y documentación automática desde PRs/commits." },
        { name: "SO & SHELL", level: 90, experience: "Configuración de entornos (Unix, Linux, Windows). Diagnóstico de incidentes, análisis de comunicaciones y scripting en Shell para automatización y análisis de procesos." }
      ],
      data: [
        { name: "ORACLE / SYBASE / MYSQL", level: 92, experience: "Gestión avanzada de bases de datos relacionales, incluyendo Stored Procedures (SPs) y análisis de rendimiento. Creación y modelado de bases de datos (Oracle)." },
        { name: "NOSQL / ASP / C", level: 85, experience: "Conocimientos en MongoDB y Firebase. Dominio intermedio de ASP y C para mantenimiento de sistemas legacy." }
      ]
    },
    education: [
      { degree: "Ingeniería en Computación", school: "ESIME Culhuacán, IPN", year: "2022" }
    ],
    certs: [
      "Prevención de Lavado de Dinero (ABM)",
      "SCRUM Fundamentals",
      "POO Máster (Carso)",
      "IA Generativa para Devs",
      "Seguridad TI y Gestión de Vulnerabilidades"
    ],
    contactLabels: {
      email: "erik563399@gmail.com",
      location: "CDMX, México"
    },
    gameLabels: {
      init: "INICIALIZAR SISTEMA",
      score: "DATOS_ESTABILIZADOS",
      highScore: "EFICIENCIA_MÁXIMA",
      stability: "ESTABILIDAD_NÚCLEO",
      breach: "DESBORDAMIENTO_DETECTADO",
      restart: "CAMBIO_CALIENTE_NÚCLEO",
      desc: "Arquitectando estructuras de datos sólidas. Limpia líneas para mantener el entorno estable. No dejes que el stack se desborde."
    }
  }
};