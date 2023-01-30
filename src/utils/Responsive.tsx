import { useMediaQuery } from 'react-responsive';

export interface ResponsiveProps {
  children: JSX.Element;
}

export function Desktop({ children }: ResponsiveProps) {
  return useMediaQuery({ minWidth: 992 }) ? children : null;
}
export function Tablet({ children }: ResponsiveProps) {
  return useMediaQuery({ minWidth: 768, maxWidth: 991 }) ? children : null;
}
export function Mobile({ children }: ResponsiveProps) {
  return useMediaQuery({ maxWidth: 767 }) ? children : null;
}
export function Default({ children }: ResponsiveProps) {
  return useMediaQuery({ minWidth: 768 }) ? children : null;
}
