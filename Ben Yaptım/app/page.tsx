import { getCurrentUser } from "./actions/getCurrentUser";
import BrandsLine from "./components/home/BrandsLine";
import Products from "./components/home/viewProducts";
import getProducts from "@/app/actions/getProducts";

export default async function Home() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser()

  return (
    <div>
      <BrandsLine/>
      <Products products={products} currentUser = {currentUser}/>
    </div>
  );
}
