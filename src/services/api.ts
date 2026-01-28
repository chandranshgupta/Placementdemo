import axios from 'axios';

// Environment variable for API URL, defaulting to usage of mock data if not present
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MOCK_MODE = !API_URL; // Default to true if no URL provided

// Types
export interface CampusLocation {
    id: string;
    name: string;
    url: string;
    coordinates: { x: number; y: number }; // Percentage 0-100 relative to map container
    isHero?: boolean;
}

// 2048x2048 Aspect Ratio (Square)
// The map is roughly centered in the square, but India is taller than wide.
// It occupies roughly X: 20-80%, Y: 10-90%.
const MOCK_CAMPUS_LOCATIONS: CampusLocation[] = [
    { id: 'gandhinagar', name: 'Gandhinagar', url: 'https://www.nfsu.ac.in/', coordinates: { x: 15, y: 48 } }, // Gujarat
    { id: 'delhi', name: 'Delhi', url: 'https://delhi.nfsu.ac.in/', coordinates: { x: 33, y: 29 } }, // North
    { id: 'goa', name: 'Goa', url: 'https://goa.nfsu.ac.in/', coordinates: { x: 23, y: 68 } }, // West Coast (Approx)
    { id: 'tripura', name: 'Tripura', url: 'https://tripura.nfsu.ac.in/', coordinates: { x: 84, y: 40 } }, // Far East
    { id: 'bhopal', name: 'Bhopal', url: 'https://bhopal.nfsu.ac.in/', coordinates: { x: 33, y: 48 } }, // Center
    { id: 'pune', name: 'Pune', url: 'https://pune.nfsu.ac.in/', coordinates: { x: 25, y: 57 } }, // MH (Calc: 40.5, 57)
    { id: 'guwahati', name: 'Guwahati', url: 'https://guwahati.nfsu.ac.in/', coordinates: { x: 81, y: 38 } }, // Assam
    { id: 'manipur', name: 'Manipur', url: 'https://manipur.nfsu.ac.in/', coordinates: { x: 78, y: 44 } }, // NE
    { id: 'dharwad', name: 'Dharwad', url: 'https://dharwad.nfsu.ac.in/', coordinates: { x: 28, y: 66 }, isHero: true }, // Karnataka (Hero)
    { id: 'chennai', name: 'Chennai', url: 'https://chennai.nfsu.ac.in/', coordinates: { x: 37, y: 75 } }, // TN
    { id: 'nagpur', name: 'Nagpur', url: 'https://nagpur.nfsu.ac.in/', coordinates: { x: 35, y: 53 } }, // Central-East MH
    { id: 'raipur', name: 'Raipur', url: 'https://raipur.nfsu.ac.in/', coordinates: { x: 40, y: 50 } }, // Chhattisgarh
    { id: 'jaipur', name: 'Jaipur', url: 'https://jaipur.nfsu.ac.in/', coordinates: { x: 27, y: 35 } }, // Rajasthan
];

// API Service
const api = {
    getCampusLocations: async (): Promise<CampusLocation[]> => {
        if (MOCK_MODE) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return MOCK_CAMPUS_LOCATIONS;
        }
        return [];
    },

    getJobs: async () => {
        if (MOCK_MODE) {
            return [{ id: 1, title: 'Cyber Analyst', company: 'NFSU Cell' }];
        }
        return [];
    },

    loginUser: async (credentials: { id: string; pass: string }) => {
        // SIMULATED API CALL
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.id === "admin" && credentials.pass === "admin") {
                    resolve({
                        success: true,
                        token: "mock-admin-token-12345",
                        user: { name: "Administrator", role: "admin" }
                    });
                } else if (credentials.id === "s1" && credentials.pass === "pass") {
                    resolve({
                        success: true,
                        token: "mock-student-token-67890",
                        user: { name: "Student One", role: "student" }
                    });
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 1000); // 1s delay
        });
    },

    forgotPassword: async (id: string) => {
        console.log("Forgot password for:", id);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock database check
                const validIds = ["admin", "s1"];
                if (validIds.includes(id)) {
                    resolve({
                        success: true,
                        message: `Recovery email sent to registered email for ${id}.`
                    });
                } else {
                    reject(new Error("ID not found in our records."));
                }
            }, 1500);
        });
    },

    registerCompany: async (data: { name: string; org: string; email: string }) => {
        console.log("Registering company:", data);
        if (MOCK_MODE) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
            return { success: true, message: "Registration successful. We will contact you soon." };
        }
        // Real API call would go here
        // return axios.post(`${API_URL}/register`, data);
        console.log("Registering company:", data);
        return { success: false, message: "API not connected" };
    }
};

