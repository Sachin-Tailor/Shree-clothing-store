import CategoryPage from '@/components/CategoryPage';

export const metadata = {
  title: 'Sarees — Shree A | Handwoven Silk & Banarasi Sarees',
  description: 'Explore our exquisite collection of handwoven sarees — Silk, Banarasi, Bandhani, Kanjivaram and more. Premium traditional sarees for every occasion.',
};

export default function SareesPage() {
  return (
    <CategoryPage
      title="Sarees"
      subtitle="Timeless elegance woven in silk, cotton & more"
      heroImage="https://images.unsplash.com/photo-1617627143233-89b9c1f87a7c?q=80&w=2000&auto=format&fit=crop"
      categories={['Sarees']}
      description="Our saree collection brings together the finest handwoven masterpieces from across India — from the opulent Banarasi silks of Varanasi, to the vibrant Bandhani from Gujarat. Each saree is a labor of love, woven by skilled artisans who have passed down their craft through generations. Dress for a wedding, festival, or a special evening, and let the fabric tell your story."
    />
  );
}
