// Mock Data for SportsTogether Prototype
// This file contains realistic dummy data for all use cases

export const currentUser = {
    id: 1,
    username: "Jing Ming",
    email: "jingming@example.com",
    bio: "Basketball enthusiast | Love playing badminton on weekends | Always up for a game!",
    profilePicture: "https://i.pravatar.cc/150?img=33",
    favoriteSports: ["Basketball", "Badminton", "Football"],
    trustLevel: "Trusted", // "New", "Trusted", "Verified"
    gamesPlayed: 47,
    pointsEarned: 2850,
    memberSince: "2024-01-15",
    role: "Player" // "Player", "Instructor"
};

// Define users array as a const that can be used by other arrays
const usersArray = [
    {
        id: 2,
        username: "SarahLim",
        profilePicture: "https://i.pravatar.cc/150?img=45",
        trustLevel: "Verified",
        bio: "Certified tennis coach | Fitness enthusiast"
    },
    {
        id: 3,
        username: "MikeTan",
        profilePicture: "https://i.pravatar.cc/150?img=12",
        trustLevel: "Trusted",
        bio: "Football lover | Weekend warrior"
    },
    {
        id: 4,
        username: "JessicaWong",
        profilePicture: "https://i.pravatar.cc/150?img=47",
        trustLevel: "New",
        bio: "New to the sports community!"
    },
    {
        id: 5,
        username: "DavidLee",
        profilePicture: "https://i.pravatar.cc/150?img=56",
        trustLevel: "Trusted",
        bio: "Badminton player | Looking for regular partners"
    },
    {
        id: 6,
        username: "EmilyTan",
        profilePicture: "https://i.pravatar.cc/150?img=28",
        trustLevel: "Trusted",
        bio: "Volleyball enthusiast | Love group sports"
    }
];

export const users = usersArray;


export const games = [
    {
        id: 1,
        sportType: "Basketball",
        title: "Friday Night Basketball",
        date: "2024-12-06",
        time: "19:00",
        venue: "USM Sports Complex",
        venueAddress: "Universiti Sains Malaysia, Penang",
        cost: 15.00,
        maxPlayers: 10,
        currentPlayers: 7,
        status: "Open",
        organizer: usersArray[0],
        roster: [usersArray[0], usersArray[1], usersArray[2], usersArray[3]],
        description: "Casual basketball game. All skill levels welcome! We'll split into teams and play a few rounds.",
        requirements: "Bring your own water bottle",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400"
    },
    {
        id: 2,
        sportType: "Badminton",
        title: "Weekend Badminton Session",
        date: "2024-12-07",
        time: "09:00",
        venue: "Queensbay Badminton Court",
        venueAddress: "Queensbay Mall, Bayan Lepas",
        cost: 20.00,
        maxPlayers: 8,
        currentPlayers: 8,
        status: "Full",
        organizer: usersArray[1],
        roster: [usersArray[1], usersArray[2], usersArray[3]],
        description: "Doubles badminton session. Intermediate level players preferred.",
        requirements: "Bring your own racket",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400"
    },
    {
        id: 3,
        sportType: "Football",
        title: "Sunday Football Match",
        date: "2024-12-08",
        time: "16:00",
        venue: "Penang Youth Park",
        venueAddress: "Jalan Bukit Gambir, Penang",
        cost: 10.00,
        maxPlayers: 22,
        currentPlayers: 15,
        status: "Open",
        organizer: usersArray[2],
        roster: [usersArray[2], usersArray[3]],
        description: "11v11 football match. Need a few more players to complete the teams!",
        requirements: "Shin guards recommended",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400"
    },
    {
        id: 4,
        sportType: "Tennis",
        title: "Morning Tennis Practice",
        date: "2024-12-05",
        time: "07:00",
        venue: "Penang Tennis Centre",
        venueAddress: "Jalan Utama, George Town",
        cost: 25.00,
        maxPlayers: 4,
        currentPlayers: 2,
        status: "Pending Review",
        organizer: usersArray[3],
        roster: [usersArray[3]],
        description: "Early morning tennis for serious players.",
        requirements: "Advanced level only",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400"
    }
];


