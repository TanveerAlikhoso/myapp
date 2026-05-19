import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Product, formatPrice } from '@lumina/core';
import { tokens } from '../theme/tokens';

interface MenuCardProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onCustomize: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onCustomize,
}) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={onCustomize}
        style={styles.card}
      >
        {/* Overlapping 3D Image */}
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
        </View>

        <View style={styles.content}>
          {product.tag ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{product.tag}</Text>
            </View>
          ) : null}

          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>

          <View style={styles.footer} onStartShouldSetResponder={() => true}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>

            {quantity === 0 ? (
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={onCustomize}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.counter}>
                <TouchableOpacity onPress={onDecrement} style={styles.counterAction}>
                  <Text style={styles.counterActionText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{quantity}</Text>
                <TouchableOpacity onPress={onIncrement} style={styles.counterActionPlus}>
                  <Text style={styles.counterActionPlusText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 48, // Space for the overlapping image
    marginVertical: 12,
    flex: 1,
    minWidth: 260,
  },
  card: {
    backgroundColor: 'rgba(28, 27, 27, 0.5)',
    borderRadius: tokens.rounded['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  imageWrapper: {
    position: 'absolute',
    top: -48,
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#131313',
    shadowColor: '#ffb68b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: 'rgba(255, 182, 139, 0.1)',
    borderRadius: tokens.rounded.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 182, 139, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  tagText: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 10,
    fontWeight: '600',
    color: '#ffb68b',
  },
  title: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    color: '#e0c0af',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
  },
  price: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 20,
    fontWeight: '700',
    color: '#ffb955',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    color: '#522300',
    fontSize: 20,
    fontWeight: '700',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e0e0e',
    borderRadius: tokens.rounded.full,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  counterAction: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  counterValue: {
    fontFamily: tokens.fontFamily.body,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    textAlign: 'center',
    minWidth: 20,
  },
  counterActionPlus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterActionPlusText: {
    color: '#522300',
    fontSize: 16,
    fontWeight: '700',
  },
});
