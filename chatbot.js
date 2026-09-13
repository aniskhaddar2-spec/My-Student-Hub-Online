// ==========================================
// COLLEGE BI ASSISTANT - STANDALONE VERSION
// No Flask / No Python backend required
// ==========================================


// ==========================================
// CHAT ELEMENTS
// ==========================================

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");


// ==========================================
// COLLEGE INFORMATION
// ==========================================

const collegeInfo = {

    collegeName: "International College of Business and Technology",

    academicYear: {
        start: "The academic year starts in October.",
        end: "The academic year ends in June."
    },

    library: {
        location: "The college library is located on the second floor.",
        hours: "The library is open from 8:00 to 18:00.",
        services: "The library provides books, study spaces, research materials and computer access."
    },

    administration: {
        location: "The administration office is located on the first floor.",
        hours: "The administration office is open from 8:00 to 16:00."
    },

    cafeteria: {
        location: "The cafeteria is located on the ground floor.",
        hours: "The cafeteria is open from 8:00 to 17:00."
    },

    computerLab: {
        location: "The main computer laboratory is located on the second floor.",
        equipment: "The computer laboratory contains computers and internet access."
    },

    auditorium: {
        location: "The main auditorium is located on the ground floor."
    }

};


// ==========================================
// DEPARTMENTS
// ==========================================

const departments = {

    businessIntelligence: {
        name: "Business Intelligence",
        location: "Building A, second floor",
        description:
            "The Business Intelligence department focuses on data analysis, databases, reporting and decision-making."
    },

    computerScience: {
        name: "Computer Science",
        location: "Building A, second floor",
        description:
            "The Computer Science department focuses on programming, software and computer systems."
    },

    mathematics: {
        name: "Mathematics",
        location: "Building B, first floor",
        description:
            "The Mathematics department focuses on mathematics, statistics and quantitative methods."
    },

    languages: {
        name: "Languages",
        location: "Building B, second floor",
        description:
            "The Languages department provides English and communication courses."
    },

    management: {
        name: "Management",
        location: "Building B, first floor",
        description:
            "The Management department focuses on business, management and organizational studies."
    }

};


// ==========================================
// TEACHERS
// ==========================================

const teachers = {

    ahmed: {
        fullName: "Mr. Ahmed",
        department: "Mathematics",
        subjects: ["Mathematics"],
        office: "Room B101"
    },

    anis: {
        fullName: "Mr. Anis",
        department: "Languages",
        subjects: ["English", "Business Communication"],
        office: "Room B205"
    },

    sami: {
        fullName: "Dr. Sami",
        department: "Business Intelligence",
        subjects: ["Python", "Data Analysis"],
        office: "Room A201"
    },

    sara: {
        fullName: "Dr. Sara",
        department: "Business Intelligence",
        subjects: ["Statistics", "Data Visualization"],
        office: "Room A202"
    },

    karim: {
        fullName: "Mr. Karim",
        department: "Business Intelligence",
        subjects: ["SQL", "Database Systems"],
        office: "Room A203"
    },

    nadia: {
        fullName: "Mrs. Nadia",
        department: "Business Intelligence",
        subjects: ["Power BI", "Business Intelligence"],
        office: "Room A204"
    },

    youssef: {
        fullName: "Mr. Youssef",
        department: "Computer Science",
        subjects: ["Programming", "Computer Science"],
        office: "Room A105"
    }

};


// ==========================================
// COURSES
// ==========================================