export const socialPosts = [
    {
        id: 1,
        user: usersArray[0],
        content: "Had an amazing basketball game today! 🏀 Thanks to everyone who joined. Same time next week?",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 5,
        likedByUser: false
    },
    {
        id: 2,
        user: usersArray[1],
        content: "Just completed my 50th game on SportsTogether! 🎉 This community is awesome!",
        image: null,
        timestamp: "5 hours ago",
        likes: 42,
        comments: 12,
        likedByUser: true
    },
    {
        id: 3,
        user: usersArray[2],
        content: "Looking for regular football partners in Penang. Who's interested? ⚽",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
        timestamp: "1 day ago",
        likes: 18,
        comments: 7,
        likedByUser: false
    },
    {
        id: 4,
        user: usersArray[3],
        content: "New tennis court opened near Queensbay! Anyone tried it yet? 🎾",
        image: null,
        timestamp: "2 days ago",
        likes: 15,
        comments: 3,
        likedByUser: false
    }
];

export const groups = [
    {
        id: 1,
        name: "Penang Basketball League",
        sportInterest: "Basketball",
        description: "For basketball enthusiasts in Penang. We organize weekly games and tournaments!",
        visibility: "Public",
        members: 127,
        admin: usersArray[0],
        memberAvatars: [usersArray[0].profilePicture, usersArray[1].profilePicture, usersArray[2].profilePicture],
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300",
        joined: true
    },
    {
        id: 2,
        name: "Badminton Buddies",
        sportInterest: "Badminton",
        description: "Friendly badminton group for all skill levels. Weekend sessions every Saturday!",
        visibility: "Public",
        members: 89,
        admin: usersArray[1],
        memberAvatars: [usersArray[1].profilePicture, usersArray[3].profilePicture],
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=300",
        joined: true
    },
    {
        id: 3,
        name: "USM Sports Club",
        sportInterest: "Multiple Sports",
        description: "Official USM sports community. Students and alumni welcome!",
        visibility: "Private",
        members: 256,
        admin: usersArray[2],
        memberAvatars: [usersArray[2].profilePicture, usersArray[3].profilePicture],
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300",
        joined: false
    },
    {
        id: 4,
        name: "Night Runners",
        sportInterest: "Running",
        description: "Evening running group. We meet three times a week for 5-10km runs.",
        visibility: "Public",
        members: 64,
        admin: usersArray[0],
        memberAvatars: [usersArray[0].profilePicture],
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300",
        joined: false
    }
];

export const instructors = [
    {
        id: 1,
        name: "Coach Sarah Lim",
        user: usersArray[1],
        sports: ["Tennis", "Badminton"],
        certifications: ["Level 3 Tennis Coach", "Badminton Coaching Certificate"],
        yearsExperience: 8,
        rating: 4.9,
        reviewCount: 87,
        hourlyRate: 80.00,
        bio: "Professional tennis and badminton coach with 8 years of experience. Specializing in technique improvement and competitive training.",
        verified: true,
        availableSlots: [
            { date: "2024-12-05", time: "10:00 AM" },
            { date: "2024-12-05", time: "02:00 PM" },
            { date: "2024-12-06", time: "09:00 AM" },
            { date: "2024-12-07", time: "04:00 PM" }
        ],
        avatar: "https://i.pravatar.cc/150?img=45"
    },
    {
        id: 2,
        name: "Coach Ahmad Rahman",
        sports: ["Football", "Futsal"],
        certifications: ["UEFA B License", "Sports Science Degree"],
        yearsExperience: 12,
        rating: 4.8,
        reviewCount: 124,
        hourlyRate: 100.00,
        bio: "Former professional footballer turned coach. Specialized in youth development and tactical training.",
        verified: true,
        availableSlots: [
            { date: "2024-12-06", time: "03:00 PM" },
            { date: "2024-12-07", time: "10:00 AM" },
            { date: "2024-12-08", time: "11:00 AM" }
        ],
        avatar: "https://i.pravatar.cc/150?img=14"
    },
    {
        id: 3,
        name: "Coach Lisa Tan",
        sports: ["Swimming", "Aqua Aerobics"],
        certifications: ["AUSTSWIM Certified", "Lifeguard Certified"],
        yearsExperience: 6,
        rating: 4.7,
        reviewCount: 56,
        hourlyRate: 70.00,
        bio: "Passionate swimming instructor for all ages. Patient and encouraging teaching style.",
        verified: true,
        availableSlots: [
            { date: "2024-12-05", time: "07:00 AM" },
            { date: "2024-12-06", time: "07:00 AM" },
            { date: "2024-12-07", time: "08:00 AM" }
        ],
        avatar: "https://i.pravatar.cc/150?img=32"
    }
];


