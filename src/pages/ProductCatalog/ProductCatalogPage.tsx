import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleImageError, sanitizeImageUrl } from '../../utils/imageHelper';
import {
  Scale,
  Heart,
  FileText,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Plus,
  Minus,
  ShoppingCart,
  Download,
  BookOpen,
  X,
  Check,
  Laptop,
  Armchair,
  Fan,
  HardHat,
  Zap,
  Truck
} from 'lucide-react';
import { initialProducts } from '../../data/products';
import { Product, ProductCategory } from '../../types/product';
import { formatOMR } from '../../utils/currency';
import { StatusBadge } from '../../components/common/Badge';
import { useCartStore } from '../../store/useCartStore';
import { useCompareStore } from '../../store/useCompareStore';
import { useAppStore } from '../../store/useAppStore';
import { useRFQStore } from '../../store/useRFQStore';

export const ProductCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { showToast } = useAppStore();
  const addItemToCart = useCartStore(state => state.addItem);
  const { products: compareProducts, addProduct: addToCompare, isComparing } = useCompareStore();
  const addDraftItem = useRFQStore(state => state.addDraftItem);

  // Selected Category from URL or State
  const activeCategoryParam = searchParams.get('category') || 'All Products';
  const searchQueryParam = searchParams.get('search') || '';

  // Local Filter States
  const [activeCategory, setActiveCategory] = useState<string>(activeCategoryParam);
  const [searchWithin, setSearchWithin] = useState(searchQueryParam);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name'>('relevance');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // React to URL query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== activeCategory) {
      setActiveCategory(cat);
    }
    const q = searchParams.get('search');
    if (q !== null && q !== searchWithin) {
      setSearchWithin(q);
    }
  }, [searchParams]);

  // Filter Accordions & Values
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [selectedSupplierType, setSelectedSupplierType] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['prod-1']);

  // Selected Product for Right Panel Flyout (defaults to first product)
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProducts[0]);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState<number>(0);

  // Category navigation tabs
  const categoryTabs = [
    { name: 'All Products', count: initialProducts.length, icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'IT & Electronics', count: 6, icon: <Laptop className="w-4 h-4" /> },
    { name: 'Office & Furniture', count: 5, icon: <Armchair className="w-4 h-4" /> },
    { name: 'Facility Management', count: 5, icon: <Fan className="w-4 h-4" /> },
    { name: 'Safety & Security', count: 5, icon: <HardHat className="w-4 h-4" /> },
    { name: 'Industrial Equipment', count: 5, icon: <Zap className="w-4 h-4" /> },
    { name: 'Logistics & Transport', count: 5, icon: <Truck className="w-4 h-4" /> },
  ];

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // Category Tab Filter
      if (activeCategory !== 'All Products' && p.category !== activeCategory) {
        return false;
      }

      // Search Query
      if (searchWithin.trim()) {
        const q = searchWithin.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.supplierName.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Department checkbox filter
      if (selectedDepts.length > 0 && !selectedDepts.includes(p.category)) {
        return false;
      }

      // Availability filter
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(p.availability)) {
        return false;
      }

      // Price filter
      if (p.price > priceMax) {
        return false;
      }

      // Supplier type
      if (selectedSupplierType.includes('Oman Suppliers') && !p.isOmanSupplier) return false;
      if (selectedSupplierType.includes('International Suppliers') && p.isOmanSupplier) return false;

      // Certifications
      if (selectedCerts.length > 0) {
        const hasCert = selectedCerts.some(c => p.certifications.some(pc => pc.includes(c)));
        if (!hasCert) return false;
      }

      // Favorites
      if (favoritesOnly && !favoriteIds.includes(p.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // relevance
    });
  }, [
    activeCategory,
    searchWithin,
    selectedDepts,
    selectedAvailability,
    priceMax,
    selectedSupplierType,
    selectedCerts,
    favoritesOnly,
    favoriteIds,
    sortBy
  ]);

  const handleClearAll = () => {
    setActiveCategory('All Products');
    setSearchWithin('');
    setSelectedDepts([]);
    setSelectedAvailability([]);
    setPriceMax(5000);
    setSelectedSupplierType([]);
    setSelectedCerts([]);
    setFavoritesOnly(false);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    addItemToCart(product, quantity);
    showToast(`Added ${quantity}x "${product.name}" to Bulk Order Cart`, 'success');
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(favId => favId !== id));
      showToast('Removed from favorites', 'info');
    } else {
      setFavoriteIds([...favoriteIds, id]);
      showToast('Added to favorites', 'success');
    }
  };

  const handleCompareClick = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const result = addToCompare(product);
    if (result.success) {
      showToast(`Added ${product.name} to comparison`, 'success');
    } else {
      showToast(result.message || 'Could not add to comparison', 'warning');
    }
  };

  const handleRequestQuote = (product: Product) => {
    addDraftItem({
      productId: product.id,
      productName: product.name,
      category: product.category,
      estimatedUnitPrice: product.price,
      estimatedQuantity: 10
    });
    showToast(`Added ${product.name} to RFQ draft`, 'success');
    navigate('/rfq');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Product Catalog</h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore 120+ products across 6 core departments with detailed specifications and datasheets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/products/compare')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer"
          >
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Compare ({compareProducts.length})</span>
          </button>

          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border shadow-2xs cursor-pointer transition-colors ${
              favoritesOnly
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${favoritesOnly ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
            <span>Favorites {favoriteIds.length > 0 ? `(${favoriteIds.length})` : ''}</span>
          </button>

          <button
            onClick={() => navigate('/rfq')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Request Quote</span>
          </button>
        </div>
      </div>

      {/* Category Pills / Navigation Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setActiveCategory(cat.name);
              setSearchParams(cat.name === 'All Products' ? {} : { category: cat.name });
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeCategory === cat.name
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className={activeCategory === cat.name ? 'text-white' : 'text-slate-400'}>
              {cat.icon}
            </span>
            <span>{cat.name}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeCategory === cat.name ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3-Column Layout: Filters (col-span-3), Product List (col-span-5), Product Detail Panel (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Filters Column */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Filters</h3>
            <button
              onClick={handleClearAll}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Search within results */}
          <div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search within results..."
                value={searchWithin}
                onChange={(e) => setSearchWithin(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Department</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {[
                { name: 'IT & Electronics', count: 20 },
                { name: 'Office & Furniture', count: 20 },
                { name: 'Facility Management', count: 20 },
                { name: 'Safety & Security', count: 20 },
                { name: 'Industrial Equipment', count: 20 },
                { name: 'Logistics & Transport', count: 20 },
              ].map(dept => (
                <label key={dept.name} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedDepts.includes(dept.name)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedDepts([...selectedDepts, dept.name]);
                        else setSelectedDepts(selectedDepts.filter(d => d !== dept.name));
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300"
                    />
                    <span>{dept.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">({dept.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Availability</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {[
                { name: 'In Stock', count: 68 },
                { name: 'On Order', count: 32 },
                { name: 'Lead Time > 30 days', count: 20 },
              ].map(avail => (
                <label key={avail.name} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes(avail.name)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedAvailability([...selectedAvailability, avail.name]);
                        else setSelectedAvailability(selectedAvailability.filter(a => a !== avail.name));
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300"
                    />
                    <span>{avail.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">({avail.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Price Range (OMR)</span>
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex items-center justify-between text-xs gap-2">
              <input
                type="number"
                value="0"
                readOnly
                className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center text-slate-600"
              />
              <span className="text-slate-400">to</span>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-white border border-slate-200 rounded text-center font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Supplier Origin */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Supplier</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {[
                { name: 'Oman Suppliers', count: 45 },
                { name: 'International Suppliers', count: 60 }
              ].map(sup => (
                <label key={sup.name} className="flex items-center justify-between cursor-pointer hover:text-slate-900">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSupplierType.includes(sup.name)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedSupplierType([...selectedSupplierType, sup.name]);
                        else setSelectedSupplierType(selectedSupplierType.filter(s => s !== sup.name));
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300"
                    />
                    <span>{sup.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">({sup.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Certifications</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {[
                'Omani Standard (OS)',
                'ISO Certified',
                'CE Marked',
                'Other'
              ].map(cert => (
                <label key={cert} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedCerts.includes(cert)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedCerts([...selectedCerts, cert]);
                      else setSelectedCerts(selectedCerts.filter(c => c !== cert));
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300"
                  />
                  <span>{cert}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Product List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Header with count, sort, view toggle */}
          <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-bold text-slate-800">
              {filteredProducts.length} Products
            </span>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Product Name</option>
                </select>
              </div>

              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 text-xs ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 text-xs ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Items */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-400 text-xs">
                No products match the selected filters.
                <div className="mt-3">
                  <button onClick={handleClearAll} className="text-blue-600 font-semibold underline">Reset filters</button>
                </div>
              </div>
            ) : (
              filteredProducts.map((p) => {
                const isSelected = selectedProduct.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setActiveThumbnailIndex(0);
                    }}
                    className={`bg-white rounded-xl border p-3 sm:p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 shadow-md ring-1 ring-blue-600/30'
                        : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox indicator */}
                      <div className="mt-1 shrink-0">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      {/* Thumbnail Image */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={sanitizeImageUrl(p.image)}
                          alt={p.name}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 line-clamp-1">
                              {p.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {p.description}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs sm:text-sm font-black text-slate-900">
                              {formatOMR(p.price)}
                            </div>
                            <span className="text-[9px] text-slate-400 block">(Excl. VAT)</span>
                          </div>
                        </div>

                        {/* Badges & Supplier info */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {p.category}
                          </span>
                          <StatusBadge status={p.availability} size="sm" />
                          {p.certifications.some(c => c.includes('OS')) && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                              OS Approved
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Product Detail Panel Flyout */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm sticky top-20 overflow-hidden">
          {/* Main Large Image & Gallery */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 relative">
            <div className="w-full h-52 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center relative">
              <img
                src={sanitizeImageUrl(selectedProduct.thumbnails?.[activeThumbnailIndex] || selectedProduct.image)}
                alt={selectedProduct.name}
                onError={handleImageError}
                className="w-full h-full object-contain p-2"
              />

              <button
                onClick={(e) => handleToggleFavorite(selectedProduct.id, e)}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 shadow-sm hover:bg-white text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${favoriteIds.includes(selectedProduct.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            {selectedProduct.thumbnails && selectedProduct.thumbnails.length > 1 && (
              <div className="flex items-center gap-2 mt-2.5">
                {selectedProduct.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumbnailIndex(idx)}
                    className={`w-12 h-12 rounded-lg border overflow-hidden bg-white cursor-pointer ${
                      activeThumbnailIndex === idx ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img
                      src={sanitizeImageUrl(thumb)}
                      alt="thumb"
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Content */}
          <div className="p-5 space-y-4 max-h-[calc(100vh-26rem)] overflow-y-auto">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h3>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedProduct.category}
                </span>
                <StatusBadge status={selectedProduct.availability} size="sm" />
                {selectedProduct.certifications.some(c => c.includes('OS')) && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    OS Approved
                  </span>
                )}
              </div>
            </div>

            {/* Price block */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Unit Price (Gov Rate)</span>
                <span className="text-lg font-black text-slate-900">
                  {formatOMR(selectedProduct.price)}
                </span>
                <span className="text-[10px] text-slate-400 block">Excl. 5% VAT</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Supplier</span>
                <span className="text-xs font-bold text-slate-800 block">{selectedProduct.supplierName}</span>
                <span className="text-[10px] text-emerald-600 font-medium">Verified Supplier</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Description</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Key Specifications Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">Key Specifications</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(selectedProduct.specs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between px-3 py-1.5 bg-white">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="text-slate-800 font-semibold text-right max-w-[55%] truncate">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Datasheet & Action links */}
            <div className="space-y-1.5 pt-1 text-xs">
              <button
                onClick={() => showToast('Downloading official technical datasheet (PDF)...', 'info')}
                className="w-full flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-rose-600" />
                  <span>Download Datasheet</span>
                </span>
                <span className="text-[10px] text-slate-400">PDF • 1.8 MB</span>
              </button>

              <button
                onClick={() => showToast('Opening compliance manual...', 'info')}
                className="w-full flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>View User Manual</span>
                </span>
                <span className="text-[10px] text-slate-400">Web Viewer</span>
              </button>

              <button
                onClick={() => handleCompareClick(selectedProduct)}
                className="w-full flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isComparing(selectedProduct.id) ? 'In Comparison List' : 'Add to Compare'}</span>
                </span>
                <span className="text-[10px] text-blue-600 font-semibold">Max 3</span>
              </button>
            </div>
          </div>

          {/* Bottom Sticky Action Buttons */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-300 rounded-lg bg-white">
              <button
                onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-l-lg cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <input
                type="number"
                min="1"
                value={detailQuantity}
                onChange={(e) => setDetailQuantity(Math.max(1, Number(e.target.value)))}
                className="w-10 text-center text-xs font-bold text-slate-900 focus:outline-none"
              />
              <button
                onClick={() => setDetailQuantity(detailQuantity + 1)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-r-lg cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => handleAddToCart(selectedProduct, detailQuantity)}
              className="flex-1 py-2 px-3 rounded-lg border border-blue-600 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            {/* Request Quote */}
            <button
              onClick={() => handleRequestQuote(selectedProduct)}
              className="py-2 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
