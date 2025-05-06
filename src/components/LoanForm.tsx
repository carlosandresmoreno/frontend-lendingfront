// src/components/LoanApplication/LoanForm.tsx
import React, { useState } from 'react';

interface LoanFormProps {
  formData: any;
  onSubmit: (data: any) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ formData, onSubmit }) => {
  const [taxId, setTaxId] = useState(formData.taxId || '');
  const [businessName, setBusinessName] = useState(formData.businessName || '');
  const [requestedAmount, setRequestedAmount] = useState(formData.requestedAmount || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ taxId, businessName, requestedAmount });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="taxId" className="block text-sm font-semibold">Tax ID</label>
        <input
          type="text"
          id="taxId"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
        />
      </div>
      <div>
        <label htmlFor="businessName" className="block text-sm font-semibold">Business Name</label>
        <input
          type="text"
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
        />
      </div>
      <div>
        <label htmlFor="requestedAmount" className="block text-sm font-semibold">Requested Amount</label>
        <input
          type="number"
          id="requestedAmount"
          value={requestedAmount}
          onChange={(e) => setRequestedAmount(e.target.value)}
          className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
        />
      </div>
      <button type="submit" className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md">Apply</button>
    </form>
  );
};

export default LoanForm;