const courses = {

    python: {
        name: "Python Programming",
        department: "Business Intelligence",
        teacher: "Dr. Sami",
        room: "Computer Lab 1",
        hoursPerWeek: 4,
        students: 45
    },

    sql: {
        name: "SQL and Database Querying",
        department: "Business Intelligence",
        teacher: "Mr. Karim",
        room: "Computer Lab 2",
        hoursPerWeek: 3,
        students: 38
    },

    statistics: {
        name: "Statistics",
        department: "Business Intelligence",
        teacher: "Dr. Sara",
        room: "Room A202",
        hoursPerWeek: 4,
        students: 42
    },

    power_bi: {
        name: "Power BI",
        department: "Business Intelligence",
        teacher: "Mrs. Nadia",
        room: "Computer Lab 1",
        hoursPerWeek: 3,
        students: 40
    },

    data_visualization: {
        name: "Data Visualization",
        department: "Business Intelligence",
        teacher: "Dr. Sara",
        room: "Room A202",
        hoursPerWeek: 3,
        students: 35
    },

    data_analysis: {
        name: "Data Analysis",
        department: "Business Intelligence",
        teacher: "Dr. Sami",
        room: "Computer Lab 1",
        hoursPerWeek: 4,
        students: 44
    },

    database_systems: {
        name: "Database Systems",
        department: "Computer Science",
        teacher: "Mr. Karim",
        room: "Computer Lab 2",
        hoursPerWeek: 4,
        students: 50
    },

    programming: {
        name: "Programming",
        department: "Computer Science",
        teacher: "Mr. Youssef",
        room: "Computer Lab 3",
        hoursPerWeek: 4,
        students: 48
    },

    mathematics: {
        name: "Mathematics",
        department: "Mathematics",
        teacher: "Mr. Ahmed",
        room: "Room B101",
        hoursPerWeek: 4,
        students: 55
    },

    english: {
        name: "English",
        department: "Languages",
        teacher: "Mr. Anis",
        room: "Room B205",
        hoursPerWeek: 3,
        students: 60
    },

    business_communication: {
        name: "Business Communication",
        department: "Languages",
        teacher: "Mr. Anis",
        room: "Room B205",
        hoursPerWeek: 2,
        students: 37
    }

};


// ==========================================
// SCHEDULES
// ==========================================

const schedules = {

    python: "Monday and Wednesday from 10:00 to 12:00.",

    sql: "Tuesday from 10:00 to 13:00.",

    statistics: "Monday and Thursday from 08:00 to 10:00.",

    power_bi: "Wednesday from 13:00 to 16:00.",

    data_visualization: "Thursday from 10:00 to 13:00.",

    data_analysis: "Tuesday and Friday from 08:00 to 10:00.",

    database_systems: "Monday from 13:00 to 17:00.",

    programming: "Wednesday and Friday from 10:00 to 12:00.",

    mathematics: "Monday and Wednesday from 10:30 to 12:00.",

    english: "Tuesday and Thursday from 13:00 to 14:30.",

    business_communication: "Friday from 13:00 to 15:00."

};


// ==========================================
// STUDENT SERVICES
// ==========================================

const studentServices = {

    registration:
        "Student registration is handled by the administration office on the first floor.",

    exams:
        "Exam information is published by the administration and displayed on the student notice board.",

    studentAffairs:
        "The Student Affairs office helps students with administrative and academic questions.",

    scholarships:
        "Scholarship information is available from the administration office.",

    academicAdvising:
        "Students can contact their department for academic advising."

};


// ==========================================
// CLEAN TEXT
// ==========================================

function cleanText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


// ==========================================
// CHECK KEYWORD
// ==========================================

function keywordFound(message, keyword) {

    const escapedKeyword = keyword
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const pattern = new RegExp(
        "\\b" + escapedKeyword + "\\b"
    );

    return pattern.test(message);

}


// ==========================================
// FIND COURSE
// ==========================================

