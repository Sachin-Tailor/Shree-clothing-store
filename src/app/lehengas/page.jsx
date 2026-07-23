import CategoryPage from '@/components/CategoryPage';

export const metadata = {
  title: 'Lehengas — Shree A | Bridal & Festive Lehenga Choli',
  description: 'Discover our bridal and festive lehenga collection — handcrafted with intricate zari work, mirror embroidery, and rich fabrics for your special occasions.',
};

export default function LehengasPage() {
  return (
    <CategoryPage
      title="Lehengas"
      subtitle="Bridal dreams crafted with love & artistry"
      heroImage="https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=2000&auto=format&fit=crop"
      categories={['Lehengas']}
      description="A lehenga is more than clothing — it's an heirloom. Our bridal and festive lehenga collection is designed for women who want to make an unforgettable entrance. Featuring intricate zari embroidery, hand-set mirror work, and luxurious fabrics like raw silk, velvet, and georgette, each lehenga comes with a matching blouse and dupatta. Available in rich jewel tones and pastel shades."
    />
  );
}
