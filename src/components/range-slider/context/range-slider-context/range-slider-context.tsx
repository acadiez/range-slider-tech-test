import { createContext } from 'react';
import { RangeSliderContextType } from './types';

export const RangeSliderContext = createContext<RangeSliderContextType | null>(null);
