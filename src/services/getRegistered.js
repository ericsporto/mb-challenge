const getRegistered = async () => {
    const url = 'http://localhost:3000/registration';

    try {
      const response = await fetch(url);
      const htmlContent = await response.text();

      const newTab = window.open();
      if (newTab) {
        newTab.document.open();
        newTab.onload = () => {
          const bodyContent = newTab.document.createElement('body');
          bodyContent.innerHTML = htmlContent;
          newTab.document.body.appendChild(bodyContent);
          newTab.document.close();
        };
        newTab.document.close();
      } else {
        console.error('Bloqueio de popup! Permita popups para visualizar a página.');
      }
    } catch (error) {
      console.error('Erro ao buscar a página de registro:', error);
    }
  };

export default getRegistered;
