import { FormType } from 'components/PersonalInformationCard';

type NormalizedFormType = {
  name: string;
  email: string;
  CPF: number;
};

export const normalizeFormData = (data: FormType): FormType => ({
  ...data,
  age: Number(data.age),
});
