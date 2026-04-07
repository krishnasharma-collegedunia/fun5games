export const metadata = {
  title: 'About Us - GameVault',
  description: 'Learn about GameVault, an independent game discovery portal.',
};

export default function AboutPage() {
  return (
    <main className="page-content">
      <div className="static-page">
        <h1>About GameVault</h1>
        <p>
          GameVault is an independent game discovery portal dedicated to helping users find the best
          mobile games across multiple platforms and categories. We curate and organize game listings
          to make it easy for players to discover their next favorite game.
        </p>
        <h2>Our Mission</h2>
        <p>
          We believe that great games deserve great visibility. Our mission is to provide a clean,
          user-friendly platform where gamers can browse, search, and discover mobile games without
          the noise and clutter of traditional app stores.
        </p>
        <h2>What We Do</h2>
        <ul>
          <li>Curate top-rated mobile games across Action, Puzzle, Racing, Sports, Arcade, Casual, Strategy, and Adventure categories.</li>
          <li>Provide detailed game information including ratings, screenshots, and descriptions.</li>
          <li>Link directly to official app stores (Google Play and Apple App Store) for safe downloads.</li>
          <li>Maintain an up-to-date database of the latest and most popular mobile games.</li>
        </ul>
        <h2>Important Note</h2>
        <p>
          GameVault is an independent portal and is not affiliated with, endorsed by, or connected to
          Google Play, Apple App Store, or any game developers. All app names, logos, and trademarks
          are the property of their respective owners. We provide links to official stores for user
          convenience only.
        </p>
      </div>
    </main>
  );
}
