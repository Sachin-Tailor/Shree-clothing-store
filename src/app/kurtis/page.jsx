import CategoryPage from '@/components/CategoryPage';

export const metadata = {
  title: 'Kurtis — Shree A | Premium Embroidered & Block Print Kurtis',
  description: 'Shop our collection of handcrafted kurtis — embroidered linen, block print cotton, and festive kurtis for every occasion.',
};

export default function KurtisPage() {
  return (
    <CategoryPage
      title="Kurtis"
      subtitle="Everyday elegance, handcrafted for the modern woman"
      heroImage="https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?q=80&w=2000&auto=format&fit=crop"
      categories={['Kurtis']}
      description="From breezy cotton kurtis for casual days to intricately embroidered pieces for festive evenings — our kurti collection has something for every occasion. Each piece is crafted with premium fabrics like linen, cotton, and georgette, and features hand-done embroidery, block prints, and mirror work. Pair them with leggings, palazzos, or jeans for effortlessly chic looks."
    />
  );
}
