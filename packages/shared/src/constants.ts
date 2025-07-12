// Enum constants for clinician data
export const STATES = {
    CA: "California",
    NY: "New York",
    TX: "Texas",
    FL: "Florida",
    IL: "Illinois",
    PA: "Pennsylvania",
    OH: "Ohio",
    GA: "Georgia",
    NC: "North Carolina",
    MI: "Michigan",
    NJ: "New Jersey",
    VA: "Virginia",
    WA: "Washington",
    AZ: "Arizona",
    MA: "Massachusetts",
    TN: "Tennessee",
    IN: "Indiana",
    MO: "Missouri",
    MD: "Maryland",
    WI: "Wisconsin",
    CO: "Colorado",
    MN: "Minnesota",
    SC: "South Carolina",
    AL: "Alabama",
    LA: "Louisiana",
    KY: "Kentucky",
    OR: "Oregon",
    OK: "Oklahoma",
    CT: "Connecticut",
    UT: "Utah",
    AR: "Arkansas",
    NV: "Nevada",
    MS: "Mississippi",
    KS: "Kansas",
    NM: "New Mexico",
    NE: "Nebraska",
    WV: "West Virginia",
    ID: "Idaho",
    HI: "Hawaii",
    NH: "New Hampshire",
    ME: "Maine",
    RI: "Rhode Island",
    MT: "Montana",
    DE: "Delaware",
    SD: "South Dakota",
    ND: "North Dakota",
    AK: "Alaska",
    VT: "Vermont",
    WY: "Wyoming"
} as const;

export const LANGUAGES = {
    EN: "English",
    ES: "Spanish",
} as const;

export const INSURANCES = {
    AET: "Aetna",
    BCBS: "Blue Cross Blue Shield",
    CIG: "Cigna",
    UHC: "UnitedHealthcare",
    HUM: "Humana",
    KP: "Kaiser Permanente",
    ANT: "Anthem",
    MOL: "Molina Healthcare",
    CEN: "Centene",
    WC: "WellCare",
    MED: "Medicare",
    MCAID: "Medicaid",
    TRI: "Tricare"
} as const;

export const SPECIALTIES = {
    ANX: "anxiety",
    DEP: "depression",
    TRA: "trauma",
    PTSD: "PTSD",
    BIP: "bipolar disorder",
    EAT: "eating disorders",
    SUB: "substance abuse",
    REL: "relationship counseling",
    FAM: "family therapy",
    GRI: "grief counseling",
    ANG: "anger management",
    STR: "stress management",
    ADHD: "ADHD",
    AUT: "autism spectrum",
    OCD: "OCD",
    PHO: "phobias",
    PAN: "panic disorder",
    BPD: "borderline personality disorder"
} as const;

export const TIME_SLOTS = {
    MOR: "morning",
    AFT: "afternoon",
    EVE: "evening",
    LATE: "late evening",
    WKND: "weekends"
} as const;

export const GENDERS = {
    M: "male",
    F: "female",
    NB: "non-binary"
} as const;

export const APPOINTMENT_TYPES = {
    THERAPY: "therapy",
    MEDICATION: "medication"
} as const;

// Helper functions to get arrays of IDs
export const getStateIds = () => Object.keys(STATES);
export const getLanguageIds = () => Object.keys(LANGUAGES);
export const getInsuranceIds = () => Object.keys(INSURANCES);
export const getSpecialtyIds = () => Object.keys(SPECIALTIES);
export const getTimeSlotIds = () => Object.keys(TIME_SLOTS);
export const getGenderIds = () => Object.keys(GENDERS);
export const getAppointmentTypeIds = () => Object.keys(APPOINTMENT_TYPES);

// Helper functions to get arrays of values
export const getStateValues = () => Object.values(STATES);
export const getLanguageValues = () => Object.values(LANGUAGES);
export const getInsuranceValues = () => Object.values(INSURANCES);
export const getSpecialtyValues = () => Object.values(SPECIALTIES);
export const getTimeSlotValues = () => Object.values(TIME_SLOTS);
export const getGenderValues = () => Object.values(GENDERS);
export const getAppointmentTypeValues = () => Object.values(APPOINTMENT_TYPES);

// Helper functions to get formatted options for UI
export const getStateOptions = () => Object.entries(STATES).map(([code, name]) => ({ code, name }));
export const getLanguageOptions = () => Object.entries(LANGUAGES).map(([code, name]) => ({ code, name }));
export const getInsuranceOptions = () => Object.entries(INSURANCES).map(([code, name]) => ({ code, name }));
export const getSpecialtyOptions = () => Object.entries(SPECIALTIES).map(([code, name]) => ({ code, name }));
export const getTimeSlotOptions = () => Object.entries(TIME_SLOTS).map(([code, name]) => ({ code, name }));
export const getGenderOptions = () => Object.entries(GENDERS).map(([code, name]) => ({ code, name }));
export const getAppointmentTypeOptions = () => Object.entries(APPOINTMENT_TYPES).map(([code, name]) => ({ code, name }));

// Wizard step constants
export const WIZARD_STEPS = {
    START: 'start',
    PROFILE: 'profile',
    CARE_TYPE: 'care-type',
    CLINICAL_NEEDS: 'clinical-needs',
    PREFERENCES: 'preferences',
    AVAILABILITY: 'availability'
} as const;

export const WIZARD_STEP_CONFIG = {
    [WIZARD_STEPS.START]: {
        id: WIZARD_STEPS.START,
        title: 'Getting Started',
        description: 'Welcome to LunaJoy'
    },
    [WIZARD_STEPS.PROFILE]: {
        id: WIZARD_STEPS.PROFILE,
        title: 'Profile',
        description: 'Basic information'
    },
    [WIZARD_STEPS.CARE_TYPE]: {
        id: WIZARD_STEPS.CARE_TYPE,
        title: 'Care Type',
        description: 'Type of care needed'
    },
    [WIZARD_STEPS.CLINICAL_NEEDS]: {
        id: WIZARD_STEPS.CLINICAL_NEEDS,
        title: 'Clinical Needs',
        description: 'Areas to work on'
    },
    [WIZARD_STEPS.PREFERENCES]: {
        id: WIZARD_STEPS.PREFERENCES,
        title: 'Preferences',
        description: 'Provider preferences'
    },
    [WIZARD_STEPS.AVAILABILITY]: {
        id: WIZARD_STEPS.AVAILABILITY,
        title: 'Availability',
        description: 'When to meet'
    }
} as const;

// Helper functions for wizard steps
export const getWizardStepIds = () => Object.keys(WIZARD_STEPS);
export const getWizardStepValues = () => Object.values(WIZARD_STEPS);
export const getWizardStepConfig = () => Object.values(WIZARD_STEP_CONFIG);


const getValue = (id: string, obj: Record<string, string>) => {
    if (obj[id]) {
        return obj[id];
    }
    console.log(`No value found for id: ${id}`);
    return id;
}

// Helper function to get the values from an id
export const getState = (id: string) => getValue(id, STATES);
export const getLanguage = (id: string) => getValue(id, LANGUAGES);
export const getInsurance = (id: string) => getValue(id, INSURANCES);
export const getSpecialty = (id: string) => getValue(id, SPECIALTIES);
export const getTimeSlot = (id: string) => getValue(id, TIME_SLOTS);
export const getGender = (id: string) => getValue(id, GENDERS);
export const getAppointmentType = (id: string) => getValue(id, APPOINTMENT_TYPES);