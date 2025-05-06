// src/hooks/useLoanApplication.ts
import { useState } from 'react';
import { getLoanDecision } from '../services/api';

export const useLoanApplication = () => {
  const [formData, setFormData] = useState({
    taxId: '',
    businessName: '',
    requestedAmount: '',
  });
  const [decision, setDecision] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: { taxId: string; businessName: string; requestedAmount: string }) => {
    setIsLoading(true);
    setFormData(data);

    try {
      // Aquí se envía la cantidad solicitada
      const response = await getLoanDecision({ requested_amount: Number(data.requestedAmount) });
      setDecision(response.decision);  // Se espera que la respuesta tenga la propiedad "decision"
    } catch (error) {
      console.error('Error fetching loan decision:', error);
      setDecision('Rejected');
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, decision, handleFormSubmit, isLoading };
};
