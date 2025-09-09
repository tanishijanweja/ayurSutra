// Mock data for AyurSutra - Panchakarma Patient Management System

export const mockUsers = {
  patients: [
    {
      id: "pat_001",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      age: 45,
      dosha: "Vata-Pitta",
      condition: "Chronic stress and digestive issues",
      joinDate: "2024-01-15",
    },
    {
      id: "pat_002",
      name: "Priya Sharma",
      email: "priya@example.com",
      age: 38,
      dosha: "Kapha-Vata",
      condition: "Joint pain and fatigue",
      joinDate: "2024-02-20",
    },
    {
      id: "pat_003",
      name: "Amit Patel",
      email: "amit@example.com",
      age: 52,
      dosha: "Pitta-Kapha",
      condition: "Hypertension and sleep disorders",
      joinDate: "2024-03-10",
    },
  ],
  practitioners: [
    {
      id: "prac_001",
      name: "Dr. Anjali Nair",
      email: "anjali@ayursutra.com",
      specialization: "Panchakarma Specialist",
      experience: "15 years",
      qualification: "BAMS, MD Panchakarma",
    },
    {
      id: "prac_002",
      name: "Dr. Vikram Singh",
      email: "vikram@ayursutra.com",
      specialization: "Ayurvedic Physician",
      experience: "12 years",
      qualification: "BAMS, MD Kayachikitsa",
    },
  ],
};

export const mockTherapySessions = [
  {
    id: "session_001",
    patientId: "pat_001",
    patientName: "Rajesh Kumar",
    therapyType: "Abhyanga",
    date: "2024-12-28",
    time: "10:00 AM",
    duration: 60,
    practitioner: "Dr. Anjali Nair",
    status: "upcoming",
    notes: "Pre-procedure: Light breakfast recommended. Avoid cold water.",
  },
  {
    id: "session_002",
    patientId: "pat_001",
    patientName: "Rajesh Kumar",
    therapyType: "Shirodhara",
    date: "2024-12-30",
    time: "11:00 AM",
    duration: 45,
    practitioner: "Dr. Anjali Nair",
    status: "upcoming",
    notes: "Pre-procedure: Meditate for 10 minutes before session.",
  },
  {
    id: "session_003",
    patientId: "pat_002",
    patientName: "Priya Sharma",
    therapyType: "Nasya",
    date: "2024-12-29",
    time: "09:30 AM",
    duration: 30,
    practitioner: "Dr. Vikram Singh",
    status: "upcoming",
    notes:
      "Pre-procedure: Clear nasal passages. Avoid heavy meals 2 hours before.",
  },
  {
    id: "session_004",
    patientId: "pat_001",
    patientName: "Rajesh Kumar",
    therapyType: "Abhyanga",
    date: "2024-12-20",
    time: "10:00 AM",
    duration: 60,
    practitioner: "Dr. Anjali Nair",
    status: "completed",
    notes: "Post-procedure: Rest for 30 minutes. Drink warm water.",
    feedback: "Felt very relaxed. Muscle tension reduced significantly.",
  },
  {
    id: "session_005",
    patientId: "pat_002",
    patientName: "Priya Sharma",
    therapyType: "Udvartana",
    date: "2024-12-22",
    time: "02:00 PM",
    duration: 45,
    practitioner: "Dr. Vikram Singh",
    status: "completed",
    notes: "Post-procedure: Light herbal tea recommended.",
    feedback: "Skin feels much smoother. Energy levels improved.",
  },
];

export const mockNotifications = [
  {
    id: "notif_001",
    patientId: "pat_001",
    type: "pre-therapy",
    title: "Upcoming Abhyanga Session",
    message:
      "Drink warm water 30 minutes before your session. Avoid cold foods today.",
    date: "2024-12-28",
    time: "09:00 AM",
    read: false,
  },
  {
    id: "notif_002",
    patientId: "pat_001",
    type: "post-therapy",
    title: "Post-Therapy Care",
    message:
      "Rest for 30 minutes after your session. Take prescribed herbal decoction.",
    date: "2024-12-20",
    time: "11:30 AM",
    read: true,
  },
  {
    id: "notif_003",
    patientId: "pat_002",
    type: "appointment",
    title: "Session Reminder",
    message: "Your Nasya therapy is scheduled for tomorrow at 9:30 AM.",
    date: "2024-12-28",
    time: "06:00 PM",
    read: false,
  },
  {
    id: "notif_004",
    patientId: "pat_001",
    type: "dietary",
    title: "Dietary Guidelines",
    message:
      "Include warm, cooked foods in your diet. Avoid raw vegetables this week.",
    date: "2024-12-27",
    time: "08:00 AM",
    read: false,
  },
];

