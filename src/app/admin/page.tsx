import * as api from '@/api/server';
import { AdminPage } from '@/components/admin/AdminPage';
import { redirect } from '../../../node_modules/next/navigation';

const Page = async () => {
  const logged = await api.pingAdmin();
  if (!logged) return redirect('/admin/login');

  return <AdminPage />;
};
export default Page;
