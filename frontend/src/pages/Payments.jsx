import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { paymentMethods } from '@/data/mockData';

const Payments = () => {
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(true);

  const handleAddPaymentMethod = () => {
    alert('Add payment method interface would open here');
  };

  const handleRemovePaymentMethod = (methodId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      alert(`Payment method ${methodId} would be removed`);
    }
  };

  const handleSetDefault = (methodId) => {
    alert(`Payment method ${methodId} would be set as default`);
  };

  const handleEditBillingAddress = () => {
    alert('Edit billing address interface would open here');
  };

  const handleEditShippingAddress = () => {
    alert('Edit shipping address interface would open here');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6" data-testid="payments-page">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-stone-900">Payment Methods</h1>
        <p className="text-stone-600">Manage your saved payment methods and billing information</p>
      </div>

      {/* Payment Methods */}
      <Card data-testid="payment-methods-section">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Saved Cards</CardTitle>
              <CardDescription>Your payment methods on file</CardDescription>
            </div>
            <Button 
              onClick={handleAddPaymentMethod}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              data-testid="add-payment-method-btn"
            >
              <Plus className="h-4 w-4" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method, index) => {
              const isExpiringSoon = new Date(method.expYear, method.expMonth - 1) < new Date(new Date().setMonth(new Date().getMonth() + 2));
              
              return (
                <div 
                  key={method.id} 
                  className="flex items-center justify-between p-4 border border-stone-200 rounded-lg"
                  data-testid={`payment-method-${method.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-stone-100 rounded-lg">
                      <CreditCard className="h-6 w-6 text-stone-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-stone-900">
                          {method.brand} •••• {method.last4}
                        </p>
                        {index === 0 && (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                            Default
                          </Badge>
                        )}
                        {isExpiringSoon && (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                            Expiring Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-stone-600">
                        Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {index !== 0 && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSetDefault(method.id)}
                        data-testid={`set-default-${method.id}`}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      data-testid={`remove-${method.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Billing and Shipping Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Address */}
        <Card data-testid="billing-address-section">
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
            <CardDescription>Address associated with your payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-stone-900">
              <p className="font-medium">Zahan Billimoria</p>
              <p>123 Mountain View Drive</p>
              <p>Boulder, CO 80301</p>
              <p>United States</p>
            </div>
            <Separator className="my-4" />
            <Button 
              variant="outline" 
              onClick={handleEditBillingAddress}
              data-testid="edit-billing-address-btn"
            >
              Edit Address
            </Button>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card data-testid="shipping-address-section">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
            <CardDescription>Address for order deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Checkbox to use billing as shipping */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-billing-as-shipping" 
                  checked={useBillingAsShipping}
                  onCheckedChange={setUseBillingAsShipping}
                  data-testid="use-billing-as-shipping-checkbox"
                />
                <Label 
                  htmlFor="use-billing-as-shipping" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Use billing address as shipping address
                </Label>
              </div>

              <Separator />

              {useBillingAsShipping ? (
                <div className="space-y-2 text-stone-900">
                  <p className="font-medium">Zahan Billimoria</p>
                  <p>123 Mountain View Drive</p>
                  <p>Boulder, CO 80301</p>
                  <p>United States</p>
                  <p className="text-sm text-stone-500 italic mt-2">Same as billing address</p>
                </div>
              ) : (
                <div className="space-y-2 text-stone-900">
                  <p className="font-medium">Zahan Billimoria</p>
                  <p>456 Summit Trail</p>
                  <p>Denver, CO 80202</p>
                  <p>United States</p>
                </div>
              )}

              <Separator className="my-4" />
              
              <Button 
                variant="outline"
                onClick={handleEditShippingAddress}
                disabled={useBillingAsShipping}
                data-testid="edit-shipping-address-btn"
              >
                Edit Shipping Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;