import DetailClient from '@/app/components/detail/DetailClient';
import getProducts from "@/app/actions/getProducts";


type DetailProps = {
    productId?: string;
};

const Detail = async({ params }: { params: DetailProps }) => {
    const { productId } = params;
    const products = await getProducts({ category: null });


    const product = products.find(product => product.id == productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <DetailClient product={product} />
        </div>
    );
};

export default Detail;
