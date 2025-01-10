import { format } from 'date-fns';
import { PaymentMilestone } from '../types/quotation';

export const generateQuotationNumber = (sequence: number): string => {
  const date = new Date();
  const formattedDate = format(date, 'ddMM');
  const sequenceNumber = String(sequence).padStart(3, '0');
  return `QT-${formattedDate}-${sequenceNumber}`;
};

export const calculateMilestoneAmount = (
  total: number,
  percentage: number
): number => {
  return (total * percentage) / 100;
};

export function validateMilestones(milestones: PaymentMilestone[]): boolean {
  const totalPercentage = milestones.reduce((sum, milestone) => sum + milestone.percentage, 0);
  return totalPercentage === 100;
}