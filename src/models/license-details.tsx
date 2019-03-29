export interface ILicenseDetails {
  LicenseId: number;
  StartDate: string;
  EndDate: string;
  Status: string;
  CertificateName: string;
  CertificateNr: string;
  CertificateCode: string;
  DateFulfilled?: Date;
  PostponementDateTo?: Date;
  PostponementGiven?: boolean;
  WithdrawnFromDate?: Date;
  WithdrawnToDate?: Date;
  LicenseAnnotations?: ILicenseAnnotation[];
  RequiredPoints: number;
  PointsToDo: number;
  DonePoints: number;
  CountedPoints: number;
  RequiredPointsTodo: number;
  ParticipationPoints: IParticipationPoint[];
  Participations: IParticipation[];
  IsValid: boolean;
  Completed: boolean;
}

export interface ILicenseAnnotation {
  AnnotationCode: string;
  FromDate: Date;
  PassGeneratedDate: Date;
}

export interface IParticipationPoint {
  ThemeId: number;
  ThemeName: string;
  RequiredPoints: number;
  DonePoints: number;
  CountedPoints: number;
  TodoPoints: number;
}

export interface IParticipation {
  ParticipationId: number;
  CourseId: number;
  Status: string;
  License: null;
  Course: ICourse;
}

export interface ICourse {
  Distance: number;
  Registered: boolean;
  RegisterDate: Date | null;
  CanUnRegister: boolean;
  CourseId: number;
  CourseCode: string;
  Date: string;
  StartTime: string;
  EndTime: string;
  Remarks: string;
  LocationName: string;
  Location: ILocation;
  SpecialtyId: 0;
  Code: null;
  Title: string;
  Theme: string;
  Competence: string;
  Promotext: string;
  Price: number;
  OrganizerId: number;
  Organizer: string;
  OrganizerPhone: string;
  OrganizerEmail: string;
  OrganizerWebsite: string;
  OrganizerContactperson: string | null;
  OrganizerAddress: string | null;
}

export interface ILocation {
  ContactDataId: number;
  Street: string;
  HouseNr: string;
  HouseNrExtension: string;
  Zipcode: string;
  City: string;
  Phone: string | null;
  Email: string | null;
  EmailEmployer: string | null;
  Website: string | null;
}