function findCourse(message) {

    // Exact course ID or full course name
    for (const [courseId, course] of Object.entries(courses)) {

        if (keywordFound(message, courseId)) {
            return courseId;
        }

        if (keywordFound(message, course.name.toLowerCase())) {
            return courseId;
        }

    }


    // Course aliases
    const aliases = {

        python: [
            "python",
            "pandas",
            "numpy"
        ],

        sql: [
            "sql",
            "database query",
            "queries",
            "query"
        ],

        statistics: [
            "statistics",
            "statistic",
            "stats"
        ],

        power_bi: [
            "power bi",
            "powerbi"
        ],

        data_visualization: [
            "data visualization",
            "visualization",
            "charts",
            "graphs"
        ],

        data_analysis: [
            "data analysis",
            "analytics",
            "analysis"
        ],

        programming: [
            "programming",
            "coding",
            "code"
        ],

        mathematics: [
            "math",
            "mathematics",
            "algebra",
            "geometry",
            "calculus"
        ],

        english: [
            "english"
        ]

    };


    for (const [courseId, keywords] of Object.entries(aliases)) {

        for (const keyword of keywords) {

            if (keywordFound(message, keyword)) {
                return courseId;
            }

        }

    }

    return null;

}


// ==========================================
// FIND TEACHER
// ==========================================

function findTeacher(message) {

    for (const [teacherId, teacher] of Object.entries(teachers)) {

        if (keywordFound(message, teacherId)) {
            return teacher;
        }

        if (keywordFound(message, teacher.fullName.toLowerCase())) {
            return teacher;
        }

    }

    return null;

}


// ==========================================
// FIND INTENT
// ==========================================

function findIntent(message) {

    const scores = {

        teacher: 0,
        location: 0,
        schedule: 0,
        students: 0,
        hours: 0,
        department: 0,
        available_courses: 0,
        information: 0

    };


    const intentKeywords = {

        teacher: [
            "teacher",
            "professor",
            "prof",
            "instructor",
            "teaches",
            "teach",
            "teaching",
            "who teaches"
        ],

        available_courses: [
            "available courses",
            "what courses",
            "which courses",
            "courses available",
            "courses offered",
            "what courses are offered",
            "what courses do you offer",
            "which courses are offered",
            "list courses",
            "show courses",
            "all courses",
            "available subjects",
            "what subjects",
            "subjects offered"
        ],

        location: [
            "where",
            "location",
            "located",
            "find",
            "room",
            "floor",
            "building"
        ],

        schedule: [
            "when",
            "time",
            "schedule",
            "starts",
            "start",
            "begins",
            "begin",
            "class time"
        ],

        students: [
            "students",
            "student",
            "how many students",
            "enrolled",
            "enrollment"
        ],

        hours: [
            "hours",
            "how many hours",
            "weekly hours",
            "hours per week"
        ],

        department: [
            "department",
            "faculty",
            "section"
        ],

        information: [
            "information",
            "tell me about",
            "what is",
            "what are",
            "details",
            "about"
        ]

    };


    for (const [intent, keywords] of Object.entries(intentKeywords)) {

        for (const keyword of keywords) {

            if (keywordFound(message, keyword)) {

                if (keyword.includes(" ")) {
                    scores[intent] += 5;
                } else {
                    scores[intent] += 3;
                }

            }

        }

    }


    // Strong teacher indicators
    const teacherWords = [
        "teacher",
        "professor",
        "prof",
        "instructor",
        "teaches",
        "teach",
        "teaching"
    ];

    for (const word of teacherWords) {

        if (keywordFound(message, word)) {
            scores.teacher += 5;
        }

    }


    // Strong location indicators
    const locationWords = [
        "where",
        "location",
        "located",
        "room",
        "floor",
        "building"
    ];

    for (const word of locationWords) {

        if (keywordFound(message, word)) {
            scores.location += 2;
        }

    }


    // Strong schedule indicators
    const scheduleWords = [
        "when",
        "schedule",
        "what time",
        "starts",
        "begins"
    ];

    for (const word of scheduleWords) {

        if (keywordFound(message, word)) {
            scores.schedule += 3;
        }

    }


    let bestIntent = null;
    let bestScore = 0;

    for (const [intent, score] of Object.entries(scores)) {

        if (score > bestScore) {

            bestScore = score;
            bestIntent = intent;

        }

    }

    return bestIntent;

}