export const rewards = [
    {
        id: 1,
        name: "RM10 Decathlon Voucher",
        pointCost: 500,
        description: "Redeem for RM10 off at any Decathlon store",
        category: "Voucher",
        image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300",
        stock: 50,
        validUntil: "2025-03-31"
    },
    {
        id: 2,
        name: "RM20 Sports Planet Voucher",
        pointCost: 1000,
        description: "RM20 discount on sports equipment and apparel",
        category: "Voucher",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300",
        stock: 30,
        validUntil: "2025-04-30"
    },
    {
        id: 3,
        name: "Premium Sports Water Bottle",
        pointCost: 800,
        description: "Insulated 750ml sports bottle with SportsTogether branding",
        category: "Merchandise",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300",
        stock: 100,
        validUntil: null
    },
    {
        id: 4,
        name: "SportsTogether T-Shirt",
        pointCost: 600,
        description: "Official SportsTogether branded athletic t-shirt (Multiple sizes available)",
        category: "Merchandise",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
        stock: 75,
        validUntil: null
    },
    {
        id: 5,
        name: "Free Game Hosting",
        pointCost: 300,
        description: "Host one game for free (waives platform fee)",
        category: "Service",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300",
        stock: null,
        validUntil: "2025-12-31"
    },
    {
        id: 6,
        name: "1-Hour Coaching Session",
        pointCost: 1500,
        description: "One free hour with any verified instructor",
        category: "Service",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300",
        stock: 20,
        validUntil: "2025-06-30"
    }
];

export const myRewards = [
    {
        id: 101,
        reward: rewards[0],
        voucherCode: "DEC-ST-7KJ9",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEC-ST-7KJ9",
        redeemedDate: "2024-11-15",
        status: "Active",
        expiryDate: "2025-03-31"
    },
    {
        id: 102,
        reward: rewards[4],
        voucherCode: "FREE-GAME-M3P2",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FREE-GAME-M3P2",
        redeemedDate: "2024-11-20",
        status: "Active",
        expiryDate: "2025-12-31"
    }
];

export const transactions = [
    {
        id: 1,
        type: "Game",
        title: "Friday Night Basketball",
        date: "2024-11-29",
        amount: 15.00,
        status: "Completed",
        gameId: 1,
        canReport: true
    },
    {
        id: 2,
        type: "Instructor",
        title: "Tennis Coaching with Coach Sarah",
        date: "2024-11-27",
        amount: 80.00,
        status: "Completed",
        instructorId: 1,
        canReport: true
    },
    {
        id: 3,
        type: "Game",
        title: "Weekend Badminton Session",
        date: "2024-11-25",
        amount: 20.00,
        status: "Completed",
        gameId: 2,
        canReport: false // Outside safety window
    },
    {
        id: 4,
        type: "Game",
        title: "Sunday Football Match",
        date: "2024-12-01",
        amount: 10.00,
        status: "Upcoming",
        gameId: 3,
        canReport: false
    }
];

export const issueCategories = [
    "Organizer No-Show",
    "Inappropriate Behavior",
    "Harassment",
    "Venue Issue",
    "Payment Problem",
    "Instructor No-Show",
    "Service Quality",
    "Safety Concern",
    "Other"
];

