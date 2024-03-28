export const transformCPF = (cpf: string) => {
  return cpf.replace(/\.|-/gm, '');
};
