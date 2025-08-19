# data.py

portfolio_data = {
    "personal": {
        "name": "Ishaan Markanday",
        "phone": "+61 426 546 532",
        "email": "markandayishaan@gmail.com",
        "photo_url": "image_ee6fd4.jpg", # Using your provided image. Ensure this file is in the same folder.
        "summary": "Highly motivated Master's student in Cybersecurity (Professional) at Deakin University with a solid foundation in networking, Linux, cloud security, and database management. Demonstrated hands-on technical experience through professional training at KPIT Technologies and multiple project engagements. Strong analytical, teamwork, and communication skills with a proven record of client handling and documentation. Seeking part-time opportunities in technology, customer service, retail, or hospitality while pursuing studies. Quick to adapt in fast-paced environments with a commitment to delivering value in every role undertaken.",
        "about_intro": "I am a highly motivated Master's student in Cybersecurity from Geelong, VIC. I have a solid foundation in networking, Linux, cloud security, and database management. My professional training at KPIT Technologies has given me hands-on technical experience with multiple project engagements. I have strong analytical, teamwork, and communication skills, with a proven record of client handling and documentation."
    },
    "skills": {
        "technical": [
            {"name": "Python", "level": 90},
            {"name": "MySQL", "level": 85},
            {"name": "PostgreSQL", "level": 80},
            {"name": "REST API", "level": 75},
            {"name": "AWS", "level": 70},
            {"name": "Docker", "level": 65},
            {"name": "Linux (Red Hat)", "level": 85},
            {"name": "Risk Analysis", "level": 78},
            {"name": "Networking", "level": 82},
            {"name": "VLAN Configuration", "level": 70},
            {"name": "Data Analysis", "level": 75},
            {"name": "Database Management", "level": 80},
            {"name": "Cybersecurity Fundamentals", "level": 92},
            {"name": "ECU Configuration", "level": 60}
        ],
        "soft": [
            {"name": "Customer Handling", "level": 85},
            {"name": "Cash Management", "level": 70},
            {"name": "POS Systems", "level": 75},
            {"name": "Communication", "level": 90},
            {"name": "Hospitality", "level": 80},
            {"name": "Team Collaboration", "level": 92},
            {"name": "Problem Solving", "level": 95},
            {"name": "Adaptability", "level": 88},
            {"name": "Time Management", "level": 85},
            {"name": "Professional Conduct", "level": 90}
        ]
    },
    "experience": [
        {
            "title": "Trainee - KPIT Technologies (India)",
            "duration": "July 2024 - April 2025",
            "bullets": [
                "Collaborated with global cross-functional teams to deliver cybersecurity and system integration solutions.",
                "Managed project databases (SQL/NoSQL) and technical documentation.",
                "Used Docker to create test environments across Linux and Windows systems.",
                "Supported client teams in Germany and Japan with timely and accurate deployments."
            ]
        },
        {
            "title": "Intern - KPIT Technologies",
            "duration": "January 2024 - July 2024",
            "bullets": [
                "Followed structured technical processes and standard operating procedures.",
                "Maintained accurate logs and configuration documentation.",
                "Demonstrated professional behaviour, punctuality, and adaptability in fast-paced work environments."
            ]
        }
    ],
    "certifications": [
        {
            "title": "AWS Cloud Security Foundations",
            "issuer": None,
            "link": "[Link to certificate]"
        },
        {
            "title": "Cybersecurity & Risk Management",
            "issuer": "UC Irvine (Coursera)",
            "link": "[Link to certificate]"
        },
        {
            "title": "Personnel & Third-Party Security",
            "issuer": "UC Irvine (Coursera)",
            "link": "[Link to certificate]"
        },
        {
            "title": "Software Defined Networking",
            "issuer": "University of Chicago (Coursera)",
            "link": "[Link to certificate]"
        },
        {
            "title": "Security Governance and Compliance",
            "issuer": "UC Irvine (Coursera)",
            "link": "[Link to certificate]"
        },
        {
            "title": "Introduction to Risk Management",
            "issuer": "UC Irvine (Coursera)",
            "link": "[Link to certificate]"
        },
        {
            "title": "Fundamentals of Red Hat Enterprise Linux",
            "issuer": "Red Hat",
            "link": "[Link to certificate]"
        },
        {
            "title": "Preparing for CompTIA Security+ Certification",
            "issuer": "Unknown",
            "link": "[Link to certificate]"
        }
    ],
    "achievements": [
        {
            "title": "High CSAT Contribution - Gen3 Hands-off E/E Network Architecture Validation",
            "description": "Contributed to achieving a high CSAT (Customer Satisfaction) score of '5' for the 'Gen3 Hands-off E/E Network Architecture Validation' project at KPIT Technologies.",
            "date": "July 2024 - September 2024",
            "link": "https://github.com/ishaan-markanday/High-CSAT-KPIT/blob/main/Csat.jpg" # REMINDER: Replace with the actual GitHub link to your certificate/proof
        },
        {
            "title": "Dean's List Award",
            "description": "Recognized for outstanding academic performance during the 2023-2024 academic year.",
            "date": "May 2024",
            "link": "YOUR_ACHIEVEMENT_LINK_HERE" # Replace with actual link to certificate/proof
        },
        {
            "title": "Capture The Flag Competition Winner",
            "description": "Led a team to victory in a university-wide cybersecurity Capture The Flag (CTF) event.",
            "date": "November 2023",
            "link": "YOUR_ACHIEVEMENT_LINK_HERE" # Replace with actual link
        }
    ],
    "projects": [
        {
            "title": "Portfolio Website",
            "description": "A personal portfolio site showcasing my skills and projects.",
            "details_link": "project-details.html?id=project1"
        },
        {
            "title": "Scikit-learn with the Wine Dataset: A Comprehensive ML Workflow",
            "description": "Explored and implemented a machine learning workflow using Google Colab on the Wine dataset. This project covered key steps including data preprocessing (standardization), splitting data into training and test sets, performing Exploratory Data Analysis (EDA) including checking for missing values and visualizing feature correlation. It then demonstrated training and evaluating four classification models: Logistic Regression, K-Nearest Neighbors (KNN), Decision Tree, and Support Vector Machine (SVM), and concluded with 5-Fold Cross-Validation for robust performance assessment.",
            "details_link": "https://github.com/ishaan-markanday/Wine-ML-Analysis/blob/main/3_1P.ipynb" # REMINDER: Replace this with your actual GitHub link
        },
        {
            "title": "Cybersecurity Attack Data Analysis & Visualization",
            "description": "Performed an in-depth exploratory data analysis (EDA) of a cybersecurity attack dataset in Google Colab. This project involved importing and cleaning network traffic data, handling missing values, and analyzing patterns related to attack types (DDoS, Intrusion, Malware) and their distribution over time. Key insights were derived from monthly attack trends, packet length distribution, and variability, utilizing data visualization techniques to present findings effectively.",
            "details_link": "https://github.com/ishaan-markanday/cyber-attack-eda/blob/main/5_1C.ipynb" # REMINDER: Replace this with your actual GitHub link
        }
    ]
}
