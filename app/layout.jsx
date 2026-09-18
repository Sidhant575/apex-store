import './globals.css';

export const metadata = {
  title: 'E-Commerce Store & Order Tracker',
  description: 'Full-stack store experience with 3D canvas and admin role switcher',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}