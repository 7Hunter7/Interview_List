// Интерфейс собеседования

export interface IInterview {
  id: string;
  company: string;
  vacancyLink: string;
  hrName: string;
  contactTelegram?: string;
  contactWhatsApp?: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
  salaryFrom?: number;
  salaryTo?: number;
  stages?: IStage[];
}

// Интерфейс этапа собеседования
export interface IStage {
  name: string;
  date: string;
  description: string;
}
