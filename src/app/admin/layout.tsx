import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Amigo Secreto - Admin',
};

type Props = { children: ReactNode };
const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header subtitle={'Painel de Controle'} />
      <main className="min-h-[calc(100vh-140px)] mx-auto w-full max-w-3xl px-3 py-3 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
