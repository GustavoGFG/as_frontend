import * as api from '@/api/site';
import Footer from '@/components/global/Footer';
import Header from '@/components/global/Header';
import { Search } from '@/components/site/Search';
import { redirect } from '../../../../node_modules/next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const eventItem = await api.getEvent(parseInt(params.id));
  if (!eventItem || !eventItem.status) return redirect('/');

  return (
    <>
      <Header subtitle={`${eventItem.title} - ${eventItem.description}`} />
      <main className="text-center mx-auto max-w-lg p-5 relative flex items-center justify-center min-h-[calc(100vh-140px)]">
        <Search id={eventItem.id} />
      </main>
      <Footer />
    </>
  );
};

export default Page;
