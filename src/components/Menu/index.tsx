import React from 'react';
import { MenuItem } from './MenuItem';
import { MenuHeader } from './MenuHeader';
import { MenuItemType } from './types';

interface MenuProps {
  menuItems: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
}

export function Menu({ menuItems, onAddToCart }: MenuProps) {
  return (
    <div className="w-full">
      <MenuHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <MenuItem 
            key={item._id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export type { MenuItemType };