

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    return {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
  };

