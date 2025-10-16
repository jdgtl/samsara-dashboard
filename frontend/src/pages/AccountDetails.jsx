import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExternalLink, Upload } from 'lucide-react';
import { userData } from '@/data/mockData';

const AccountDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: 'zahan@samsara.com',
    phone: '+1 (555) 123-4567'
  });

  const handleSave = () => {
    alert('Profile changes would be saved here');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: 'zahan@samsara.com',
      phone: '+1 (555) 123-4567'
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    alert('Password change interface would open here');
  };

  const handleUploadAvatar = () => {
    alert('Avatar upload interface would open here');
  };

  const handleManageInSettings = () => {
    alert('Would redirect to WooCommerce account settings');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="account-details-page">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-stone-900">Account Details</h1>
        <p className="text-stone-600">Manage your personal information and account settings</p>
      </div>

      {/* Profile Picture */}
      <Card data-testid="profile-picture-section">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24" data-testid="profile-avatar">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p className="text-sm text-stone-600">Upload a new profile picture</p>
              <Button 
                onClick={handleUploadAvatar}
                variant="outline"
                className="gap-2"
                data-testid="upload-avatar-btn"
              >
                <Upload className="h-4 w-4" />
                Upload New Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card data-testid="personal-info-section">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic account information</CardDescription>
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)}
                variant="outline"
                data-testid="edit-profile-btn"
              >
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                data-testid="name-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                data-testid="email-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                data-testid="phone-input"
              />
            </div>
            <div className="space-y-2">
              <Label>Member Since</Label>
              <p className="text-stone-900" data-testid="member-since-display">
                {new Date(userData.memberSince).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700"
                data-testid="save-changes-btn"
              >
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                data-testid="cancel-edit-btn"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security */}
      <Card data-testid="security-section">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Password</Label>
              <p className="text-sm text-stone-600 mb-2">Last changed 3 months ago</p>
              <Button 
                variant="outline" 
                onClick={handleChangePassword}
                data-testid="change-password-btn"
              >
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WooCommerce Link */}
      <Card className="bg-stone-50" data-testid="woocommerce-link-section">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-stone-900 mb-1">Advanced Account Settings</h3>
              <p className="text-sm text-stone-600">
                For more account options and preferences, visit the store settings.
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={handleManageInSettings}
              className="gap-2"
              data-testid="manage-in-settings-btn"
            >
              Edit in Store Settings
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDetails;