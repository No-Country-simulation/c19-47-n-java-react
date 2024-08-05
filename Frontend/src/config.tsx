export const URLs = {
    GET_PATIENT: "http://localhost:8080/api/patient",
    ADD_PATIENT: "http://localhost:8080/api/patient",
    ADD_CLINICAL_HISTORY: "http://localhost:8080/api/clinical-history",
    GET_CLINICAL_HISTORY: "http://localhost:8080/api/clinical-history",
    LOG_IN: "http://localhost:8080/api/users/log-in",
    DOCTOR: "http://localhost:8080/api/doctor",
    DOCTOR_WORK_SCHEDULES : "http://localhost:8080/api/work-schedules",
    ADD_CONSULTATION: "http://localhost:8080/api/consultations",
    CHANGE_PASSWORD: "http://localhost:8080/api/users/change-password",
    getConsultationPatientUrl: (patientId: number) => `${URLs.ADD_CONSULTATION}/${patientId}/patient`,
    getConsultationDoctorUrl: (doctorId: number) => `${URLs.ADD_CONSULTATION}/${doctorId}/doctor`,
  };