import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Modal, Image, Platform, Alert } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { 
  useCart, 
  useMenuData, 
  useLocationsData,
  formatPrice, 
  Product 
} from '@lumina/core';
import { 
  FoodHero, 
  CategoryCards, 
  MenuCard, 
  CustomizerModal, 
  tokens,
  Navbar
} from '@lumina/ui';

export default function App() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    totalItems, 
    totalPrice 
  } = useCart();
  
  const { getProductsByCategory } = useMenuData();
  const { locations } = useLocationsData();

  const [activeCategory, setActiveCategory] = useState<'burgers' | 'pizza' | 'sides' | 'drinks' | 'pasta'>('burgers');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Locations State Variables
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState<any>(locations[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingGuests, setBookingGuests] = useState('2');
  const [bookingDate, setBookingDate] = useState('2026-05-20');
  const [bookingTime, setBookingTime] = useState('19:00');
  const [bookingTier, setBookingTier] = useState('VIP Vance Chamber');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [resId, setResId] = useState('');

  // VIP Savor Patron Hub States
  const [isVipHubOpen, setIsVipHubOpen] = useState(false);
  const [vipTab, setVipTab] = useState<'profile' | 'offers' | 'catering' | 'tracking'>('profile');
  
  // Mobile Catering Calculator states
  const [catGuests, setCatGuests] = useState(50);
  const [catGold, setCatGold] = useState(true);
  const [catTruffle, setCatTruffle] = useState(true);
  const [catSommelier, setCatSommelier] = useState(false);
  const [catSuccess, setCatSuccess] = useState(false);
  const [catProposalCode, setCatProposalCode] = useState('');
  
  // Drone simulation states
  const [droneAlt, setDroneAlt] = useState(120);
  const [droneKnots, setDroneKnots] = useState(45);
  const [droneBattery, setDroneBattery] = useState(84);
  const [droneLat, setDroneLat] = useState('34.0736° N');
  const [droneLng, setDroneLng] = useState('118.4004° W');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDroneKnots(prev => Math.min(52, Math.max(38, prev + (Math.random() > 0.5 ? 1 : -1))));
      setDroneAlt(prev => Math.min(135, Math.max(115, prev + (Math.random() > 0.5 ? 2 : -2))));
      setDroneBattery(prev => Math.max(12, prev - 1));
      
      const newLat = (34.0736 + (Math.random() * 0.0005)).toFixed(4);
      const newLng = (118.4004 - (Math.random() * 0.0005)).toFixed(4);
      setDroneLat(newLat + '° N');
      setDroneLng(newLng + '° W');
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeProducts = getProductsByCategory(activeCategory);

  const handleOpenCustomizer = (product: Product) => {
    setSelectedProduct(product);
    setIsCustomizerOpen(true);
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    clearCart();
    setIsCartOpen(false);
  };

  const handleOpenBooking = (loc: any) => {
    setSelectedLoc(loc);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    // Generate luxury reservation ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'LMN-';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setResId(result);
    setBookingSuccess(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingSuccess(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" />

      {/* 1. Header Nav bar */}
      <Navbar 
        totalItems={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onLocationsClick={() => setIsLocationsOpen(true)}
        onVipHubClick={() => setIsVipHubOpen(true)}
        onOrderNowClick={() => {
          // On mobile, "Order Now" closes any modal/drawers and prompts selection
          // Tapping it alerts or performs an action
          Alert.alert("Lumina Order Now", "Select your gourmet categories below to begin crafting your luxury customized order!");
        }}
      />

      {/* 2. Scrollable Body */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollBody}
      >
        {/* Cinematic Native FoodHero */}
        <FoodHero 
          onExploreMenu={() => {}}
          onOurStory={() => alert("Welcome to Lumina Foods. Elevated Dining.")}
        />

        {/* Categories Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTag}>Crafted Selections</Text>
          <Text style={styles.sectionTitle}>EXPLORE OUR MENU</Text>
          <View style={styles.divider} />
        </View>

        {/* Horizontal Category Cards Bar */}
        <CategoryCards 
          activeCategory={activeCategory} 
          onSelectCategory={(id) => setActiveCategory(id as any)} 
        />

        {/* Menu Cards List */}
        <View style={styles.menuGrid}>
          {activeProducts.map((product) => {
            const currentQty = cart
              .filter(item => item.productId === product.id)
              .reduce((sum, item) => sum + item.quantity, 0);

            return (
              <MenuCard 
                key={product.id}
                product={product}
                quantity={currentQty}
                onIncrement={() => handleOpenCustomizer(product)}
                onDecrement={() => {
                  const cartItem = cart.find(item => item.productId === product.id);
                  if (cartItem) {
                    updateQuantity(cartItem.id, cartItem.quantity - 1);
                  }
                }}
                onCustomize={() => handleOpenCustomizer(product)}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* 3. Customizer Modal Overlay */}
      <CustomizerModal 
        product={selectedProduct}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={(customizedItem) => {
          addToCart(customizedItem);
          setIsCartOpen(true);
        }}
      />

      {/* 4. Cart Fullscreen Modal */}
      <Modal
        visible={isCartOpen}
        animationType="slide"
        onRequestClose={() => setIsCartOpen(false)}
      >
        <SafeAreaView style={styles.cartModalContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartHeaderTitle}>Your Bag</Text>
            <TouchableOpacity 
              onPress={() => setIsCartOpen(false)}
              style={styles.cartCloseBtn}
            >
              <Text style={styles.cartCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.cartItemsList}>
            {cart.length === 0 ? (
              <View style={styles.emptyCartContainer}>
                <Text style={styles.emptyCartIcon}>🛍️</Text>
                <Text style={styles.emptyCartText}>Your bag is empty.</Text>
                <Text style={styles.emptyCartSub}>Add premium options from the menu to start.</Text>
              </View>
            ) : (
              cart.map((item) => (
                <View key={item.id} style={styles.cartItemRow}>
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.cartItemImg}
                    resizeMode="cover"
                  />
                  <View style={styles.cartItemInfo}>
                    <View style={styles.cartItemHeader}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <Text style={styles.cartItemDelete}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {item.customizations && (
                      <View style={styles.cartItemDetails}>
                        <Text style={styles.cartItemDetailsText}>• {item.customizations.bun?.name}</Text>
                        <Text style={styles.cartItemDetailsText}>• {item.customizations.patty?.name}</Text>
                        {item.customizations.toppings.length > 0 && (
                          <Text style={styles.cartItemDetailsText}>• Extra: {item.customizations.toppings.map(t => t.name).join(', ')}</Text>
                        )}
                        {item.customizations.sauces.length > 0 && (
                          <Text style={styles.cartItemDetailsText}>• Sauce: {item.customizations.sauces.map(s => s.name).join(', ')}</Text>
                        )}
                      </View>
                    )}

                    <View style={styles.cartItemFooter}>
                      <Text style={styles.cartItemPrice}>{formatPrice(item.price * item.quantity)}</Text>
                      <View style={styles.cartItemCounter}>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          style={styles.cartItemCounterBtn}
                        >
                          <Text style={styles.cartItemCounterText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.cartItemCounterValue}>{item.quantity}</Text>
                        <TouchableOpacity 
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          style={styles.cartItemCounterBtnPlus}
                        >
                          <Text style={styles.cartItemCounterTextPlus}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          {/* Cart Drawer Checkout Block */}
          <View style={styles.cartFooter}>
            <View style={styles.cartSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatPrice(totalPrice)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Luxury Delivery</Text>
                <Text style={styles.summaryValueFree}>FREE</Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>{formatPrice(totalPrice)}</Text>
              </View>
            </View>

            <TouchableOpacity 
              disabled={cart.length === 0}
              onPress={handleCheckout}
              style={[styles.checkoutButton, cart.length === 0 && styles.disabledBtn]}
            >
              <Text style={styles.checkoutBtnLabel}>Checkout Now</Text>
              <Text style={styles.checkoutBtnPrice}>→</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* 5. Checkout Success Modal */}
      <Modal
        visible={checkoutSuccess}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successBackdrop}>
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>ORDER PLACED!</Text>
            <Text style={styles.successDesc}>
              Your premium selections are now being prepared by our executive kitchen. Watch for a live delivery tracking message.
            </Text>
            <TouchableOpacity 
              onPress={() => {
                setCheckoutSuccess(false);
                setVipTab('tracking');
                setIsVipHubOpen(true);
              }}
              style={styles.successBtn}
            >
              <Text style={styles.successBtnText}>Track Drone Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setCheckoutSuccess(false)}
              style={[styles.successBtn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginTop: 8 }]}
            >
              <Text style={[styles.successBtnText, { color: '#ffffff' }]}>Back to Dining</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 6. Mobile Locations Modal */}
      <Modal
        visible={isLocationsOpen}
        animationType="slide"
        onRequestClose={() => setIsLocationsOpen(false)}
      >
        <SafeAreaView style={styles.cartModalContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartHeaderTitle}>Dining Vaults</Text>
            <TouchableOpacity 
              onPress={() => setIsLocationsOpen(false)}
              style={styles.cartCloseBtn}
            >
              <Text style={styles.cartCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.cartItemsList}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, color: '#e0c0af', opacity: 0.8, lineHeight: 18 }}>
                Experience bespoke gastronomy vaults fitted with luxury lounge capsules, private dining grids, and premium sommelier mappings.
              </Text>
            </View>

            {locations.map((loc) => (
              <View key={loc.id} style={[styles.cartItemRow, { flexDirection: 'column', padding: 20 }]}>
                {/* Image and Title Header */}
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                  <Image 
                    source={{ uri: loc.image }} 
                    style={{ width: 64, height: 64, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 16, fontWeight: '800', color: '#ffffff' }}>
                      {loc.name}
                    </Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffb68b', marginTop: 2 }}>
                      🕒 {loc.hours}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(224, 192, 175, 0.75)', lineHeight: 16, marginBottom: 12 }}>
                  {loc.description}
                </Text>

                {/* Address */}
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff', opacity: 0.6, marginBottom: 12 }}>
                  📍 {loc.address}
                </Text>

                {/* Occupancy bar */}
                <View style={{ marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                      Seating Density
                    </Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>
                      {loc.seatingDensity}
                    </Text>
                  </View>
                  <View style={{ height: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.02)' }}>
                    <View style={{ height: '100%', width: `${loc.densityValue}%`, backgroundColor: '#ff7a00', borderRadius: 2 }} />
                  </View>
                </View>

                {/* Action Row */}
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TouchableOpacity 
                    onPress={() => alert(`Dialing luxury vault callback at ${loc.phone}...`)}
                    style={{ flex: 1, height: 38, borderRadius: 19, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}
                  >
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '700', color: '#e0c0af' }}>
                      Call Vault
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleOpenBooking(loc)}
                    style={{ flex: 1, height: 38, borderRadius: 19, backgroundColor: '#ff7a00', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '800', color: '#522300' }}>
                      Book Table
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* 7. Mobile Table Booking Modal */}
      <Modal
        visible={isBookingOpen}
        animationType="slide"
        onRequestClose={closeBookingModal}
      >
        <SafeAreaView style={styles.cartModalContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartHeaderTitle}>Reserve Table</Text>
            <TouchableOpacity 
              onPress={closeBookingModal}
              style={styles.cartCloseBtn}
            >
              <Text style={styles.cartCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          {bookingSuccess ? (
            // Mobile Booking Confirmation Card
            <View style={{ flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successTitle}>RESERVATION SECURED!</Text>
              <Text style={styles.successDesc}>
                A bespoke table has been assigned for you at {selectedLoc?.name}. Show this matrix receipt upon arrival.
              </Text>

              <View style={{ width: '100%', padding: 20, backgroundColor: 'rgba(28, 27, 27, 0.6)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)', borderRadius: tokens.rounded['2xl'], marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>RECEIPT ID:</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffb68b', fontWeight: 'bold' }}>{resId}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>PATRONS:</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff', fontWeight: 'bold' }}>{bookingGuests} Guests</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>DATE &amp; TIME:</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff', fontWeight: 'bold' }}>{bookingDate} @ {bookingTime}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>DINING ROOM:</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffb68b', fontWeight: 'bold' }}>{bookingTier}</Text>
                </View>
              </View>

              <TouchableOpacity 
                onPress={closeBookingModal}
                style={[styles.successBtn, { width: '100%' }]}
              >
                <Text style={styles.successBtnText}>Receive Access Pass</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Mobile Booking Input Form
            <ScrollView contentContainerStyle={{ padding: 24 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 18, fontWeight: '900', color: '#ffffff' }}>
                  Dining Capsule Setup
                </Text>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(224, 192, 175, 0.6)', marginTop: 4 }}>
                  Vault Location: {selectedLoc?.name}
                </Text>
              </View>

              {/* Patrons Selector */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '700', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase' }}>
                  Patrons Count
                </Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {['2', '4', '6'].map(num => (
                    <TouchableOpacity 
                      key={num}
                      onPress={() => setBookingGuests(num)}
                      style={{ flex: 1, height: 40, borderRadius: 8, borderWidth: 1, borderColor: bookingGuests === num ? '#ffb68b' : 'rgba(255,255,255,0.1)', backgroundColor: bookingGuests === num ? 'rgba(255, 182, 139, 0.05)' : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, color: bookingGuests === num ? '#ffffff' : 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>
                        {num} Patrons
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Room Tier Selector */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '700', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase' }}>
                  VIP Lounge Tier
                </Text>
                {['VIP Vance Chamber', 'Imperial Lounge', 'Charcoal Room'].map(tier => (
                  <TouchableOpacity 
                    key={tier}
                    onPress={() => setBookingTier(tier)}
                    style={{ height: 44, borderRadius: 8, borderWidth: 1, borderColor: bookingTier === tier ? '#ffb68b' : 'rgba(255,255,255,0.1)', backgroundColor: bookingTier === tier ? 'rgba(255, 182, 139, 0.05)' : 'transparent', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 16, flexDirection: 'row', marginBottom: 8 }}
                  >
                    <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: bookingTier === tier ? '#ff7a00' : 'rgba(255,255,255,0.3)', marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                      {bookingTier === tier && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#ff7a00' }} />}
                    </View>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, color: bookingTier === tier ? '#ffffff' : 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                      {tier}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Date Input */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '700', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase' }}>
                  Reservation Date
                </Text>
                <View style={{ height: 44, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', justifyContent: 'center', paddingHorizontal: 16 }}>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, color: '#ffffff' }}>
                    {bookingDate} (Wednesday Pairing Night)
                  </Text>
                </View>
              </View>

              {/* Time slot Input */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '700', color: '#ffffff', marginBottom: 8, textTransform: 'uppercase' }}>
                  Dining Time Slots
                </Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {['18:00', '19:30', '21:00'].map(time => (
                    <TouchableOpacity 
                      key={time}
                      onPress={() => setBookingTime(time)}
                      style={{ flex: 1, height: 40, borderRadius: 8, borderWidth: 1, borderColor: bookingTime === time ? '#ffb68b' : 'rgba(255,255,255,0.1)', backgroundColor: bookingTime === time ? 'rgba(255, 182, 139, 0.05)' : 'transparent', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, color: bookingTime === time ? '#ffffff' : 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>
                        {time} PM
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Submit / Cancel Buttons */}
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity 
                  onPress={closeBookingModal}
                  style={{ flex: 1, height: 44, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, fontWeight: '700', color: '#ffffff' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleConfirmBooking}
                  style={{ flex: 1, height: 44, borderRadius: 22, backgroundColor: '#ff7a00', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 12, fontWeight: '800', color: '#522300' }}>
                    Book Table
                  </Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          )}

        </SafeAreaView>
      </Modal>

      {/* 8. VIP Patron Hub Modal */}
      <Modal
        visible={isVipHubOpen}
        animationType="slide"
        onRequestClose={() => setIsVipHubOpen(false)}
      >
        <SafeAreaView style={styles.cartModalContainer}>
          {/* Header */}
          <View style={styles.cartHeader}>
            <Text style={styles.cartHeaderTitle}>VIP Savor Hub</Text>
            <TouchableOpacity 
              onPress={() => setIsVipHubOpen(false)}
              style={styles.cartCloseBtn}
            >
              <Text style={styles.cartCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Patron Savor Pass Segment */}
          <View style={{ padding: 20, backgroundColor: 'rgba(255, 122, 0, 0.04)', borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View>
                <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 16, fontWeight: '800', color: '#ffffff' }}>JULIAN VANCE</Text>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold', textTransform: 'uppercase' }}>Obsidian VIP Member</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(255, 182, 139, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}>
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>4,850 PTS</Text>
              </View>
            </View>
            <View style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
              <View style={{ height: '100%', width: '97%', backgroundColor: '#ffb68b' }} />
            </View>
            <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 8, color: 'rgba(224, 192, 175, 0.5)', marginTop: 6, textAlign: 'right' }}>
              150 PTS REMAINING FOR IMPERIAL EMPEROR
            </Text>
          </View>

          {/* Sub-Tab Navigation Bar */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
            {(['profile', 'offers', 'catering', 'tracking'] as const).map(tab => (
              <TouchableOpacity 
                key={tab}
                onPress={() => setVipTab(tab)}
                style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: vipTab === tab ? 2 : 0, borderColor: '#ff7a00' }}
              >
                <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 9, fontWeight: 'bold', color: vipTab === tab ? '#ffb68b' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {tab === 'profile' ? '👤 Profile' : tab === 'offers' ? '🎁 Offers' : tab === 'catering' ? '🍽️ Event' : '✈️ Drone'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Contents */}
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {vipTab === 'profile' && (
              <View style={{ gap: 20 }}>
                <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 14, fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>Active Reserved Chambers</Text>
                
                {/* Active Bookings list */}
                <View style={[styles.cartItemRow, { flexDirection: 'column', padding: 16 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 13, fontWeight: '700', color: '#ffffff' }}>Beverly Hills Vault Lounge</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 9, color: '#ffb68b', fontWeight: 'bold' }}>LMN-H192K3</Text>
                  </View>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: 'rgba(224, 192, 175, 0.8)', marginBottom: 8 }}>Julian Vance VIP Chamber</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>📅 May 20, 2026 @ 07:30 PM • 2 Guests</Text>
                </View>

                {/* Benefits Perks list */}
                <View style={{ padding: 20, backgroundColor: 'rgba(255, 122, 0, 0.02)', borderStyle: 'dashed', borderWidth: 1, borderColor: 'rgba(255, 122, 0, 0.2)', borderRadius: tokens.rounded.xl }}>
                  <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 12, fontWeight: '700', color: '#ffffff', marginBottom: 10, textTransform: 'uppercase' }}>Obsidian Tier Privileges</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(224, 192, 175, 0.75)', lineHeight: 16 }}>• Unlimited complimentary 24K gold flaking on burgers.</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(224, 192, 175, 0.75)', lineHeight: 16 }}>• Zero table-booking premium surcharge fees.</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(224, 192, 175, 0.75)', lineHeight: 16 }}>• High-altitude priority drone dispatch routing.</Text>
                </View>
              </View>
            )}

            {vipTab === 'offers' && (
              <View style={{ gap: 16 }}>
                <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 14, fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>Bespoke Vouchers</Text>
                
                {/* Offer 1 */}
                <View style={[styles.cartItemRow, { flexDirection: 'column', padding: 16 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 13, fontWeight: '700', color: '#ffffff' }}>Obsidian 24K Gold Flakes</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 8, color: '#ffb68b', fontWeight: 'bold' }}>VIP EXCLUSIVE</Text>
                  </View>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(224, 192, 175, 0.75)', marginBottom: 12 }}>Complimentary organic gold leaf dusting on Wagyu patties.</Text>
                  <TouchableOpacity 
                    onPress={() => alert("Copied voucher code: OBSIDIANGOLD")}
                    style={{ height: 32, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>COPY CODE: OBSIDIANGOLD</Text>
                  </TouchableOpacity>
                </View>

                {/* Offer 2 */}
                <View style={[styles.cartItemRow, { flexDirection: 'column', padding: 16 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 13, fontWeight: '700', color: '#ffffff' }}>Sommelier Botanical Pair</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 8, color: '#ffb68b', fontWeight: 'bold' }}>GOLD+ BENEFIT</Text>
                  </View>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(224, 192, 175, 0.75)', marginBottom: 12 }}>Complimentary elderflower flower elixir with wood truffle pizzas.</Text>
                  <TouchableOpacity 
                    onPress={() => alert("Copied voucher code: BOTANICALS")}
                    style={{ height: 32, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>COPY CODE: BOTANICALS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {vipTab === 'catering' && (
              <View style={{ gap: 20 }}>
                <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 14, fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>Gastronomy Proposal Planner</Text>
                
                {catSuccess ? (
                  <View style={{ padding: 16, backgroundColor: 'rgba(16, 185, 129, 0.05)', borderStyle: 'dashed', borderWidth: 1, borderColor: 'rgb(16, 185, 129)', borderRadius: 16, alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 24, color: '#ffffff' }}>✓</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 13, fontWeight: '800', color: '#ffffff' }}>PROPOSAL LOCK SUCCESSFUL</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(224, 192, 175, 0.8)', textAlign: 'center', lineHeight: 15 }}>
                      Draft proposal registered under code <Text style={{ color: '#ffb68b', fontWeight: 'bold' }}>{catProposalCode}</Text> for {catGuests} patrons. An elite culinary architect will coordinate details.
                    </Text>
                    <TouchableOpacity 
                      onPress={() => setCatSuccess(false)}
                      style={{ marginTop: 10, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 9, color: '#ffffff', fontWeight: 'bold' }}>Modify Planner</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ gap: 16 }}>
                    {/* Guest selectors */}
                    <View>
                      <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Expected Patrons</Text>
                      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                        <TouchableOpacity 
                          onPress={() => setCatGuests(prev => Math.max(10, prev - 10))}
                          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ flex: 1, fontFamily: tokens.fontFamily.display, fontSize: 14, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>{catGuests} Patrons</Text>
                        <TouchableOpacity 
                          onPress={() => setCatGuests(prev => Math.min(300, prev + 10))}
                          style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Add-ons checkboxes */}
                    <View style={{ gap: 10 }}>
                      <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 2 }}>Gastronomic Add-ons</Text>
                      
                      <TouchableOpacity 
                        onPress={() => setCatGold(!catGold)}
                        style={{ height: 44, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: catGold ? 'rgba(255,122,0,0.04)' : 'transparent' }}
                      >
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff' }}>✨ 24K Gold Flake Dusting</Text>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>{catGold ? 'ADDED' : 'ADD'}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        onPress={() => setCatTruffle(!catTruffle)}
                        style={{ height: 44, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: catTruffle ? 'rgba(255,122,0,0.04)' : 'transparent' }}
                      >
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff' }}>🍄 Truffle Honey Infusions</Text>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>{catTruffle ? 'ADDED' : 'ADD'}</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Proposal Est calculation */}
                    <View style={{ padding: 16, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Base Sovereign Banquet:</Text>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff', fontWeight: 'bold' }}>${(catGuests * 185).toLocaleString()}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Luxury Add-ons Total:</Text>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff', fontWeight: 'bold' }}>${( (catGold ? 25 : 0) * catGuests + (catTruffle ? 30 : 0) * catGuests ).toLocaleString()}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.05)', paddingTop: 6 }}>
                        <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b', fontWeight: 'bold' }}>Est. Proposal Price:</Text>
                        <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 14, color: '#ffb955', fontWeight: '900' }}>
                          ${(catGuests * 185 + (catGold ? 25 : 0) * catGuests + (catTruffle ? 30 : 0) * catGuests).toLocaleString()}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity 
                      onPress={() => {
                        const code = 'PROP-' + Math.floor(100000 + Math.random() * 900000);
                        setCatProposalCode(code);
                        setCatSuccess(true);
                      }}
                      style={{ height: 44, borderRadius: 22, backgroundColor: '#ff7a00', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}
                    >
                      <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, fontWeight: '800', color: '#522300', textTransform: 'uppercase' }}>Generate Proposal</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {vipTab === 'tracking' && (
              <View style={{ gap: 20 }}>
                <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 14, fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>Drone Satellite HUD</Text>
                
                {/* Active HUD Cockpit */}
                <View style={{ height: 160, borderRadius: 16, backgroundColor: '#000000', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 9, color: 'rgba(16, 185, 129, 0.7)', position: 'absolute', top: 12, left: 12, fontWeight: 'bold' }}>HUD SIGNAL: ACTIVE</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 8, color: 'rgba(255, 122, 0, 0.6)', position: 'absolute', top: 12, right: 12 }}>LOCK: 11 SAT</Text>
                  
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 24 }}>✈️</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 11, color: '#ffffff', fontWeight: 'bold' }}>LUMINA SATELLITE ALTITUDE</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 18, color: '#ffb68b', fontWeight: '900' }}>{droneAlt} FEET</Text>
                  </View>

                  <View style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>LAT: {droneLat}</Text>
                  </View>
                  <View style={{ position: 'absolute', bottom: 12, right: 12 }}>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>LNG: {droneLng}</Text>
                  </View>
                </View>

                {/* Specs row */}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: 'rgba(28,27,27,0.4)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)', alignItems: 'center' }}>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Ground Speed</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 12, fontWeight: 'bold', color: '#ffffff', marginTop: 2 }}>{droneKnots} Knots</Text>
                  </View>
                  <View style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: 'rgba(28,27,27,0.4)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)', alignItems: 'center' }}>
                    <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Flight Battery</Text>
                    <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 12, fontWeight: 'bold', color: 'rgb(16, 185, 129)', marginTop: 2 }}>{droneBattery}%</Text>
                  </View>
                </View>

                {/* Milestone progress log */}
                <View style={{ gap: 12 }}>
                  <Text style={{ fontFamily: tokens.fontFamily.display, fontSize: 11, fontWeight: '800', color: '#ffffff', textTransform: 'uppercase' }}>Milestone Progression</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffffff' }}>✓ PATRON REQUEST SECURED</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffffff' }}>✓ OVEN FIRED PREPARATION</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: '#ffb68b' }}>⏳ HIGH-SPEED SATELLITE CRUISE</Text>
                  <Text style={{ fontFamily: tokens.fontFamily.body, fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>• PRESTIGE Coordinate Touchdown</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',
  },
  navbar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing.marginMobile,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    color: '#522300',
    fontSize: 16,
    fontWeight: '900',
  },
  logoTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  navbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navbarIcon: {
    fontSize: 16,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 16,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#131313',
  },
  cartBadgeText: {
    color: '#522300',
    fontSize: 10,
    fontWeight: '900',
  },
  scrollBody: {
    paddingBottom: 40,
  },
  sectionHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTag: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 10,
    color: '#ffb68b',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#ff7a00',
    borderRadius: 1.5,
    marginTop: 8,
  },
  menuGrid: {
    paddingHorizontal: tokens.spacing.marginMobile,
    marginTop: 20,
  },
  // Cart styles
  cartModalContainer: {
    flex: 1,
    backgroundColor: '#131313',
  },
  cartHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cartHeaderTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  cartCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCloseText: {
    color: '#ffffff',
    fontSize: 12,
  },
  cartItemsList: {
    padding: 20,
  },
  emptyCartContainer: {
    paddingVertical: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartIcon: {
    fontSize: 64,
    opacity: 0.3,
    marginBottom: 16,
  },
  emptyCartText: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
  emptyCartSub: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.25)',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 240,
  },
  cartItemRow: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: tokens.rounded.xl,
    backgroundColor: 'rgba(28, 27, 27, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 16,
  },
  cartItemImg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  cartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemName: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  cartItemDelete: {
    color: '#ffb4ab',
    fontSize: 14,
    fontWeight: '600',
  },
  cartItemDetails: {
    marginTop: 4,
  },
  cartItemDetailsText: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 10,
    color: 'rgba(224, 192, 175, 0.7)',
    lineHeight: 14,
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  cartItemPrice: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 15,
    fontWeight: '700',
    color: '#ffb955',
  },
  cartItemCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e0e0e',
    borderRadius: tokens.rounded.full,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cartItemCounterBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCounterText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartItemCounterValue: {
    fontFamily: tokens.fontFamily.body,
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 6,
    textAlign: 'center',
    minWidth: 16,
  },
  cartItemCounterBtnPlus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCounterTextPlus: {
    color: '#522300',
    fontSize: 14,
    fontWeight: '700',
  },
  cartFooter: {
    backgroundColor: 'rgba(19, 19, 19, 0.95)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  cartSummary: {
    marginBottom: 16,
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: 'rgba(224, 192, 175, 0.6)',
  },
  summaryValue: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  summaryValueFree: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: '#ffb955',
    fontWeight: '600',
  },
  summaryTotalRow: {
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 8,
    marginTop: 4,
  },
  summaryTotalLabel: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  summaryTotalValue: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '900',
    color: '#ffb955',
  },
  checkoutButton: {
    backgroundColor: '#ff7a00',
    borderRadius: tokens.rounded.full,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  disabledBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowOpacity: 0,
    elevation: 0,
  },
  checkoutBtnLabel: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 14,
    fontWeight: '800',
    color: '#522300',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  checkoutBtnPrice: {
    fontSize: 18,
    color: '#522300',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  // Success styles
  successBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successCard: {
    backgroundColor: '#1c1b1b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: tokens.rounded['2xl'],
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  successIcon: {
    fontSize: 32,
    color: '#ffb68b',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
    width: 64,
    height: 64,
    borderRadius: 32,
    textAlign: 'center',
    lineHeight: 60,
    borderWidth: 2,
    borderColor: '#ffb68b',
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 12,
  },
  successDesc: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: '#e0c0af',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  successBtn: {
    backgroundColor: '#ff7a00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: tokens.rounded.full,
    width: '100%',
    alignItems: 'center',
  },
  successBtnText: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    fontWeight: '800',
    color: '#522300',
    textTransform: 'uppercase',
  },
});
