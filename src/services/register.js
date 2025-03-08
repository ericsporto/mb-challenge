const handleRegister = async () => {
    const url = 'http://localhost:3000/registration';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error to get data from server');
      }

      const html = await response.text();
      const newPage = window.open('', '_blank');
      newPage.document.write(html);

    } catch (error) {
      console.error('Error to get data from server:', error.message);
    }
  };


  export default handleRegister