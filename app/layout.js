import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'GameVault - Discover the Best Mobile Games',
  description: 'Browse and discover thousands of mobile games across Action, Puzzle, Racing, Sports, Arcade, Casual, Strategy, and Adventure categories. Find your next favorite game today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