export const aiChatHistory = [
    {
        id: 1,
        sender: "user",
        message: "How do I create a game?",
        timestamp: "10:30 AM"
    },
    {
        id: 2,
        sender: "ai",
        message: "To create a game, click on the 'Create Game' button in the navigation menu. Fill in the game details including sport type, date, time, venue, and cost. If you're a new user, you may need to upload venue booking proof for verification. Click 'Submit' when you're done!",
        timestamp: "10:30 AM"
    },
    {
        id: 3,
        sender: "user",
        message: "What are the payment options?",
        timestamp: "10:32 AM"
    },
    {
        id: 4,
        sender: "ai",
        message: "We accept various payment methods including credit/debit cards (Visa, Mastercard), e-wallets (GrabPay, Touch 'n Go), and online banking. All payments are securely processed and held in escrow until the game is completed.",
        timestamp: "10:32 AM"
    }
];

export const sportTypes = [
    "Basketball",
    "Football",
    "Badminton",
    "Tennis",
    "Volleyball",
    "Swimming",
    "Running",
    "Cycling",
    "Table Tennis",
    "Futsal",
    "Rugby",
    "Cricket"
];

// ==================== INSTRUCTOR MODULE MOCK DATA ====================

export const instructorProfile = {
    id: 1,
    userId: 2,
    name: "Sarah Lim",
    email: "sarah.lim@example.com",
    profilePicture: "https://i.pravatar.cc/150?img=45",
    bio: "Professional tennis and badminton coach with 8 years of experience. Specializing in technique improvement and competitive training. Passionate about helping players reach their full potential.",
    yearsExperience: 8,
    hourlyRate: 80.00,
    sportsOffered: ["Tennis", "Badminton"],
    certifications: [
        { name: "Level 3 Tennis Coach", issuer: "Tennis Association", year: 2018 },
        { name: "Badminton Coaching Certificate", issuer: "Badminton Federation", year: 2019 },
        { name: "Sports Science Diploma", issuer: "Sports Institute", year: 2016 }
    ],
    rating: 4.9,
    totalSessions: 187,
    totalEarnings: 14960.00,
    instructorLevel: "Gold",
    rewardPoints: 3740,
    verified: true,
    bankAccountVerified: true,
    walletBalance: 2400.00
};

export const coachingSessions = [
    {
        id: 1,
        date: "2024-12-05",
        timeSlot: "10:00 AM - 12:00 PM",
        sessionType: "Private Lesson",
        sport: "Tennis",
        price: 80.00,
        maxParticipants: 1,
        currentParticipants: 1,
        status: "Confirmed",
        venue: "Penang Tennis Centre",
        participants: [
            { id: 3, name: "MikeTan", profilePicture: "https://i.pravatar.cc/150?img=12" }
        ]
    },
    {
        id: 2,
        date: "2024-12-06",
        timeSlot: "02:00 PM - 04:00 PM",
        sessionType: "Group Class",
        sport: "Badminton",
        price: 120.00,
        maxParticipants: 4,
        currentParticipants: 3,
        status: "Confirmed",
        venue: "Queensbay Badminton Court",
        participants: [
            { id: 4, name: "JessicaWong", profilePicture: "https://i.pravatar.cc/150?img=47" },
            { id: 5, name: "DavidLee", profilePicture: "https://i.pravatar.cc/150?img=56" },
            { id: 6, name: "EmilyTan", profilePicture: "https://i.pravatar.cc/150?img=28" }
        ]
    },
    {
        id: 3,
        date: "2024-12-07",
        timeSlot: "09:00 AM - 10:00 AM",
        sessionType: "Private Lesson",
        sport: "Tennis",
        price: 80.00,
        maxParticipants: 1,
        currentParticipants: 0,
        status: "Available",
        venue: "Penang Tennis Centre",
        participants: []
    },
    {
        id: 4,
        date: "2024-12-08",
        timeSlot: "04:00 PM - 06:00 PM",
        sessionType: "Group Class",
        sport: "Badminton",
        price: 120.00,
        maxParticipants: 4,
        currentParticipants: 1,
        status: "Pending",
        venue: "USM Sports Complex",
        participants: [
            { id: 3, name: "MikeTan", profilePicture: "https://i.pravatar.cc/150?img=12", requestStatus: "Pending" }
        ]
    }
];