// Achievements Data
export const achievements = [
    {
        id: 1,
        image: "/a1.png",
        name: "M. Jonah Paulin Joyce",
        description: "Won the 1st Prize in Parsec 2.0 2026 Hackathon Individually",
        link: "#"
    },
    {
        id: 2,
        image: "/a2.png",
        name: "Team Prime Factors",
        description: "Received Runner-up Prize in Code Bharat IIIT Dharwad Hackathon",
        link: "https://www.linkedin.com/posts/suraj-bhadauria-0760a81a6_hackathon-civictech-smartcities-activity-7399498147321823232-NHL5"
    },
    {
        id: 3,
        image: "/a3.png",
        name: "Suraj & Team",
        description: "Developed a Deepfake Detection Model in CIDECODE 2025 Hackathon",
        link: "https://www.linkedin.com/posts/suraj-bhadauria-0760a81a6_i-recently-participated-in-cidecode-2025-activity-7311081366282981376-HzVy"
    },
    {
        id: 4,
        image: "/a4.png",
        name: "Chandransh Gupta",
        description: "Finalist at Google Cloud Agentic AI Hackathon 2025, Bangalore",
        link: "https://www.linkedin.com/posts/chandransh-gupta_googlecloud-agenticai-hackathon-activity-7361416417335762946-bdCx"
    }
];
// Recruiters Data
export const recruiters = [
    { id: 1, name: "Axis Bank", logo: "/c1.svg" },
    { id: 2, name: "Adobe", logo: "/c2.svg" },
    { id: 3, name: "Deutsche Bank", logo: "/c3.svg" },
    { id: 4, name: "SOPHOS", logo: "/c4.svg" },
    { id: 5, name: "ABB", logo: "/c5.svg" }
];

// Faculty Data
export const facultyTeam = [
    {
        id: 1,
        name: "Shrikant Shirakol",
        title: "Assistant Professor, NFSU",
        image: "/p1.png",
        link: "https://nfsu.ac.in/Faculty/profile?userid=667"
    },
    {
        id: 2,
        name: "Avinash Pandey",
        title: "Associate Professor & Dean, NFSU",
        image: "/p2.png",
        link: "https://nfsu.ac.in/Faculty/profile?userid=605"
    }
];

export const footerLinks = {
    academics: [
        { name: "Academic Calendar", link: "https://beta.nfsu.ac.in/Uploads/Academic%20Calender%202022%20-%202023.pdf" },
        { name: "Research Projects", link: "https://nfsu.ac.in/researchproject" },
        { name: "Results", link: "https://nfsu.ac.in/results" }
    ],
    campusLife: [
        { name: "Internal Complaints Committee", link: "https://nfsu.ac.in/icc" },
        { name: "Research Centers", link: "https://nfsu.ac.in/reserchcentre" },
        { name: "Tenders", link: "https://nfsu.ac.in/tenders" },
        { name: "Campus Director", link: "https://nfsu.ac.in/campusdirectors" },
        { name: "Awards & Recognitions", link: "https://nfsu.ac.in/awards_recognitions" },
        { name: "Downloads", link: "https://nfsu.ac.in/downloads" },
        { name: "Policies", link: "https://nfsu.ac.in/policy" }
    ],
    requests: [
        { name: "Visiting Request", link: "https://nfsu.ac.in/visitingreq" },
        { name: "International Guest House", link: "https://nfsu.ac.in/details/54" }
    ],
    quickLinks: [
        { name: "Career@NFSU", link: "https://nfsu.ac.in/career" },
        { name: "Tender", link: "https://nfsu.ac.in/tenders" },
        { name: "RTI", link: "https://nfsu.ac.in/SpecialCellCommittee/rti" }
    ]
};

