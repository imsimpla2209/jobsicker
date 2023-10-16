export enum EStatus {
  PENDING = 'pending',
  INPROGRESS = 'inProgress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
  PAID = 'paid',
  LATE = 'late',
}

export enum EJobStatus {
  PENDING = 'pending',
  INPROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
  OPEN = 'open',
}

export enum EUserVisibility {
  ANYONE = 'anyone',
  VERIFIED_USER = 'verified_user',
}

export enum ELevel {
  BEGINNER = 0,
  INTERMEDIATE = 1,
  JUNIOR = 2,
  MID = 3,
  SENIOR = 4,
  MASTER = 5,
  EXPERT = 6,
}

export enum EComplexity {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2,
  HELL = 3,
}

export enum EComplexityGet {
  'easy',
  'medium',
  'hard',
  'hell',
}

export enum EPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  GOAT = 3,
}

export enum EPaymenType {
  PERTASK = 'PerTask',
  PERHOURS = 'PerHour',
  PERWEEK = 'PerWeek',
  PERMONTH = 'PerMonth',
  WHENDONE = 'WhenDone',
}

export enum EJobType {
  ONE_TIME_PROJECT = 'one-time-project',
  ONGOING_PROJECT = 'ongoing-project',
  COMPLEX_PROJECTS = 'complex-projects',
}

export enum EError {
  authorization = 'Authorization is required!',
  userEmailNotFound = 'Invalid email!',
  invalidPassword = 'Invalid password!',
  invalidData = 'You have send invalid data!',
  unauthorized = 'Unauthorized',
  userAlreadyExists = 'User with this email address already exists!',
  incorrectRoom = 'Chat with this room does not exist',
  interlocutorNotFound = 'Chat with this interlocutor does not exist!',
  invalidRefreshToken = 'Invalid refreshToken!',
}

export enum EUserType {
  FREELANCER = 'Freelancer',
  CLIENT = 'Client',
}

export enum EPaymentMethod {
  VNPAY = 'VNPay',
  MOMO = 'Momo',
  CASHOUT = 'Cashout',
}