// ==========================================
// AVAILABLE COURSES
// ==========================================

function availableCoursesResponse() {

    let response = "📚 Available courses:\n\n";

    for (const course of Object.values(courses)) {

        response += `• ${course.name}\n`;

    }

    return response;

}


// ==========================================
// COURSE RESPONSE
// ==========================================

function courseResponse(courseId, intent) {

    const course = courses[courseId];


    if (intent === "teacher") {

        return `${course.name} is taught by ${course.teacher}.`;

    }


    if (intent === "location") {

        return `${course.name} is held in ${course.room}.`;

    }


    if (intent === "schedule") {

        return `${course.name} takes place ${schedules[courseId]}`;

    }


    if (intent === "students") {

        return `${course.name} currently has ${course.students} students.`;

    }


    if (intent === "hours") {

        return `${course.name} has ${course.hoursPerWeek} hours per week.`;

    }


    if (intent === "department") {

        return `${course.name} belongs to the ${course.department} department.`;

    }


    return `${course.name} is part of the ${course.department} department. It is taught by ${course.teacher} in ${course.room}.`;

}


// ==========================================
// ANALYTICAL BI QUESTIONS
// ==========================================

function analyticalResponse(message) {


    // Total students in BI department
    if (
        keywordFound(message, "students in the bi department") ||
        keywordFound(message, "students in business intelligence") ||
        (
            keywordFound(message, "students") &&
            keywordFound(message, "bi department")
        )
    ) {

        const total = Object.values(courses)
            .filter(course =>
                course.department.toLowerCase() === "business intelligence"
            )
            .reduce((sum, course) => sum + course.students, 0);

        return `The Business Intelligence department has ${total} students across its courses.`;

    }


    // Course hours ranking
    if (
        keywordFound(message, "rank courses by hours") ||
        keywordFound(message, "rank the courses by hours") ||
        keywordFound(message, "rank courses by weekly hours") ||
        keywordFound(message, "rank the courses by weekly hours")
    ) {

        const ranking = Object.values(courses)
            .sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);

        let result = "⏱️ Course hours ranking:\n\n";

        ranking.forEach((course, index) => {

            result += `${index + 1}. ${course.name} — ${course.hoursPerWeek} hours/week\n`;

        });

        return result;

    }


    // Course enrollment ranking
    if (
        keywordFound(message, "rank courses") ||
        keywordFound(message, "rank the courses") ||
        keywordFound(message, "ranking of courses") ||
        keywordFound(message, "rank courses by students") ||
        keywordFound(message, "rank the courses by students")
    ) {

        const ranking = Object.values(courses)
            .sort((a, b) => b.students - a.students);

        let result = "📊 Course enrollment ranking:\n\n";

        ranking.forEach((course, index) => {

            result += `${index + 1}. ${course.name} — ${course.students} students\n`;

        });

        return result;

    }


    // Highest enrollment
    if (
        keywordFound(message, "most students") ||
        keywordFound(message, "highest number of students") ||
        keywordFound(message, "most enrolled") ||
        keywordFound(message, "largest class")
    ) {

        const course = Object.values(courses)
            .reduce((max, current) =>
                current.students > max.students ? current : max
            );

        return `The course with the highest enrollment is ${course.name} with ${course.students} students.`;

    }


    // Lowest enrollment
    if (
        keywordFound(message, "fewest students") ||
        keywordFound(message, "lowest number of students") ||
        keywordFound(message, "least students")
    ) {

        const course = Object.values(courses)
            .reduce((min, current) =>
                current.students < min.students ? current : min
            );

        return `The course with the lowest enrollment is ${course.name} with ${course.students} students.`;

    }


    // Total students
    if (
        keywordFound(message, "total students") ||
        keywordFound(message, "total number of students") ||
        keywordFound(message, "students in total") ||
        keywordFound(message, "overall students") ||
        (
            keywordFound(message, "students") &&
            (
                keywordFound(message, "altogether") ||
                keywordFound(message, "overall") ||
                keywordFound(message, "in total")
            )
        )
    ) {

        const total = Object.values(courses)
            .reduce((sum, course) => sum + course.students, 0);

        return `The total enrollment across all courses is ${total} students.`;

    }


    // Average students
    if (
        keywordFound(message, "average students") ||
        keywordFound(message, "average number of students")
    ) {

        const total = Object.values(courses)
            .reduce((sum, course) => sum + course.students, 0);

        const average = total / Object.keys(courses).length;

        return `The average number of students per course is ${average.toFixed(1)}.`;

    }


    // Total weekly hours
    if (
        keywordFound(message, "total hours") ||
        keywordFound(message, "total weekly hours")
    ) {

        const totalHours = Object.values(courses)
            .reduce((sum, course) => sum + course.hoursPerWeek, 0);

        return `The courses have a combined ${totalHours} hours per week.`;

    }


    // Compare two courses
    const compareMatch = message.match(
        /(?:which|what)\s+(?:has|have)\s+more\s+students?,?\s+(.+?)\s+or\s+(.+)/
    );

    if (compareMatch) {

        const firstCourse = findCourse(compareMatch[1].trim());
        const secondCourse = findCourse(compareMatch[2].trim());

        if (firstCourse && secondCourse) {

            const first = courses[firstCourse];
            const second = courses[secondCourse];

            if (first.students > second.students) {

                const difference = first.students - second.students;

                return `${first.name} has more students than ${second.name}: ${first.students} vs ${second.students} students (${difference} more).`;

            }

            if (second.students > first.students) {

                const difference = second.students - first.students;

                return `${second.name} has more students than ${first.name}: ${second.students} vs ${first.students} students (${difference} more).`;

            }

            return `${first.name} and ${second.name} have the same number of students: ${first.students}.`;

        }

        return "I couldn't identify both courses. Please mention two valid courses.";

    }


    // Courses with more students than another course
    const moreThanMatch = message.match(
        /(?:which|what)\s+courses?\s+(?:has|have)\s+more\s+students?\s+than\s+(.+)/
    );

    if (moreThanMatch) {

        const referenceCourse = findCourse(
            moreThanMatch[1].trim()
        );

        if (referenceCourse) {

            const reference = courses[referenceCourse];

            const results = Object.values(courses)
                .filter(course =>
                    course !== reference &&
                    course.students > reference.students
                )
                .map(course => course.name);

            if (results.length) {

                return `Courses with more students than ${reference.name} (${reference.students} students): ${results.join(", ")}.`;

            }

            return `No courses have more students than ${reference.name} (${reference.students} students).`;

        }

        return "I couldn't identify that course. Please mention a valid course.";

    }


    // Courses with fewer students than another course
    const fewerThanMatch = message.match(
        /(?:which|what)\s+courses?\s+(?:has|have)\s+fewer\s+students?\s+than\s+(.+)/
    );

    if (fewerThanMatch) {

        const referenceCourse = findCourse(
            fewerThanMatch[1].trim()
        );

        if (referenceCourse) {

            const reference = courses[referenceCourse];

            const results = Object.values(courses)
                .filter(course =>
                    course !== reference &&
                    course.students < reference.students
                )
                .map(course => course.name);

            if (results.length) {

                return `Courses with fewer students than ${reference.name} (${reference.students} students): ${results.join(", ")}.`;

            }

            return `No courses have fewer students than ${reference.name} (${reference.students} students).`;

        }

        return "I couldn't identify that course. Please mention a valid course.";

    }


    // More than X students AND X hours
    const conditionMatch = message.match(
        /which\s+courses?\s+have\s+more\s+than\s+(\d+)\s+students?\s+and\s+(\d+)\s+hours?\s+(?:per\s+week|weekly)/
    );

    if (conditionMatch) {

        const minimumStudents = Number(conditionMatch[1]);
        const requiredHours = Number(conditionMatch[2]);

        const results = Object.values(courses)
            .filter(course =>
                course.students > minimumStudents &&
                course.hoursPerWeek === requiredHours
            )
            .map(course => course.name);

        if (results.length) {

            return `Courses with more than ${minimumStudents} students and ${requiredHours} hours per week: ${results.join(", ")}.`;

        }

        return `No courses have more than ${minimumStudents} students and ${requiredHours} hours per week.`;

    }


    // At least X students
    const minimumMatch = message.match(
        /(?:which|what)\s+courses?\s+(?:have|has)\s+(?:at\s+least|minimum\s+of)\s+(\d+)\s+students?/
    );

    if (minimumMatch) {

        const minimum = Number(minimumMatch[1]);

        const results = Object.values(courses)
            .filter(course => course.students >= minimum)
            .map(course => course.name);

        if (results.length) {

            return `Courses with at least ${minimum} students: ${results.join(", ")}.`;

        }

        return `No courses have at least ${minimum} students.`;

    }


    // More than X students
    const moreStudentsMatch = message.match(
        /(?:which|what)\s+courses?\s+(?:have|has)\s+more\s+than\s+(\d+)\s+students?/
    );

    if (moreStudentsMatch) {

        const number = Number(moreStudentsMatch[1]);

        const results = Object.values(courses)
            .filter(course => course.students > number)
            .map(course => course.name);

        if (results.length) {

            return `Courses with more than ${number} students: ${results.join(", ")}.`;

        }

        return `No courses have more than ${number} students.`;

    }


    // Exactly X students
    const exactMatch = message.match(
        /(?:which|what)\s+courses?\s+(?:have|has)\s+(?:exactly|equal to)\s+(\d+)\s+students?/
    );

    if (exactMatch) {

        const number = Number(exactMatch[1]);

        const results = Object.values(courses)
            .filter(course => course.students === number)
            .map(course => course.name);

        if (results.length) {

            return `Courses with exactly ${number} students: ${results.join(", ")}.`;

        }

        return `No courses have exactly ${number} students.`;

    }


    return null;

}


