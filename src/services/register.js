const userRegister = async (data) => {
  const url = 'http://localhost:3000/registration';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer valid_token',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Erro desconhecido');
    }

    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default userRegister;
