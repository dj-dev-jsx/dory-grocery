import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { getProduct } from "../data/products";
import { getCategory } from "../data/categories";
import { getProductsForStore, getStoresForCategory, storeCarriesCategory } from "../data/stores";
import { ProductImage } from "../components/ProductImage";
import { StarRating } from "../components/StarRating";
import { QuantitySelector } from "../components/QuantitySelector";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(Number(id));
  const { getQuantity, setQuantity } = useCart();
  const { store, requestAddToCart } = useStore();
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-700">Product not found</p>
        <Button className="mt-4" onClick={() => navigate("/products")}>
          Back to shop
        </Button>
      </div>
    );
  }

  const cartQuantity = getQuantity(product.id);
  const category = getCategory(product.category);
  const isAvailable = store ? storeCarriesCategory(store, product.category) : true;
  const related = getProductsForStore(store?.id ?? null)
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = (qty: number) => {
    requestAddToCart(product, qty);
  };

  return (
    <div className="pb-36 md:pb-12">
      <div className="mx-auto max-w-5xl px-4 pt-4 md:px-6 md:pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <ProductImage product={product} size="lg" className="aspect-square w-full" />

          <div>
            <div className="flex items-center justify-between gap-2">
              {category && (
                <span className="text-xs font-semibold uppercase tracking-wide text-fresh-700">{category.name}</span>
              )}
              {store ? (
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${store.color}`} /> {store.name}
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  Available at {getStoresForCategory(product.category).length} stores
                </span>
              )}
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">{product.name}</h1>
            <p className="mt-1 text-sm text-slate-400">{product.unit}</p>

            <div className="mt-2">
              <StarRating rating={product.rating} reviews={product.reviews} size={16} />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.isDeal && (
                <span className="rounded-full bg-fresh-50 px-2 py-0.5 text-xs font-semibold text-fresh-700">Deal</span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>

            <div className="mt-5 flex flex-col gap-2 rounded-xl bg-fresh-50 p-3 text-xs text-fresh-700">
              <div className="flex items-center gap-2">
                <Truck size={14} /> Delivered fresh, as fast as 60 minutes
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} /> 100% freshness guarantee or your money back
              </div>
            </div>

            {/* Desktop add-to-cart */}
            {isAvailable ? (
              <div className="mt-6 hidden items-center gap-4 md:flex">
                {cartQuantity > 0 ? (
                  <>
                    <QuantitySelector quantity={cartQuantity} onChange={(q) => setQuantity(product.id, q)} removeAtMin />
                    <span className="text-sm text-slate-500">in your cart</span>
                  </>
                ) : (
                  <>
                    <QuantitySelector quantity={selectedQty} onChange={(q) => setSelectedQty(Math.max(1, q))} min={1} />
                    <Button size="lg" onClick={() => handleAddToCart(selectedQty)}>
                      Add to Cart · {formatPrice(product.price * selectedQty)}
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="mt-6 hidden rounded-xl bg-amber-50 p-3 text-sm text-amber-700 md:block">
                Not carried by {store?.name}.{" "}
                <button onClick={() => navigate("/stores")} className="font-semibold underline">
                  Switch stores
                </button>{" "}
                to buy this item.
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-slate-900">You might also like</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky add-to-cart */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-100 bg-white/95 p-3 backdrop-blur md:hidden">
        {!isAvailable ? (
          <div className="rounded-xl bg-amber-50 p-3 text-center text-xs text-amber-700">
            Not carried by {store?.name}.{" "}
            <button onClick={() => navigate("/stores")} className="font-semibold underline">
              Switch stores
            </button>
          </div>
        ) : cartQuantity > 0 ? (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">In your cart</span>
            <QuantitySelector quantity={cartQuantity} onChange={(q) => setQuantity(product.id, q)} removeAtMin />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <QuantitySelector quantity={selectedQty} onChange={(q) => setSelectedQty(Math.max(1, q))} min={1} />
            <Button fullWidth onClick={() => handleAddToCart(selectedQty)}>
              Add to Cart · {formatPrice(product.price * selectedQty)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
