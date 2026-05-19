import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { tokens } from '../theme/tokens';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(300, SCREEN_WIDTH * 0.82);

interface NavbarProps {
  totalItems: number;
  onCartClick: () => void;
  currentPath?: string;
  onLocationsClick?: () => void;
  onVipHubClick?: () => void;
  onOrderNowClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems,
  onCartClick,
  currentPath,
  onLocationsClick,
  onVipHubClick,
  onOrderNowClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 200,
        mass: 0.8,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
    });
  };

  const handleLinkPress = (name: string) => {
    closeMenu();
    if (name === 'Menu' && onOrderNowClick) {
      onOrderNowClick();
    } else if (name === 'Offers' && onVipHubClick) {
      onVipHubClick();
    } else {
      Alert.alert(
        'VIP Portal',
        `Welcome to our ${name} portal! Crafted to absolute VIP luxury standards.`
      );
    }
  };

  const mobileLinks = [
    { name: 'Menu' },
    { name: 'Offers' },
    { name: 'About' },
    { name: 'Reviews' },
  ];

  return (
    <>
      {/* ─── Top Navbar Bar ─── */}
      <View style={styles.navbar}>
        {/* Logo */}
        <View style={styles.logoGroup}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>L</Text>
          </View>
          <Text style={styles.logoTitle}>LUMINA</Text>
          <Text style={styles.logoSuffix}>bites</Text>
        </View>

        {/* Right Action Buttons */}
        <View style={styles.navbarActions}>
          {/* Cart */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onCartClick && onCartClick()}
            style={styles.navbarIconBtn}
            accessibilityLabel="Shopping Cart"
            accessibilityRole="button"
          >
            <View style={styles.iconCartSvg}>
              <View style={styles.cartIconBody} />
              <View style={styles.cartIconHandle} />
              <View style={styles.cartDotL} />
              <View style={styles.cartDotR} />
            </View>
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Hamburger Menu */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openMenu}
            style={[styles.navbarIconBtn, { marginLeft: 10 }]}
            accessibilityLabel="Open Navigation Menu"
            accessibilityRole="button"
          >
            <View style={styles.hamburgerIcon}>
              <View style={styles.hamburgerLine} />
              <View style={[styles.hamburgerLine, { width: 14 }]} />
              <View style={styles.hamburgerLine} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Drawer Modal ─── */}
      <Modal
        visible={isOpen}
        animationType="none"
        transparent={true}
        onRequestClose={closeMenu}
        statusBarTranslucent
      >
        <View style={styles.modalRoot}>
          {/* Backdrop */}
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
            <TouchableOpacity
              style={StyleSheet.absoluteFillObject}
              activeOpacity={1}
              onPress={closeMenu}
            />
          </Animated.View>

          {/* Slide-in Drawer */}
          <Animated.View
            style={[
              styles.drawerContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            {/* Header */}
            <SafeAreaView style={{ backgroundColor: '#121214' }}>
              <View style={styles.drawerHeader}>
                <View style={styles.logoGroup}>
                  <View style={styles.logoBadgeSm}>
                    <Text style={styles.logoBadgeTextSm}>L</Text>
                  </View>
                  <Text style={styles.logoTitleSm}>LUMINA</Text>
                  <Text style={styles.logoSuffixSm}>bites</Text>
                </View>

                {/* Close "X" */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={closeMenu}
                  style={styles.closeBtn}
                  accessibilityLabel="Close Menu"
                  accessibilityRole="button"
                >
                  <View style={styles.closeXContainer}>
                    <View style={[styles.closeLine, { transform: [{ rotate: '45deg' }] }]} />
                    <View style={[styles.closeLine, { transform: [{ rotate: '-45deg' }] }]} />
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>

            {/* Body */}
            <ScrollView
              contentContainerStyle={styles.drawerContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.drawerSub}>Savor Selection</Text>

              {mobileLinks.map((link) => (
                <TouchableOpacity
                  key={link.name}
                  activeOpacity={0.6}
                  onPress={() => handleLinkPress(link.name)}
                  style={styles.menuItem}
                  accessibilityRole="link"
                >
                  <Text style={styles.menuItemText}>{link.name}</Text>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Footer — Order Now */}
            <SafeAreaView style={{ backgroundColor: '#121214' }}>
              <View style={styles.drawerFooter}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    closeMenu();
                    if (onOrderNowClick) onOrderNowClick();
                  }}
                  style={styles.orderBtn}
                  accessibilityRole="button"
                >
                  <Text style={styles.orderBtnText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // ─── Navbar Bar ───
  navbar: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing.marginMobile,
    backgroundColor: '#131313',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  logoBadgeText: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '900',
    color: '#522300',
  },
  logoTitle: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2.5,
    color: '#ffffff',
    marginLeft: 10,
  },
  logoSuffix: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 16,
    fontWeight: '400',
    color: '#ffb68b',
    marginLeft: 1,
  },
  navbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  // Cart icon (pure RN shapes, no emoji)
  iconCartSvg: {
    width: 18,
    height: 16,
    position: 'relative',
  },
  cartIconBody: {
    position: 'absolute',
    bottom: 4,
    left: 2,
    width: 14,
    height: 9,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  cartIconHandle: {
    position: 'absolute',
    top: 0,
    left: 4,
    width: 10,
    height: 6,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cartDotL: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#ffffff',
  },
  cartDotR: {
    position: 'absolute',
    bottom: 0,
    right: 3,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#ffffff',
  },

  // Hamburger icon (3 lines, no emoji)
  hamburgerIcon: {
    width: 18,
    height: 14,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  hamburgerLine: {
    width: 18,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#ffffff',
  },

  // Cart badge
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#131313',
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  cartBadgeText: {
    color: '#522300',
    fontSize: 9,
    fontWeight: '800',
  },

  // ─── Modal / Drawer ───
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#121214',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.06)',
    shadowColor: '#ff7a00',
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
  drawerHeader: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  logoBadgeSm: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeTextSm: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 12,
    fontWeight: '900',
    color: '#522300',
  },
  logoTitleSm: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#ffffff',
    marginLeft: 8,
  },
  logoSuffixSm: {
    fontFamily: tokens.fontFamily.display,
    fontSize: 14,
    fontWeight: '400',
    color: '#ffb68b',
    marginLeft: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeXContainer: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: 16,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: '#ffffff',
  },

  // Drawer content
  drawerContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  drawerSub: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 10,
    color: '#ffb68b',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 28,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  menuItemText: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 16,
    fontWeight: '700',
    color: '#e0c0af',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  menuItemArrow: {
    color: '#ff7a00',
    fontSize: 22,
    fontWeight: '300',
    opacity: 0.6,
  },

  // Footer
  drawerFooter: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  orderBtn: {
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7a00',
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  orderBtnText: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 12,
    fontWeight: '800',
    color: '#522300',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