export const mockFeedback = [
  {
    id: "fb_001",
    patientId: "pat_001",
    patientName: "Rajesh Kumar",
    sessionId: "session_004",
    therapyType: "Abhyanga",
    date: "2024-12-20",
    rating: 5,
    symptoms: "Muscle tension, stress",
    improvements:
      "Significant reduction in muscle tension, better sleep quality",
    sideEffects: "None",
    overallFeedback:
      "Excellent therapy session. Feeling much more relaxed and energized.",
    practitionerNotes:
      "Patient responded well to treatment. Continue with current protocol.",
  },
  {
    id: "fb_002",
    patientId: "pat_002",
    patientName: "Priya Sharma",
    sessionId: "session_005",
    therapyType: "Udvartana",
    date: "2024-12-22",
    rating: 4,
    symptoms: "Joint stiffness, low energy",
    improvements: "Better joint mobility, increased energy levels",
    sideEffects: "Mild skin sensitivity initially",
    overallFeedback:
      "Good improvement in joint flexibility. Skin feels rejuvenated.",
    practitionerNotes:
      "Mild sensitivity noted. Adjust oil mixture for next session.",
  },
];

export const mockTherapyProgress = [
  {
    patientId: "pat_001",
    weeklyData: [
      { week: "Week 1", stress: 8, energy: 3, sleep: 4, pain: 7 },
      { week: "Week 2", stress: 6, energy: 5, sleep: 6, pain: 5 },
      { week: "Week 3", stress: 4, energy: 7, sleep: 7, pain: 3 },
      { week: "Week 4", stress: 3, energy: 8, sleep: 8, pain: 2 },
    ],
  },
  {
    patientId: "pat_002",
    weeklyData: [
      { week: "Week 1", stress: 6, energy: 4, sleep: 5, pain: 8 },
      { week: "Week 2", stress: 5, energy: 6, sleep: 6, pain: 6 },
      { week: "Week 3", stress: 4, energy: 7, sleep: 7, pain: 4 },
    ],
  },
];

export const therapyTypes = [
  {
    name: "Abhyanga",
    description: "Full body oil massage with warm medicated oils",
    duration: "60-90 minutes",
    benefits: "Improves circulation, reduces stress, nourishes skin",
  },
  {
    name: "Shirodhara",
    description: "Continuous pouring of warm oil on forehead",
    duration: "45-60 minutes",
    benefits: "Calms nervous system, improves sleep, reduces anxiety",
  },
  {
    name: "Nasya",
    description: "Nasal administration of medicated oils/powders",
    duration: "30-45 minutes",
    benefits: "Clears sinuses, improves breathing, enhances mental clarity",
  },
  {
    name: "Udvartana",
    description: "Therapeutic massage with herbal powder/paste",
    duration: "45-60 minutes",
    benefits: "Exfoliates skin, reduces cellulite, improves metabolism",
  },
  {
    name: "Swedana",
    description: "Herbal steam therapy for detoxification",
    duration: "20-30 minutes",
    benefits: "Opens pores, eliminates toxins, relieves stiffness",
  },
];

// Helper functions for mock data operations
export const getPatientSessions = (patientId) => {
  return mockTherapySessions.filter(
    (session) => session.patientId === patientId
  );
};

export const getPatientNotifications = (patientId) => {
  return mockNotifications.filter((notif) => notif.patientId === patientId);
};

export const getPatientFeedback = (patientId) => {
  return mockFeedback.filter((fb) => fb.patientId === patientId);
};

export const getPatientProgress = (patientId) => {
  return mockTherapyProgress.find(
    (progress) => progress.patientId === patientId
  );
};
