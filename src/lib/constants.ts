const WHATSAPP_NUMBER = "351911102405";
export const EMAIL = "protopoacademy@gmail.com";
export const INSTAGRAM_HANDLE = "protopo_academy";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const LOCATION = "Campo da Caridade, Ourém";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const WHATSAPP_NUMBER_EXPORT = WHATSAPP_NUMBER;
export const WHATSAPP_URL_GERAL = wa("Olá! Vi o site da ProTopo Academy e gostava de saber mais sobre os treinos.");
export const WHATSAPP_URL_MARCAR = wa("Olá, gostaria de marcar um treino na ProTopo Academy.");
export const WHATSAPP_URL_DUVIDAS = wa("Olá, gostaria de tirar algumas dúvidas sobre os treinos da ProTopo Academy.");
export const WHATSAPP_URL_PLANOS = wa("Olá, quero saber mais sobre os planos da ProTopo Academy.");
export const WHATSAPP_URL_DIRETO = wa("Olá, quero marcar um treino");
export const EMAIL_URL_GERAL = `mailto:${EMAIL}?subject=Pedido%20de%20informa%C3%A7%C3%A3o&body=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20treinos.`;
export const EMAIL_URL_DADOS = `mailto:${EMAIL}?subject=Pedido%20relativo%20a%20dados%20pessoais`;
