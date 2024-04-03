import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';

const Page = () => {
  return (
    <div>
      <Header subtitle="Home" />
      <main className="min-h-[calc(100vh-140px)]"></main>
      <Footer />
    </div>
  );
};
export default Page;