export const classHistory = [
    {
        id: 101,
        date: "2024-11-30",
        timeSlot: "10:00 AM - 12:00 PM",
        sessionType: "Private Lesson",
        sport: "Tennis",
        earnings: 80.00,
        participants: ["AlexChen"],
        rating: 5.0,
        feedback: "Excellent coaching! Very patient and knowledgeable.",
        status: "Completed"
    },
    {
        id: 102,
        date: "2024-11-28",
        timeSlot: "02:00 PM - 04:00 PM",
        sessionType: "Group Class",
        sport: "Badminton",
        earnings: 120.00,
        participants: ["MikeTan", "JessicaWong", "DavidLee"],
        rating: 4.8,
        feedback: "Great session, learned a lot!",
        status: "Completed"
    },
    {
        id: 103,
        date: "2024-11-25",
        timeSlot: "09:00 AM - 11:00 AM",
        sessionType: "Private Lesson",
        sport: "Tennis",
        earnings: 80.00,
        participants: ["EmilyTan"],
        rating: 5.0,
        feedback: "Best coach I've ever had!",
        status: "Completed"
    },
    {
        id: 104,
        date: "2024-11-23",
        timeSlot: "04:00 PM - 06:00 PM",
        sessionType: "Group Class",
        sport: "Badminton",
        earnings: 120.00,
        participants: ["AlexChen", "MikeTan"],
        rating: 4.9,
        feedback: "Highly recommended!",
        status: "Completed"
    },
    {
        id: 105,
        date: "2024-11-20",
        timeSlot: "10:00 AM - 12:00 PM",
        sessionType: "Private Lesson",
        sport: "Tennis",
        earnings: 80.00,
        participants: ["DavidLee"],
        rating: 4.7,
        feedback: "Good session overall.",
        status: "Completed"
    }
];

export const instructorEarnings = {
    totalEarnings: 14960.00,
    thisMonth: 480.00,
    lastMonth: 720.00,
    pendingPayouts: 2400.00,
    lifetimeEarnings: 14960.00,
    earningsBreakdown: [
        { month: "November 2024", amount: 720.00, sessions: 9 },
        { month: "October 2024", amount: 880.00, sessions: 11 },
        { month: "September 2024", amount: 640.00, sessions: 8 },
        { month: "August 2024", amount: 960.00, sessions: 12 }
    ]
};

export const payoutHistory = [
    {
        id: 1,
        date: "2024-11-01",
        amount: 640.00,
        status: "Completed",
        method: "Bank Transfer",
        bankAccount: "****5678",
        transactionId: "TXN-2024110100123"
    },
    {
        id: 2,
        date: "2024-10-01",
        amount: 880.00,
        status: "Completed",
        method: "Bank Transfer",
        bankAccount: "****5678",
        transactionId: "TXN-2024100100089"
    },
    {
        id: 3,
        date: "2024-09-01",
        amount: 720.00,
        status: "Completed",
        method: "Bank Transfer",
        bankAccount: "****5678",
        transactionId: "TXN-2024090100056"
    }
];

export const instructorRewards = {
    currentLevel: "Gold",
    currentPoints: 3740,
    nextLevel: "Platinum",
    pointsToNextLevel: 1260,
    benefits: [
        { level: "Bronze", commissionRate: "15%", unlocked: true },
        { level: "Silver", commissionRate: "12%", unlocked: true },
        { level: "Gold", commissionRate: "10%", unlocked: true },
        { level: "Platinum", commissionRate: "8%", unlocked: false }
    ],
    pointsSources: [
        { source: "Completed Sessions", points: 1870, percentage: 50 },
        { source: "5-Star Ratings", points: 1122, percentage: 30 },
        { source: "Repeat Bookings", points: 748, percentage: 20 }
    ]
};

export const bankAccounts = [
    {
        id: 1,
        bankName: "Maybank",
        accountNumber: "****5678",
        accountHolderName: "Sarah Lim",
        verified: true,
        addedDate: "2024-01-15"
    }
];
