// src/components/CategoryNav.jsx
import { FiHome, FiShield } from "react-icons/fi";
import CategoryTile from "./CategoryTile";

export default function CategoryNav() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
      <h2 className="text-2xl md:text-3xl font-bold text-[#493657] mb-6">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryTile
          title="Decorative Paints"
          subtitle="Walls, ceilings, trims — interior & exterior"
          to="/products?type=decorative"
          icon={FiHome}
          badges={[{label:"Interior Emulsions"},{label:"Exterior Acrylics"},{label:"Primers"}]}
        />
        <CategoryTile
          title="Industrial Coatings"
          subtitle="High-performance, technical finishes"
          to="/industrial"
          icon={FiShield}
          badges={[{label:"Epoxy Floor"},{label:"PU Topcoats"},{label:"Anti-Corrosive"}]}
        />
      </div>
    </section>
  );
}
