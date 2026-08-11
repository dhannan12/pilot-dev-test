import React, { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  manager: string;
  menuItems: MenuItem[];
}
