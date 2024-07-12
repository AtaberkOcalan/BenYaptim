"use client"

const brands = [
    { id: 1, name: "Brand A", image: "/images/brand-a.jpg", rating: 4.5 },
    { id: 2, name: "Brand B", image: "/images/brand-a.jpg", rating: 4.0 },
    { id: 3, name: "Brand C", image: "/images/brand-a.jpg", rating: 4.8 },
    { id: 4, name: "Brand D", image: "/images/brand-a.jpg", rating: 3.9 },
    { id: 5, name: "Brand E", image: "/images/brand-a.jpg", rating: 4.2 },
    { id: 6, name: "Brand F", image: "/images/brand-a.jpg", rating: 4.3 },
    { id: 7, name: "Brand G", image: "/images/brand-a.jpg", rating: 4.7 },
    { id: 8, name: "Brand H", image: "/images/brand-a.jpg", rating: 4.5 }, // Sadece 8 marka eklendi.
];

const BrandsLine = () => {
    const sortedBrands = brands.sort((a, b) => b.rating - a.rating);

    return (
        <div className="flex flex-col items-center p-4">
            <div className="fixed-width-container flex justify-center space-x-4">
                {sortedBrands.slice(0, 8).map((brand) => (
                    <div key={brand.id} className="flex-shrink-0 w-32 text-center">
                        <div className="w-16 h-16 mx-auto">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-full h-full object-cover rounded-full border border-gray-200"
                            />
                        </div>
                        <div className="mt-2 text-sm">{brand.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandsLine;
