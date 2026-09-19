import GameWorld from '@/components/GameWorld';
import MobileWorld from '@/components/MobileWorld';

export default function Home() {
  return (
    <>
      {/* lg and up: the side-scrolling world */}
      <GameWorld />
      {/* below lg: the same content as a plain page */}
      <MobileWorld />
    </>
  );
}
