import React, { useState } from 'react';
import swal from 'sweetalert2';
import { getLoanDecision } from '../services/api';

const LoanApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    taxId: '',
    businessName: '',
    requestedAmount: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'requestedAmount') {
      // Permite solo dígitos
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { requestedAmount } = formData;

    if (!requestedAmount) {
      swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await getLoanDecision({
        requested_amount: Number(requestedAmount),
      });

      const decisionMessage = response.decision; // "Approved", "Declined", "Undecided"

      await swal.fire({
        title: 'Loan Decision',
        text: decisionMessage,
        icon: decisionMessage === 'Approved' ? 'success' : decisionMessage === 'Undecided' ? 'warning' : 'error',
        confirmButtonText: 'Ok',
        background: '#1e1e1e',
        color: '#fff',
        confirmButtonColor: '#4CAF50',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
        },
      }).then(() => {
        setFormData({ taxId: '', businessName: '', requestedAmount: '' });
      });
    } catch (error) {
      swal.fire('Error', 'There was an error with the loan application', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg custom-shadow">
      <h2 className="text-2xl font-semibold text-center text-white mb-6">Loan Application</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-8">
          <label htmlFor="taxId" className="block text-sm font-medium text-gray-300">Tax Id</label>
          <input
            type="text"
            id="taxId"
            name="taxId"
            value={formData.taxId}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-300">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="requestedAmount" className="block text-sm font-medium text-gray-300">Requested Amount</label>
          <input
            type="number" 
            id="requestedAmount"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:border-blue-600 transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 mt-4 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold focus:outline-none transition-colors ${isLoading && 'opacity-50 cursor-not-allowed'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Apply for Loan'}
        </button>
      </form>
    </div>
  );
};

export default LoanApplication;
