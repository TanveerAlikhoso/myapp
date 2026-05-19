import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { tokens } from '../theme/tokens';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 260;

const CATEGORIES = [
  {
    id: 'burgers',
    name: 'Prime Burgers',
    description: 'Wagyu, Truffle, & Gold-leaf selections.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYBN0Cf27016ZhN_e6aHnFlmSBzQgHDDRb5NfyJPvLLUA0TW83I6sEpUj6uSjb0sI9Wp3P1Ce1GYi4q5l7MPJ2lwdn8R4Y9ZOAGc48mztcPpAgxjf0jW3gLJ79c_uD14dtxEAdiNUOm_yxdCChLxa8ZjPReDOvuH2_1Xy6zSWTK7msQFjvy2ip8gr8H_WFTNv0hEziJk6z__dkZQPbDB0UqPiETC35awDW56w3a5TTFJVpZ13N479jhkLqFjp-Aqs7FvJBsyLPXLfb'
  },
  {
    id: 'pizza',
    name: 'Artisan Pizza',
    description: '72-hour fermented sourdough crust.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgCRU-aSFfdDTsfRxDAR2haLTAATI0zQS-R73zKhHcfpp97Pq7b7GPfcVEzaChxv_xA25J-MPWKihIcHSmPSJmIc4oQBf2BnV8NMZ4DV0QLdcyQiClraTCpNuElRg0btfZV_sVVm8_BObB0FIBbHkbCIXc0VhNsBffB1QzYk4UO4n3pf9Ryd1XveLm9i37RVmo4IC-4J0besv64w0Hl-EF6ZJX7UV5kOv59T3ccyoF2_gYN6T2EEqAecqqKIXu6t4eM8NF-fK2qko0'
  },
  {
    id: 'sides',
    name: 'Signature Sides',
    description: 'Truffle frites & charred seasonal greens.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tTtRpqICxonHQlTbw-TSOQCi4hf32hUZf_N19_DD2b10Jz4d7Pf5nYUXuiqzXUx4C01XECoPmZJzIQwVlzi-cqKFK2xhBfdh9tfBdROYGccafW68QA_hw1wCvKsRrnnziUfVhABsdg-mAdzlUh1_lZLQjrWwOS_tXMmORbek1gGVZVElqE_lZYY6yJ4oS8BmjGiLpsfxogK89Jxs4fEKc32WScySRrX_jbsGyG12b4_0Z2mB_BGFjE5y83VDBq1HuUv8iFfrBRLF'
  },
  {
    id: 'drinks',
    name: 'Lumina Elixirs',
    description: 'Crafted botanical infusions & cold brews.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPyZF1R_4sWzjrzUc914Un2AnO0PKesfTX53b3y7mewgQ0E9yj2qC8Lp8uNiuztQ578XCi0epHFNHHqVfld0Apv_AJwMNvPW3hei3yCT_lm1A-pgw0aBAj3bVsJCa9xERArQD8UnU7LOX-2gQGnJorpwr4qVkwJRgHgrHhS6fEGqz3tjvhS6xCjXe6xwRfpD9BPIZ1_NNEPIf9eoTkIKOwKUG_v1LXFonm-7ZODtPfSpb3pHvYNBzchhldGkByqHbGL7olXsxWRlRB'
  }
];

interface CategoryCardsProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 16}
      decelerationRate="fast"
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            activeOpacity={0.95}
            onPress={() => onSelectCategory(category.id)}
            style={[styles.card, isActive && styles.activeCard]}
          >
            {/* Background Image */}
            <Image 
              source={{ uri: category.image }}
              style={styles.backgroundImage}
              contentFit="cover"
            />
            {/* Dark/Gold overlays */}
            <View style={styles.darkOverlay} />
            {isActive ? <View style={styles.activeOverlay} /> : null}

            {/* Label Bottom */}
            <View style={styles.content}>
              <View style={styles.textBlock}>
                <Text style={styles.name}>{category.name}</Text>
                <Text style={styles.description} numberOfLines={1}>
                  {category.description}
                </Text>
              </View>
              <View style={[styles.arrowButton, isActive && styles.activeArrow]}>
                <Text style={[styles.arrowText, isActive && styles.activeArrowText]}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: tokens.spacing.marginMobile,
    paddingVertical: 12,
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 195,
    borderRadius: tokens.rounded['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  activeCard: {
    borderColor: '#ffb68b',
    shadowColor: '#ffb68b',
    shadowOpacity: 0.15,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 19, 19, 0.65)',
  },
  activeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 122, 0, 0.08)',
  },
  content: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  description: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 10,
    color: '#e0c0af',
    marginTop: 2,
  },
  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeArrow: {
    backgroundColor: '#ff7a00',
    borderColor: '#ff7a00',
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeArrowText: {
    color: '#522300',
  },
});
