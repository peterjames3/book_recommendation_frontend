// store/checkout-store.ts
import { create } from 'zustand';
import { ordersApi } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export interface CustomerInfo {
  customerEmail: string;
  customerPhone: string;
  street: string;
  city: string;
  town: string;
  zipCode: string;
  country: string;
  notes?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CheckoutState {
  // Step management
  currentStep: number;
  
  // Form data
  customerInfo: CustomerInfo | null;
  
  // Order summary
  orderSummary: OrderSummary | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  calculateOrderSummary: (subtotal: number) => OrderSummary;
  placeOrder: () => Promise<{ success: boolean; orderId?: string; error?: string }>;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  // Initial state
  currentStep: 1,
  customerInfo: null,
  orderSummary: null,
  isLoading: false,
  error: null,

  // Actions
  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  },

  setCustomerInfo: (info: CustomerInfo) => {
    set({ customerInfo: info });
  },

  calculateOrderSummary: (subtotal: number) => {
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    const orderSummary = {
      subtotal,
      shipping,
      tax,
      total
    };
    
    set({ orderSummary });
    return orderSummary;
  },

 // store/checkout-store.ts - Updated placeOrder function
placeOrder: async () => {
  const { customerInfo } = get();
  
  if (!customerInfo) {
    const error = 'Please complete all required fields';
    set({ error });
    toast.error(error);
    return { success: false, error };
  }

  set({ isLoading: true, error: null });

  try {
    // Detailed logging
    console.log('🔍 Raw customerInfo from form:', customerInfo);
    console.log('🔍 customerInfo.town value:', customerInfo.town);
    console.log('🔍 customerInfo.town type:', typeof customerInfo.town);
    console.log('🔍 Is customerInfo.town empty?', !customerInfo.town);

    const orderData = {
      shippingAddress: {
        street: customerInfo.street,
        city: customerInfo.city,
        town: customerInfo.town,
        zipCode: customerInfo.zipCode,
        country: customerInfo.country
      },
      paymentMethod: 'cash_on_delivery',
      notes: customerInfo.notes || '',
      customerEmail: customerInfo.customerEmail,
      customerPhone: customerInfo.customerPhone
    };

    console.log('📦 Final order data being sent:', JSON.stringify(orderData, null, 2));

    const response = await ordersApi.createOrder(orderData);
    
    console.log('✅ Order API response:', response);
    
    if (response.success) {
      set({ 
        isLoading: false,
        currentStep: 2
      });
      toast.success('Order placed successfully! You will pay on delivery.');
      return { success: true, orderId: response.data?.orderId };
    } else {
      throw new Error(response.message || 'Failed to place order');
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error('❌ Order placement error details:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
      message: axiosError.message
    });
    
    const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Failed to place order';
    set({ 
      isLoading: false, 
      error: errorMessage 
    });
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
},
  clearCheckout: () => {
    set({
      currentStep: 1,
      customerInfo: null,
      orderSummary: null,
      error: null
    });
  }
}));