export const faqs = [
    { q: "Can I apply in multiple programs?", a: "Yes. You can Apply in multiple programs based on your eligibility." },
    { q: "What is the procedure for seeking admission to Postgraduate (PG) Program(s) in NFSU?", a: "Applicant must apply online through the portal (https://nfsuadm.samarth.edu.in/). Modes include: (1) NFAT Entrance Exam, (2) Merit based, (3) JEE-2025 (Cyber Security B.Tech-M.Tech), (4) GATE-2025 (M.Tech Cyber Security/AI), (5) CLAT (Law), (6) CAT-2024 (MBA)." },
    { q: "Is there a separate entrance exam to take admission in a Postgraduate (PG) Program(s) of NFSU?", a: "Yes. NFSU conducts National Forensic Admission Test (NFAT). Details are in the Information bulletin." },
    { q: "Can we quit the course after 3 years from BSc Program?", a: "Yes. You can take the exit after completion of the three years of B.Sc. as per the NEP guidelines." },
    { q: "Will the B.Sc. entrance exam syllabus include topics from both 11th and 12th grades?", a: "Question paper will include all the topics mentioned in the syllabus. Check the NFAT-2025 syllabus in the information bulletin." },
    { q: "Is there an option of offline submission of Application Forms?", a: "No. It is mandatory to apply online at https://nfsufsradm.samarth.edu.in/. Offline submissions will not be accepted." },
    { q: "Can we take the NFAT-2025 exam in any language?", a: "No. NFAT-2025 will be conducted in English language only." },
    { q: "Will math students be required to answer biology questions (or vice-versa) in the B.Sc. exam?", a: "The question paper will include all topics mentioned in the syllabus. Please check the NFAT-2025 syllabus in the information bulletin." },
    { q: "Can we get previous year question papers?", a: "No. Previous year question papers are not available with NFSU." },
    { q: "Does the university provide placement opportunities?", a: "Yes. NFSU has a very active placement cell which provides guidance and arranges placement drives for all programs." },
    { q: "Can I make changes to my name/DOB in the application form after submitting?", a: "No changes will be allowed once the profile on the admission portal is locked by the candidate." },
    { q: "Can we change the campus later?", a: "No. NFSU has no policy to transfer the campus. Once the admission process is over, no transfer is possible." },
    { q: "Is there any hostel facility in all campuses?", a: "Applicants are advised to visit the webpage of each specific campus for information on hostel facilities." },
    { q: "Can I apply if I don't have my 12th class marksheet yet?", a: "Yes, you can apply for Bachelor's programs. However, for all PG programs, the 12th Standard marksheet is mandatory." },
    { q: "Is Migration Certificate mandatory to apply?", a: "No. It is not mandatory for the online application, but you may be asked to submit it once admission is secured." },
    { q: "Does the university provide admission under the sports quota?", a: "No. NFSU does not have a sports quota." },
    { q: "Are there any scholarships provided by NFSU?", a: "No. NFSU does not provide internal scholarships. Candidates may apply for scholarships via the National Scholarship Portal." },
    { q: "What is the admission cancellation process?", a: "Detailed process for admission cancellation is available on the Admission page of the NFSU website." },
    { q: "I am in the final year of my graduate program, can I still apply?", a: "Yes." },
    { q: "How many programs can I apply for?", a: "As many as you are eligible to apply for." },
    { q: "Do I need to pay application fees each time I choose a different program?", a: "Yes. You need to pay the application fee for each program." },
    { q: "What is the age limit for application?", a: "No age limit is prescribed for any program." },
    { q: "Is the university accredited?", a: "NFSU is a Central University and an Institution of National Importance under the Ministry of Home Affairs, Govt. of India." },
    { q: "How do I contact for admission queries?", a: "Please explore the FAQs. If unresolved, email the respective school (list available on the admission portal)." },
    { q: "Do I need to appear in NFAT Ph.D. Entrance if I qualified UGC-NET?", a: "No. Candidates qualified for UGC-NET for 'Admission to Ph.D.' are exempted from the entrance test but must complete other formalities." }
];

export const contactInfo = {
    address: "National Forensic Sciences University, Gandhinagar-382007, Gujarat-India.",
    email: "info@nfsu.ac.in",
    phones: ["(079) 239 77103", "(079) 239 77105"]
};

export const brochureLink = "https://beta.nfsu.ac.in/Uploads/Brochure/NFSU%20Dharwad_Brochure.pdf";

export default api;
