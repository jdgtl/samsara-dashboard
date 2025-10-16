import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { paymentMethods } from '@/data/mockData';

const Payments = () => {
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

  const handleManageInWooCommerce = () => {
    alert('Would redirect to WooCommerce payment settings');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="payments-page">
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
          <Button variant="outline" data-testid="edit-billing-address-btn">
            Edit Address
          </Button>
        </CardContent>
      </Card>

      {/* WooCommerce Link */}
      <Card className="bg-stone-50" data-testid="woocommerce-link-section">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-stone-900 mb-1">Advanced Payment Settings</h3>
              <p className="text-sm text-stone-600">
                For more payment options and detailed billing history, visit the store settings.
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={handleManageInWooCommerce}
              className="gap-2"
              data-testid="manage-in-woocommerce-btn"
            >
              Manage in Store
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;