// ==========================================
// GENERAL COLLEGE INFORMATION
// ==========================================

function generalInformation(message) {


    // Library
    if (keywordFound(message, "library")) {

        if (
            keywordFound(message, "where") ||
            keywordFound(message, "location") ||
            keywordFound(message, "floor")
        ) {

            return collegeInfo.library.location;

        }

        if (
            keywordFound(message, "hours") ||
            keywordFound(message, "open")
        ) {

            return collegeInfo.library.hours;

        }

        return collegeInfo.library.services;

    }


    // Academic year
    if (
        keywordFound(message, "academic year") ||
        keywordFound(message, "college year") ||
        keywordFound(message, "school year")
    ) {

        if (
            keywordFound(message, "start") ||
            keywordFound(message, "starts") ||
            keywordFound(message, "begin") ||
            keywordFound(message, "begins")
        ) {

            return collegeInfo.academicYear.start;

        }

        if (
            keywordFound(message, "end") ||
            keywordFound(message, "ends")
        ) {

            return collegeInfo.academicYear.end;

        }

        return "The academic year starts in October and ends in June.";

    }


    // Administration
    if (
        keywordFound(message, "administration") ||
        keywordFound(message, "admin")
    ) {

        if (keywordFound(message, "hours")) {

            return collegeInfo.administration.hours;

        }

        return collegeInfo.administration.location;

    }


    // Cafeteria
    if (
        keywordFound(message, "cafeteria") ||
        keywordFound(message, "canteen")
    ) {

        if (keywordFound(message, "hours")) {

            return collegeInfo.cafeteria.hours;

        }

        return collegeInfo.cafeteria.location;

    }


    // Computer lab
    if (
        keywordFound(message, "computer lab") ||
        keywordFound(message, "laboratory")
    ) {

        return collegeInfo.computerLab.location;

    }


    // Auditorium
    if (keywordFound(message, "auditorium")) {

        return collegeInfo.auditorium.location;

    }


    return null;

}


