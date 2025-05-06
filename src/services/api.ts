export const getLoanDecision = async (data: { requested_amount: number }) => {
    try {
      const response = await fetch('http://ec2-44-233-162-24.us-west-2.compute.amazonaws.com:5100/api/loans/evaluate', {
        method: 'POST',
        body: JSON.stringify({ requested_amount: data.requested_amount }), // Cambia a snake_case
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching loan decision');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  