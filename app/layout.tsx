import Sidebar from '@/components/Sidebar';
import './globals.css';
import { Figtree } from 'next/font/google';

import Player from '@/components/Player';

import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/action/getSongsByUserId';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: '浪漫音乐：聆听世间美好',
  description: 'inspired from Spotify and Apple Music',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