// ==========================================
// STUDENT SERVICES
// ==========================================

function serviceResponse(message) {


    const services = {

        registration: [
            "registration",
            "register",
            "enrollment"
        ],

        exams: [
            "exam",
            "exams",
            "examination",
            "test"
        ],

        scholarships: [
            "scholarship",
            "scholarships",
            "financial aid"
        ],

        studentAffairs: [
            "student affairs",
            "student services"
        ],

        academicAdvising: [
            "academic advising",
            "academic advice",
            "advisor",
            "adviser"
        ]

    };


    for (const [service, keywords] of Object.entries(services)) {

        for (const keyword of keywords) {

            if (keywordFound(message, keyword)) {

                return studentServices[service];

            }

        }

    }

    return null;

}


// ==========================================
// MAIN RESPONSE ENGINE
// ==========================================

function generateResponse(userMessage) {

    const message = cleanText(userMessage);


    // Empty message
    if (!message) {

        return "Please type a question and I'll try to help. 🙂";

    }


    // Find intent
    const intent = findIntent(message);


    // Available courses
    if (intent === "available_courses") {

        return availableCoursesResponse();

    }


    // Greetings
    const greetings = [
        "hello",
        "hi",
        "hey",
        "yo",
        "hiya",
        "good morning",
        "good afternoon",
        "good evening"
    ];

    if (greetings.includes(message)) {

        return "Hello! 👋 I'm your College BI Assistant. Ask me about courses, teachers, schedules, locations, departments or college statistics.";

    }


    // Goodbye
    const goodbyes = [
        "bye",
        "goodbye",
        "good bye",
        "quit",
        "exit"
    ];

    if (goodbyes.includes(message)) {

        return "Goodbye! 👋 Good luck with your studies!";

    }


    // Analytical questions
    const analytical = analyticalResponse(message);

    if (analytical) {

        return analytical;

    }


    // General information
    const general = generalInformation(message);

    if (general) {

        return general;

    }


    // Student services
    const service = serviceResponse(message);

    if (service) {

        return service;

    }


    // Course
    const courseId = findCourse(message);

    if (courseId) {

        return courseResponse(
            courseId,
            intent
        );

    }


    // Teacher
    const teacher = findTeacher(message);

    if (teacher) {

        return teacherResponse(
            teacher,
            intent
        );

    }


    // Unknown question
    return "I'm not completely sure what you're asking. 🤔\nYou can ask me about a course, teacher, schedule, location, department, students, library, administration or student services.";

}


// ==========================================
// TEACHER RESPONSE
// ==========================================

function teacherResponse(teacher, intent) {


    if (intent === "location") {

        return `${teacher.fullName}'s office is located in ${teacher.office}.`;

    }


    if (intent === "department") {

        return `${teacher.fullName} belongs to the ${teacher.department} department.`;

    }


    const subjects = teacher.subjects.join(", ");

    return `${teacher.fullName} teaches ${subjects}.`;

}


// ==========================================
// ADD MESSAGE TO CHAT
// ==========================================

function addMessage(message, type) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(type);

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage() {

    const message = chatInput.value.trim();


    // Don't send empty messages
    if (message === "") {
        return;
    }


    // Display user message
    addMessage(
        message,
        "user-message"
    );


    // Clear input
    chatInput.value = "";


    // Generate response directly in browser
    const reply = generateResponse(message);


    // Display bot response
    addMessage(
        reply,
        "bot-message"
    );

}


// ==========================================
// SUGGESTED QUESTIONS
// ==========================================

function askQuestion(question) {

    const input =
        document.getElementById("chat-input");

    input.value = question;

    sendMessage();

}


// ==========================================
// ENTER KEY
// ==========================================

chatInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);