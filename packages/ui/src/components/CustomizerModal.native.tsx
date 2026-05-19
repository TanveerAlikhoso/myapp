import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Product, formatPrice } from '@lumina/core';
import { tokens } from '../theme/tokens';

interface CustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customizedItem: any) => void;
}

interface CustomOption {
  name: string;
  price: number;
}

const BANS_OPTIONS = [
  { name: 'Gold-Dusted Brioche', price: 0 },
  { name: 'Active Charcoal Bun', price: 2.0 },
  { name: 'Hydroponic Lettuce Wrap', price: 0 }
];

const PATTY_OPTIONS = [
  { name: 'Double A5 Wagyu Patty', price: 0 },
  { name: 'Triple A5 Wagyu Patty', price: 6.0 },
  { name: 'Plant-Based Wagyu Patty', price: 0 }
];

const TOPPINGS_OPTIONS = [
  { name: 'Freshly Shaved Black Truffle', price: 5.0 },
  { name: 'Crispy House-Cured Guanciale', price: 3.0 },
  { name: '24k Edible Gold Leaf', price: 10.0 },
  { name: 'Aged Cave Cheddar', price: 1.5 },
  { name: 'Sunny Side Organic Egg', price: 2.0 }
];

const SAUCES_OPTIONS = [
  { name: 'Signature Smoked Habanero', price: 0 },
  { name: 'Black Truffle Infused Mayo', price: 1.0 },
  { name: 'Aged Black Garlic Puree', price: 1.5 }
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [bun, setBun] = useState<CustomOption>(BANS_OPTIONS[0]);
  const [patty, setPatty] = useState<CustomOption>(PATTY_OPTIONS[0]);
  const [toppings, setToppings] = useState<CustomOption[]>([]);
  const [sauces, setSauces] = useState<CustomOption[]>([SAUCES_OPTIONS[0]]);
  
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!product) return;
    let extraCost = 0;
    extraCost += bun.price;
    extraCost += patty.price;
    extraCost += toppings.reduce((acc, t) => acc + t.price, 0);
    extraCost += sauces.reduce((acc, s) => acc + s.price, 0);
    
    setTotalPrice((product.price + extraCost) * quantity);
  }, [bun, patty, toppings, sauces, quantity, product]);

  useEffect(() => {
    if (isOpen) {
      setBun(BANS_OPTIONS[0]);
      setPatty(PATTY_OPTIONS[0]);
      setToppings([]);
      setSauces([SAUCES_OPTIONS[0]]);
      setQuantity(1);
    }
  }, [isOpen]);

  if (!product) return null;

  const handleToggleTopping = (topping: CustomOption) => {
    const exists = toppings.some(t => t.name === topping.name);
    if (exists) {
      setToppings(toppings.filter(t => t.name !== topping.name));
    } else {
      setToppings([...toppings, topping]);
    }
  };

  const handleToggleSauce = (sauce: CustomOption) => {
    const exists = sauces.some(s => s.name === sauce.name);
    if (exists) {
      setSauces(sauces.filter(s => s.name !== sauce.name));
    } else {
      setSauces([...sauces, sauce]);
    }
  };

  const handleConfirm = () => {
    const selections = { bun, patty, toppings, sauces };
    // Create base64 short hash
    const hashInput = JSON.stringify(selections);
    // Simple custom hash representation for native environment
    let hash = 0;
    for (let i = 0; i < hashInput.length; i++) {
      hash = (hash << 5) - hash + hashInput.charCodeAt(i);
      hash |= 0;
    }
    const uniqueId = `${product.id}-${Math.abs(hash).toString(16).substring(0, 5)}`;
    const extraPrice = totalPrice / quantity;

    onAddToCart({
      id: uniqueId,
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      price: extraPrice,
      quantity,
      image: product.image,
      customizations: selections
    });
    
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Customize</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Selection Area */}
        <ScrollView contentContainerStyle={styles.scrollBody}>
          {/* Top Showcase */}
          <View style={styles.showcase}>
            <Image 
              source={{ uri: product.image }} 
              style={styles.foodImage}
              contentFit="cover"
            />
            <Text style={styles.foodName}>{product.name}</Text>
            <Text style={styles.foodDesc}>{product.description}</Text>
          </View>

          {/* Bun Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Bun / Crust</Text>
            {BANS_OPTIONS.map((option) => {
              const isSelected = bun.name === option.name;
              return (
                <TouchableOpacity
                  key={option.name}
                  onPress={() => setBun(option)}
                  style={[styles.optionRow, isSelected && styles.activeOptionRow]}
                >
                  <Text style={styles.optionName}>{option.name}</Text>
                  <View style={styles.optionRight}>
                    {option.price > 0 && (
                      <Text style={styles.optionPrice}>+{formatPrice(option.price)}</Text>
                    )}
                    <View style={[styles.radio, isSelected && styles.activeRadio]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Patty Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Protein Size</Text>
            {PATTY_OPTIONS.map((option) => {
              const isSelected = patty.name === option.name;
              return (
                <TouchableOpacity
                  key={option.name}
                  onPress={() => setPatty(option)}
                  style={[styles.optionRow, isSelected && styles.activeOptionRow]}
                >
                  <Text style={styles.optionName}>{option.name}</Text>
                  <View style={styles.optionRight}>
                    {option.price > 0 && (
                      <Text style={styles.optionPrice}>+{formatPrice(option.price)}</Text>
                    )}
                    <View style={[styles.radio, isSelected && styles.activeRadio]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Toppings Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Premium Toppings</Text>
            {TOPPINGS_OPTIONS.map((option) => {
              const isSelected = toppings.some(t => t.name === option.name);
              return (
                <TouchableOpacity
                  key={option.name}
                  onPress={() => handleToggleTopping(option)}
                  style={[styles.optionRow, isSelected && styles.activeOptionRow]}
                >
                  <Text style={styles.optionName}>{option.name}</Text>
                  <View style={styles.optionRight}>
                    {option.price > 0 && (
                      <Text style={styles.optionPrice}>+{formatPrice(option.price)}</Text>
                    )}
                    <View style={[styles.checkbox, isSelected && styles.activeCheckbox]}>
                      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Sauces Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Gourmet Sauces</Text>
            {SAUCES_OPTIONS.map((option) => {
              const isSelected = sauces.some(s => s.name === option.name);
              return (
                <TouchableOpacity
                  key={option.name}
                  onPress={() => handleToggleSauce(option)}
                  style={[styles.optionRow, isSelected && styles.activeOptionRow]}
                >
                  <Text style={styles.optionName}>{option.name}</Text>
                  <View style={styles.optionRight}>
                    {option.price > 0 && (
                      <Text style={styles.optionPrice}>+{formatPrice(option.price)}</Text>
                    )}
                    <View style={[styles.checkbox, isSelected && styles.activeCheckbox]}>
                      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Padding for sticky footer */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Sticky Checkout Bottom Bar */}
        <View style={styles.footer}>
          <View style={styles.counter}>
            <TouchableOpacity 
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
              style={styles.counterBtn}
            >
              <Text style={styles.counterBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterVal}>{quantity}</Text>
            <TouchableOpacity 
              onPress={() => setQuantity(q => q + 1)}
              style={styles.counterBtnPlus}
            >
              <Text style={styles.counterBtnPlusText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={handleConfirm}
            style={styles.checkoutBtn}
          >
            <Text style={styles.checkoutBtnText}>Add Selected</Text>
            <Text style={styles.checkoutPrice}>{formatPrice(totalPrice)}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#131313',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#ffffff',
    fontSize: 12,
  },
  scrollBody: {
    paddingBottom: 24,
  },
  showcase: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(28, 27, 27, 0.3)',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  foodImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    shadowColor: '#ffb68b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    marginBottom: 20,
  },
  foodName: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  foodDesc: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: '#e0c0af',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: tokens.rounded.lg,
    backgroundColor: 'rgba(28, 27, 27, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 8,
  },
  activeOptionRow: {
    borderColor: '#ffb68b',
    backgroundColor: 'rgba(255, 182, 139, 0.05)',
  },
  optionName: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionPrice: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: '#ffb955',
    fontWeight: '600',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRadio: {
    borderColor: '#ffb68b',
    backgroundColor: '#ff7a00',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#522300',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheckbox: {
    borderColor: '#ffb68b',
    backgroundColor: '#ff7a00',
  },
  checkIcon: {
    color: '#522300',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(19, 19, 19, 0.95)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Safe area on iOS
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e0e0e',
    borderRadius: tokens.rounded.full,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  counterVal: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  counterBtnPlus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnPlusText: {
    color: '#522300',
    fontSize: 18,
    fontWeight: '700',
  },
  checkoutBtn: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: '#ff7a00',
    borderRadius: tokens.rounded.full,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  checkoutBtnText: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 13,
    fontWeight: '800',
    color: '#522300',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  checkoutPrice: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 14,
    fontWeight: '900',
    color: '#522300',
  },
});
